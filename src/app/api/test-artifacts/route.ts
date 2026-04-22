export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { withCache } from '@/lib/redis';
import { getDb } from '@/lib/mongodb';

export interface TestSuites {
    name: string;
    description: string;
    testCases: {
        id: string;
        feature?: string;
        scenario?: string;
        given?: string;
        when?: string;
        then?: string;
        step?: string;
        action?: string;
        expectedResult?: string;
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

async function _getTestArtifacts(): Promise<TestArtifactsItem> {

    try {
        const db = await getDb();
        const data = await db.collection<TestArtifactsItem>('test-artifacts').findOne({}, { projection: { _id: 0 } });
        if (!data) {
            throw new Error('Test artifacts document not found in MongoDB');
        }
        return data;
    } catch (error) {
        console.error('Error fetching test artifacts from MongoDB:', error);
        throw error;
    }
}

export async function getTestArtifacts() {
    return withCache('api:test-artifacts', _getTestArtifacts, 3600);
}

export async function GET() {
    const data = await getTestArtifacts();
    return NextResponse.json(data);
}
