export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface ResumeDownloadItem {
    fullName: string;
    email: string;
    downloadedAt: string;
    ipAddress?: string;
    userAgent?: string;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, email } = body;

        // ── Validation ────────────────────────────────────────────────
        if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
            return NextResponse.json(
                { success: false, error: 'Full name is required (min 2 characters).' },
                { status: 400 }
            );
        }
        if (!email || !isValidEmail(email)) {
            return NextResponse.json(
                { success: false, error: 'A valid email address is required.' },
                { status: 400 }
            );
        }

        // ── Build Document ────────────────────────────────────────────
        const download: ResumeDownloadItem = {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            downloadedAt: new Date().toISOString(),
            ipAddress: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? undefined,
            userAgent: req.headers.get('user-agent') ?? undefined,
        };

        // ── Persist ───────────────────────────────────────────────────
        const db = await getDb();
        const result = await db.collection('resume_downloads').insertOne(download);

        return NextResponse.json(
            { success: true, id: result.insertedId },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error saving resume download to MongoDB:', error);
        return NextResponse.json(
            { success: false, error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
