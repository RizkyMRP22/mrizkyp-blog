import PageLayout from '@/components/templates/PageLayout';
import BugReportDemo from '@/components/organisms/BugReportDemo';
import TestCaseRunner from '@/components/organisms/TestCaseRunner';
import AutomationDashboard from '@/components/organisms/AutomationDashboard';
import type { Metadata } from 'next';

import { getTestArtifacts } from '@/app/api/test-artifacts/route';

export const metadata: Metadata = {
    title: 'Test Artifacts | QA Portfolio',
    description: 'Interactive QA demos: bug report creator, test case runner, and automation result dashboard.',
};

export default async function TestArtifactsPage() {
    const apiData = await getTestArtifacts();

    // Map API response to match AutomationDashboard's expected DashboardData interface
    const automationData = {
        summary: {
            ...apiData.summary,
            passRate: apiData.summary.i ?? (apiData.summary.passRate ? parseFloat(apiData.summary.passRate) : null) ?? 0,
        },
        results: apiData.results || []
    };

    const testCasesPayload = (apiData.testSuites?.testCases || [])
        .map(tc => ({ ...tc, status: 'idle' as const }));

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
                <BugReportDemo initialData={apiData.bugReports} />
                <TestCaseRunner initialData={testCasesPayload} />
                <AutomationDashboard data={automationData} />
            </div>
        </PageLayout>
    );
}