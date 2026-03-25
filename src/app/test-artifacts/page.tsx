import PageLayout from '@/components/templates/PageLayout';
import TestArtifactsTabs from '@/components/organisms/TestArtifactsTabs';
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
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-500/30">
                        Portfolio Showcases
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">QA Artifacts</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        Explore hands-on demonstrations of industry-standard QA processes. From logging bugs to executing test cases and analyzing automation results.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <TestArtifactsTabs 
                    bugReports={apiData.bugReports}
                    testCases={testCasesPayload}
                    automationData={automationData}
                />
            </div>
        </PageLayout>
    );
}