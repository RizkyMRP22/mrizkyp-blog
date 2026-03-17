export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import testCasesData from '@/data/testCases.json';
import automationData from '@/data/automationResults.json';
import bugReportsData from '@/data/bugReports.json';

export async function GET() {
    return NextResponse.json({
        testCases: testCasesData,
        automationResults: automationData,
        bugReports: bugReportsData,
    });
}
