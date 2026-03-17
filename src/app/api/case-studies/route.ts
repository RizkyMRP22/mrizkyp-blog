export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import caseStudiesData from '@/data/caseStudies.json';

export async function GET() {
    return NextResponse.json(caseStudiesData);
}
