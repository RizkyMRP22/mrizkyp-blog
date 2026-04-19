import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import TestingStrategyDiagram from '@/components/organisms/TestingStrategyDiagram';
import { getTestingPhases } from '@/app/api/testing-strategies/route';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Testing Strategy | QA Portfolio',
    description: 'Interactive overview of my end-to-end testing strategy, from grooming to post-production.',
};

export default async function TestingStrategyPage() {
    const data = await getTestingPhases();

    return (
        <PageLayout>
            <section data-testid="section-testing-strategy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 min-h-screen">
                <SectionTitle
                    title="My Testing Strategy"
                    subtitle="An end-to-end interactive journey of how I ensure quality from requirements to release."
                />

                <div className="mt-8 md:mt-12">
                    <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8 md:mb-12 italic text-sm md:text-base px-2">
                        Click on each phase below to explore the detailed activities.
                    </p>

                    <TestingStrategyDiagram data={data} />
                </div>
            </section>
        </PageLayout>
    );
}
