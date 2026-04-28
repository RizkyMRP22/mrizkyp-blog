import PageLayout from '@/components/templates/PageLayout';
import TestArtifactsTabs from '@/components/organisms/TestArtifactsTabs';
import Link from 'next/link';
import type { Metadata } from 'next';

import { getTestArtifacts } from '@/app/api/test-artifacts/route';
import { getShowcases } from '@/app/api/project-showcases/route';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: siteConfig.pages.testArtifacts.title,
    description: siteConfig.pages.testArtifacts.description,
};

export default async function TestArtifactsPage() {
    const apiData = await getTestArtifacts();
    const showcasesResponse = await getShowcases();

    // Map API response to match AutomationDashboard's expected DashboardData interface
    const automationData = {
        summary: {
            ...apiData.summary,
            passRate: apiData.summary.i ?? (apiData.summary.passRate ? parseFloat(apiData.summary.passRate) : null) ?? 0,
        },
        results: apiData.results || []
    };

    const testCasesPayload = (apiData.testSuites?.testCases || [])
        .map((tc: any) => ({
            id: tc.id || '',
            feature: tc.feature || 'General',
            scenario: tc.scenario || tc.step || 'Undefined',
            given: tc.given || 'Context',
            when: tc.when || tc.action || 'Action',
            then: tc.then || tc.expectedResult || 'Result',
            status: 'idle' as const
        })).filter(tc => tc.feature !== 'General'); // Filter out backend ones if they don't have BDD features defined yet

    return (
        <PageLayout>
            <div className="relative w-full overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-float delay-300" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                {/* Hero Section */}
                <section data-testid="section-test-artifacts" className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
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

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
                    <TestArtifactsTabs
                        bugReports={apiData.bugReports}
                        testCases={testCasesPayload}
                        automationData={automationData}
                        projectShowcases={showcasesResponse?.showcases || (Array.isArray(showcasesResponse) ? showcasesResponse : [])}
                    />
                </div>
            </div>
        </PageLayout>
    );
}