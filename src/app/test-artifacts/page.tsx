import PageLayout from '@/components/templates/PageLayout';
import TestArtifactsTabs from '@/components/organisms/TestArtifactsTabs';
import Link from 'next/link';
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
            {/* Hero Section */}
            <section data-testid="section-test-artifacts" className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
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

                {/* CTA Banner */}
                <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-700 dark:via-indigo-700 dark:to-violet-700 p-px shadow-2xl shadow-indigo-500/20">
                    <div className="relative rounded-3xl bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-violet-600/90 px-8 py-12 md:px-14 md:py-16 overflow-hidden">
                        {/* Decorative blobs */}
                        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-300/10 blur-3xl" />

                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                                    Like what you see?
                                </p>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                    Impressed? Let&rsquo;s work together.
                                </h2>
                                <p className="text-base text-blue-100 max-w-xl leading-relaxed">
                                    I&rsquo;d love to bring this level of quality assurance to your next project. Reach out and let&rsquo;s talk.
                                </p>
                            </div>

                            <Link
                                href="/contact"
                                data-testid="cta-contact-link"
                                className="
                                    group inline-flex items-center gap-3 flex-shrink-0
                                    bg-white text-indigo-700 font-bold text-base
                                    px-8 py-4 rounded-2xl shadow-lg
                                    hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5
                                    active:translate-y-0 active:shadow-md
                                    transition-all duration-200
                                "
                            >
                                Let&rsquo;s work together
                                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}