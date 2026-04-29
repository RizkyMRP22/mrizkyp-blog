import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import SkillCategoryCard from '@/components/molecules/SkillCategoryCard';
import { getSkills } from '@/app/api/skills/route';
import { siteConfig } from '@/config/site';

const levelConfig: Record<string, { label: string, badgeClass: string, icon: string }> = {
    expert: { 
        label: "Expert", 
        badgeClass: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]", 
        icon: "✨" 
    },
    proficient: { 
        label: "Proficient", 
        badgeClass: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]", 
        icon: "🚀" 
    },
    familiar: { 
        label: "Familiar", 
        badgeClass: "bg-primary/10 text-primary-light border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary),0.1)]", 
        icon: "🌱" 
    },
};

export default async function SkillsPage() {
    const data = await getSkills();

    // Sort by order
    const sortedCategories = [...data.skillCategories].sort((a, b) => (a.order || 0) - (b.order || 0));

    // Calculate total skills for a quick stats overview
    const totalSkills = data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

    return (
        <PageLayout>
            <div className="relative overflow-hidden w-full h-full min-h-screen">
                {/* Decorative background elements */}
                <div className="absolute top-20 left-1/4 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-1/4 w-[35rem] h-[35rem] bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <section data-testid="section-skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
                    <div className="text-center mb-16">
                        <SectionTitle
                            title={siteConfig.pages.skills.title}
                            subtitle={siteConfig.pages.skills.description}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedCategories.map((category, idx) => (
                            <SkillCategoryCard 
                                key={category.name} 
                                category={category} 
                                idx={idx} 
                                levelConfig={levelConfig} 
                            />
                        ))}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}

