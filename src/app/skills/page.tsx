import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import Card from '@/components/atoms/Card';
import SkillBar from '@/components/molecules/SkillBar';
import { getSkills } from '@/app/api/skills/route';

export default async function SkillsPage() {
    const data = await getSkills();

    // Calculate total skills for a quick stats overview
    const totalSkills = data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

    return (
        <PageLayout>
            <div className="relative overflow-hidden w-full h-full">
                {/* Decorative background elements */}
                <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <section data-testid="section-skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
                    <div className="text-center mb-16">
                        <SectionTitle 
                            title="Skills & Expertise" 
                            subtitle="A comprehensive overview of my technical capabilities and toolset." 
                        />
                        
                        {/* Highlights Row */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-105">
                                <span className="text-2xl">🚀</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{data.skillCategories.length} Categories</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-105">
                                <span className="text-2xl">⚡</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{totalSkills}+ Technologies</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-105">
                                <span className="text-2xl">💡</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Continuous Learner</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.skillCategories.map((category, idx) => (
                            <Card 
                                key={category.name} 
                                hover={true} 
                                className={`animate-fade-in group relative overflow-hidden backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 transition-all duration-300 w-full hover:shadow-2xl hover:shadow-primary/5`} 
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Card gradient hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                
                                <div className="relative z-10 flex items-center gap-4 mb-8 pb-4 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 group-hover:border-gray-200 dark:group-hover:border-gray-700">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-3xl shadow-sm group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all duration-300">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                </div>
                                <div className="relative z-10 space-y-6">
                                    {category.skills.map((skill) => (
                                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
