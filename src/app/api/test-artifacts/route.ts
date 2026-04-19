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

        // const data = await response.json();

        // // Inject dynamic data-testid test cases
        // const newResults = [
        //     {
        //         id: (data.results?.length || 0) + 1,
        //         suite: "Navigation Automation",
        //         testName: "Verify Logo Link is visible [data-testid='navbar-logo-link']",
        //         status: "Passed",
        //         duration: "120ms",
        //         timestamp: new Date().toISOString()
        //     },
        //     {
        //         id: (data.results?.length || 0) + 2,
        //         suite: "Navigation Automation",
        //         testName: "Verify Desktop Home Link [data-testid='nav-desktop-home']",
        //         status: "Passed",
        //         duration: "95ms",
        //         timestamp: new Date().toISOString()
        //     },
        //     {
        //         id: (data.results?.length || 0) + 3,
        //         suite: "Mobile Menu Automation",
        //         testName: "Open burger menu [data-testid='navbar-burger-button']",
        //         status: "Passed",
        //         duration: "210ms",
        //         timestamp: new Date().toISOString()
        //     }
        // ];

        // if (data.results) {
        //     data.results.push(...newResults);
        // } else {
        //     data.results = newResults;
        // }

        // // Also inject into testSuites if available
        // if (data.testSuites && data.testSuites.testCases) {
        //     data.testSuites.testCases.push(
        //         {
        //             id: `TC-${data.testSuites.testCases.length + 1}`,
        //             feature: "Navigation",
        //             scenario: "User navigates to homepage and sees logo",
        //             given: "The user loads the application",
        //             when: "The user views the navbar",
        //             then: "The logo element with data-testid='navbar-logo-link' exists",
        //             status: "Passed"
        //         },
        //         {
        //             id: `TC-${data.testSuites.testCases.length + 2}`,
        //             feature: "Mobile Navigation",
        //             scenario: "User opens mobile menu",
        //             given: "The user is on a mobile device",
        //             when: "The user clicks burger menu with data-testid='navbar-burger-button'",
        //             then: "The mobile menu should slide down",
        //             status: "Passed"
        //         }
        //     );
        // }

        // // Update summary numbers
        // if (data.summary) {
        //     data.summary.totalTests = (data.summary.totalTests || 0) + newResults.length;
        //     data.summary.passed = (data.summary.passed || 0) + newResults.length;
        // }

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
