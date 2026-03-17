'use client';
import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import Card from '@/components/atoms/Card';
import SkillBar from '@/components/molecules/SkillBar';
import skillsData from '@/data/skills.json';

export default function SkillsPage() {
    return (
        <PageLayout>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="Skills & Expertise" subtitle="A comprehensive overview of my technical capabilities" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillsData.categories.map((category, idx) => (
                        <Card key={category.name} hover={false} className={`animate-fade-in`} style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-3xl">{category.icon}</span>
                                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                            </div>
                            <div>
                                {category.skills.map((skill) => (
                                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
