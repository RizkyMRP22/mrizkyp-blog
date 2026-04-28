import PageLayout from '@/components/templates/PageLayout';
import TestArtifactsTabs from '@/components/organisms/TestArtifactsTabs';
import Link from 'next/link';
import type { Metadata } from 'next';
import SectionTitle from '@/components/atoms/SectionTitle';


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
                <section data-testid="section-test-artifacts" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 z-10">
                    <SectionTitle
                        title={`${siteConfig.pages.testArtifacts.title}`}
                        subtitle={`${siteConfig.pages.testArtifacts.description}`}
                        className="mb-0"
                    />
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
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