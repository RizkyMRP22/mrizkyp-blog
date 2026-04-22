export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { EmailService } from '@/lib/emails';
import { withCache } from '@/lib/redis';
import { verifyTurnstileToken } from '@/lib/turnstile';


export interface EndorsementItem {
    fullName: string;
    role: string;
    relation: string;
    description: string;
    linkedinUrl?: string;
    rating?: number; // 0 - 100

    // System fields
    isApprove: boolean;
    createdAt: string;
    ipAddress?: string;
}

export async function GET() {
    try {

        const endorsements = await withCache('endorsements:approved', async () => {
            const db = await getDb();
            return await db.collection('endorsements')
                .find({ isApprove: true })
                .sort({ createdAt: -1 })
                .toArray();
        }, 3600); // Cache for 1 hour

        return NextResponse.json({ success: true, data: endorsements }, { status: 200 });
    } catch (error) {
        console.error('Error fetching endorsements:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch endorsements.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, role, relation, description, linkedinUrl, rating, turnstileToken } = body;

        // ── Turnstile CAPTCHA Verification ────────────────────────────
        const turnstileVerification = await verifyTurnstileToken(turnstileToken);
        if (!turnstileVerification.success) {
            return NextResponse.json({ success: false, error: turnstileVerification.error }, { status: 400 });
        }

        // Validation
        if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
            return NextResponse.json({ success: false, error: 'Full name is required (min 2 characters).' }, { status: 400 });
        }
        if (!role || typeof role !== 'string' || role.trim().length < 2) {
            return NextResponse.json({ success: false, error: 'Role is required.' }, { status: 400 });
        }
        if (!relation || typeof relation !== 'string' || relation.trim().length < 2) {
            return NextResponse.json({ success: false, error: 'Relation is required.' }, { status: 400 });
        }
        if (!description || typeof description !== 'string' || description.trim().length < 10) {
            return NextResponse.json({ success: false, error: 'Description must be at least 10 characters.' }, { status: 400 });
        }

        // Parse rating
        let finalRating: number | undefined = undefined;
        if (rating !== undefined && rating !== null && rating !== '') {
            const parsed = Number(rating);
            if (isNaN(parsed) || parsed < 0 || parsed > 100) {
                return NextResponse.json({ success: false, error: 'Rating must be a number between 0 and 100.' }, { status: 400 });
            }
            finalRating = parsed;
        }

        const endorsement: EndorsementItem = {
            fullName: fullName.trim(),
            role: role.trim(),
            relation: relation.trim(),
            description: description.trim(),
            linkedinUrl: linkedinUrl ? linkedinUrl.trim() : undefined,
            rating: finalRating,
            isApprove: false, // Default requires manual approval
            createdAt: new Date().toISOString(),
            ipAddress: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? undefined,
        };

        const db = await getDb();
        const result = await db.collection('endorsements').insertOne(endorsement);

        // ── Notifications ─────────────────────────────────────────────
        await EmailService.sendNewEndorsement(endorsement, result.insertedId.toString());

        return NextResponse.json(
            { success: true, message: 'Thank you for your endorsement!', id: result.insertedId },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error saving endorsement:', error);
        return NextResponse.json(
            { success: false, error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}
