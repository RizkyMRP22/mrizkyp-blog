export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
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

export async function getCaseStudies(): Promise<CaseStudyData> {
    try {
        const db = await getDb();
        const caseStudies = await db.collection<CaseStudyItem>('case-studies').find({}, { projection: { _id: 0 } }).toArray();
        return { caseStudies };
    } catch (error) {
        console.error('Error fetching case studies from MongoDB:', error);
        return { caseStudies: [] };
    }
}

export async function GET() {
    const data = await getCaseStudies();
    return NextResponse.json(data);
}
