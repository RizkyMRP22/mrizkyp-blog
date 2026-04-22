export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { withCache } from '@/lib/redis';
import { getDb } from '@/lib/mongodb';

export interface ShowcaseItem {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
}

export interface ShowcaseData {
    showcases: ShowcaseItem[];
}

async function _getShowcases(): Promise<ShowcaseData> {

    try {
        const db = await getDb();
        const showcases = await db.collection<ShowcaseItem>('project-showcases').find({}, { projection: { _id: 0 } }).toArray();
        return { showcases };
    } catch (error) {
        console.error('Error fetching project showcases from MongoDB:', error);
        return { showcases: [] };
    }
}

export async function getShowcases() {
    return withCache('api:project-showcases', _getShowcases, 3600);
}

export async function GET() {
    const data = await getShowcases();
    return NextResponse.json(data);
}
