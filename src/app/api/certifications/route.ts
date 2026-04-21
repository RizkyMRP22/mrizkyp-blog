export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface certificationItem {
    name: string;
    year: string;
    issuer: string;
    link: string;
}

export interface certificationData {
    certifications: certificationItem[];
}

export async function getCertifications(): Promise<certificationData> {
    try {
        const db = await getDb();
        const certifications = await db.collection<certificationItem>('certifications').find({}, { projection: { _id: 0 } }).toArray();
        return { certifications };
    } catch (error) {
        console.error('Error fetching certifications from MongoDB:', error);
        return { certifications: [] };
    }
}

export async function GET() {
    const data = await getCertifications();
    return NextResponse.json(data);
}
