import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import CaseStudyCard from '@/components/molecules/CaseStudyCard';
import type { Metadata } from 'next';
import { getCaseStudies } from '@/app/api/case-studies/route';

export const metadata: Metadata = {
    title: 'QA Case Studies | QA Portfolio',
    description: 'Real-world QA success stories showcasing problem-solving and quality improvements.',
};

export default async function CaseStudiesPage() {

    const caseStudiesData = await getCaseStudies();

    return (
        <PageLayout>
            <section data-testid="section-case-studies" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="QA Case Studies" subtitle="Real-world quality challenges and how I solved them" />

                <div className="space-y-6">
                    {caseStudiesData.caseStudies.map((cs) => (
                        <CaseStudyCard
                            key={cs.id}
                            title={cs.title}
                            summary={cs.summary}
                            challenge={cs.challenge}
                            approach={cs.approach}
                            solution={cs.solution}
                            results={cs.results}
                            tags={cs.tags}
                            duration={cs.duration}
                        />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
