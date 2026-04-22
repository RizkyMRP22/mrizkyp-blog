export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { withCache } from '@/lib/redis';
import { getDb } from '@/lib/mongodb';

export interface CaseStudyItem {
    id: string;
    title: string;
    summary: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string[];
    tags: string[];
    duration: string;
}

export interface CaseStudyData {
    caseStudies: CaseStudyItem[];
}

async function _getCaseStudies(): Promise<CaseStudyData> {

    try {
        const db = await getDb();
        const caseStudies = await db.collection<CaseStudyItem>('case-studies').find({}, { projection: { _id: 0 } }).toArray();
        return { caseStudies };
    } catch (error) {
        console.error('Error fetching case studies from MongoDB:', error);
        return { caseStudies: [] };
    }
}

export async function getCaseStudies() {
    return withCache('api:case-studies', _getCaseStudies, 3600);
}

export async function GET() {
    const data = await getCaseStudies();
    return NextResponse.json(data);
}
