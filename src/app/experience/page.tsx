import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ExperienceCard from '@/components/molecules/ExperienceCard';
import experienceData from '@/data/experience.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience | QA Portfolio',
    description: 'Professional journey as a QA Engineer - work experience and achievements.',
};

export default function ExperiencePage() {
    return (
        <PageLayout>
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="Experience" subtitle="My professional journey in quality assurance" />

                <div className="mt-8">
                    {experienceData.experience.map((exp, idx) => (
                        <ExperienceCard
                            key={exp.id}
                            company={exp.company}
                            role={exp.role}
                            period={exp.period}
                            location={exp.location}
                            description={exp.description}
                            achievements={exp.achievements}
                            technologies={exp.technologies}
                            isLast={idx === experienceData.experience.length - 1}
                        />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
