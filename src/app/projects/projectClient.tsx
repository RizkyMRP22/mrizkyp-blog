'use client';
import { useState, useMemo } from 'react';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectImageModal from '@/components/organisms/ProjectImageModal';
import { ProjectsItem } from '@/app/api/projects/route';

interface ProjectClientProps {
    projects: ProjectsItem[];
}

export default function ProjectClient({ projects }: ProjectClientProps) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<{ images: string[], title: string } | null>(null);

    const safeProjects = projects || [];
    const baseURL = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || '';

    // Helper to process images with baseURL
    const processImages = (image: string | string[] | undefined): string[] => {
        if (!image) return [];
        const imageArray = Array.isArray(image) ? image : [image];
        return imageArray.map(img => img.startsWith('/') ? `${baseURL}${img}` : img);
    };
    
    // Extract unique categories safely
    const categories = useMemo(() => {
        const allCategories = safeProjects.flatMap(p => {
            if (!p.category) return [];
            return Array.isArray(p.category) ? p.category : [p.category];
        });
        return ['All', ...new Set(allCategories)];
    }, [safeProjects]);

    // Filter projects based on category
    const filtered = useMemo(() => {
        return safeProjects.filter(p => {
            return activeCategory === 'All'
                || (Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory);
        });
    }, [safeProjects, activeCategory]);

    const handleImageClick = (project: ProjectsItem) => {
        const images = processImages(project.image);
        setSelectedProject({ images, title: project.title });
    };

    return (
        <div className="flex flex-col space-y-12">
            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                            activeCategory === cat 
                                ? 'bg-primary/20 text-white border-primary/50 border shadow-[0_0_20px_rgba(var(--color-primary),0.3)]' 
                                : 'bg-surface/50 text-slate-400 hover:text-white hover:bg-surface border border-white/5 shadow-sm'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, idx) => (
                    <div 
                        key={project.id} 
                        className="animate-fade-in-up" 
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            category={project.category}
                            image={processImages(project.image)}
                            onImageClick={() => handleImageClick(project)}
                            highlights={project.highlights}
                            githubUrl={project.githubUrl}
                            webUrl={project.webUrl}
                            mobileUrl={project.mobileUrl}
                        />
                    </div>
                ))}
            </div>
            
            {filtered.length === 0 && (
                <div className="text-center text-slate-400 py-12">
                    No projects found for this category.
                </div>
            )}

            {/* Project Image Modal */}
            {selectedProject && (
                <ProjectImageModal
                    images={selectedProject.images}
                    title={selectedProject.title}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}
