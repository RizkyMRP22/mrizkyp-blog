import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // In a real app, you'd send an email or save to a database
        console.log('Contact form submission:', { name, email, subject, message });

        return NextResponse.json(
            { success: true, message: 'Message sent successfully! I will get back to you soon.' },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
