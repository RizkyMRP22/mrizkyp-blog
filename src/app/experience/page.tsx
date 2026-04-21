import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ExperienceCard from '@/components/molecules/ExperienceCard';
import type { Metadata } from 'next';
import { getExperiences } from '../api/experience/route';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: siteConfig.pages.experience.title,
    description: siteConfig.pages.experience.description,
};

export default async function ExperiencePage() {
    const experienceData = await getExperiences();
    const totalRoles = experienceData.experience.length;

    // Aggregate all unique technologies across all experiences
    const allTechs = Array.from(
        new Set(experienceData.experience.flatMap((e) => e.technologies))
    );

    return (
        <PageLayout>
            <section
                data-testid="section-experience"
                className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                {/* Page Header */}
                <SectionTitle
                    title="Experience"
                    subtitle="A chronological record of my professional journey in quality assurance — organizations I've served, contributions I've made, and impact I've delivered."
                />

                {/* Timeline */}
                <div className="mt-2 animate-fade-in delay-200">
                    {experienceData.experience.length === 0 ? (
                        /* Empty State */
                        <div className="glass rounded-2xl p-16 text-center border border-white/5">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-muted text-sm">No experience data available yet.</p>
                        </div>
                    ) : (
                        experienceData.experience.map((exp, idx) => (
                            <ExperienceCard
                                key={exp.id}
                                company={exp.company}
                                role={exp.role}
                                period={exp.period}
                                location={exp.location}
                                description={exp.description}
                                achievements={exp.achievements}
                                technologies={exp.technologies}
                                index={idx}
                                isLast={idx === experienceData.experience.length - 1}
                            />
                        ))
                    )}
                </div>
            </section>
        </PageLayout>
    );
}
