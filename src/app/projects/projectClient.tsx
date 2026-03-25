'use client';
import { useState } from 'react';
import ProjectCard from '@/components/molecules/ProjectCard';
import { ProjectsItem } from '@/app/api/projects/route';

interface ProjectClientProps {
    projects: ProjectsItem[];
}

export default function ProjectClient({ projects }: ProjectClientProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    const safeProjects = projects || [];
    
    const allCategories = safeProjects.flatMap(p => {
        if (!p.category) return [];
        return Array.isArray(p.category) ? p.category : [p.category];
    });
    const categories = ['All', ...new Set(allCategories)];

    const filtered = activeCategory === 'All'
        ? safeProjects
        : safeProjects.filter(p =>
            Array.isArray(p.category)
                ? p.category.includes(activeCategory)
                : p.category === activeCategory
        );

    return (
        <>
            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-surface/60 text-muted hover:text-white hover:bg-surface-light/50 border border-card-border'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                    <div key={project.id} className="animate-scale-in">
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            highlights={project.highlights}
                            githubUrl={project.githubUrl}
                            webUrl={project.webUrl}
                            mobileUrl={project.mobileUrl}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
