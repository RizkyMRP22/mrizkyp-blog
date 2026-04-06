export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

export interface TestArtifactsItem {
    summary: {
        totalTests: number;
        passed: number;
        failed: number;
        skipped: number;
        avgDuration: string;
        lastRun: string;
        passRate?: string;
        i?: number;
        environment: string;
    };
    results: {
        id: number;
        suite: string;
        testName: string;
        status: string;
        duration: string;
        timestamp: string;
    }[];
    testSuites: TestSuites;
    bugReports: BugReport[];
}

export interface TestSuites {
    name: string;
    description: string;
    testCases: {
        id: string;
        step: string;
        action: string;
        expectedResult: string;
        status: string;
    }[];
}

export interface BugReport {
    id: string;
    title: string;
    severity: string;
    priority: string;
    environment: string;
    stepsToReproduce: string;
    expectedResult: string;
    actualResult: string;
    additionalNotes: string;
    status: string;
    assignee: string;
    reportedBy: string;
    dateReported: string;
}

export async function getTestArtifacts(): Promise<TestArtifactsItem> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/test-artifacts` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch Test Artifacts data');
            return response as any
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching Test Artifacts data:', error);
        throw error;
    }
}


export async function GET() {
    const data = await getTestArtifacts();
    return NextResponse.json(data);
}
