export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { decryptToken } from '@/lib/token';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token query parameter is required.' },
                { status: 400 }
            );
        }

        const payload = decryptToken(token);

        if (!payload) {
            return NextResponse.json(
                { success: false, error: 'This preview link is invalid or has been tampered with.' },
                { status: 400 }
            );
        }

        if (Date.now() > payload.exp) {
            return NextResponse.json(
                { success: false, error: 'This preview link has expired.' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            name: payload.name,
            email: payload.email
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error during verification.' },
            { status: 500 }
        );
    }
}
