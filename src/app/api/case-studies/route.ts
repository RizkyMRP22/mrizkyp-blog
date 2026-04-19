export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

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
        const response = await fetch(`${process.env.API_BASEURL}/case-studies` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch case study data');
            return { caseStudies: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching case study data:', error);
        return { caseStudies: [] };
    }
}

export async function GET() {
    const data = await getCaseStudies();
    return NextResponse.json(data);
}
