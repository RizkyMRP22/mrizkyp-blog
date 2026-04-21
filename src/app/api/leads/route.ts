export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface LeadItem {
    // Who is reaching out
    fullName: string;
    email: string;
    company?: string;
    role?: string;               // e.g. "Technical Recruiter", "CTO", "Engineering Manager"

    // What they want
    subject: string;
    opportunityType: string;     // "full-time" | "freelance" | "collaboration" | "mentorship" | "other"
    message: string;

    // Optional context
    timeline?: string;           // expected start date or urgency
    linkedinUrl?: string;

    // System fields (server-generated)
    submittedAt: string;
    status: string;              // "new" | "read" | "replied" | "archived"
    source: string;              // "contact-form"
    ipAddress?: string;
    userAgent?: string;
}

// Simple email regex guard
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { fullName, email, company, role, subject, opportunityType, message, timeline, linkedinUrl } = body;

        // ── Validation ────────────────────────────────────────────────
        if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
            return NextResponse.json({ success: false, error: 'Full name is required (min 2 characters).' }, { status: 400 });
        }
        if (!email || !isValidEmail(email)) {
            return NextResponse.json({ success: false, error: 'A valid email address is required.' }, { status: 400 });
        }
        if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
            return NextResponse.json({ success: false, error: 'Subject is required (min 3 characters).' }, { status: 400 });
        }
        if (!opportunityType || !['full-time', 'freelance', 'collaboration', 'mentorship', 'other'].includes(opportunityType)) {
            return NextResponse.json({ success: false, error: 'Please select a valid opportunity type.' }, { status: 400 });
        }
        if (!message || typeof message !== 'string' || message.trim().length < 20) {
            return NextResponse.json({ success: false, error: 'Message must be at least 20 characters.' }, { status: 400 });
        }

        // ── Build Document ────────────────────────────────────────────
        const lead: LeadItem = {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            company: company?.trim() || undefined,
            role: role?.trim() || undefined,
            subject: subject.trim(),
            opportunityType,
            message: message.trim(),
            timeline: timeline?.trim() || undefined,
            linkedinUrl: linkedinUrl?.trim() || undefined,
            submittedAt: new Date().toISOString(),
            status: 'new',
            source: 'contact-form',
            ipAddress: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? undefined,
            userAgent: req.headers.get('user-agent') ?? undefined,
        };

        // ── Persist ───────────────────────────────────────────────────
        const db = await getDb();
        const result = await db.collection('leads').insertOne(lead);

        return NextResponse.json(
            { success: true, message: 'Your message was sent successfully! I\'ll get back to you soon.', id: result.insertedId },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error saving lead to MongoDB:', error);
        return NextResponse.json(
            { success: false, error: 'Something went wrong. Please try again or reach out via LinkedIn.' },
            { status: 500 }
        );
    }
}
