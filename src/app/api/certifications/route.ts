export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { withCache } from '@/lib/redis';
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

async function _getCertifications(): Promise<certificationData> {

    try {
        const db = await getDb();
        const certifications = await db.collection<certificationItem>('certifications').find({}, { projection: { _id: 0 } }).sort({ year: -1 }).toArray();
        return { certifications };
    } catch (error) {
        console.error('Error fetching certifications from MongoDB:', error);
        return { certifications: [] };
    }
}

export async function getCertifications() {
    return withCache('api:certifications', _getCertifications, 3600);
}

export async function GET() {
    const data = await getCertifications();
    return NextResponse.json(data);
}
