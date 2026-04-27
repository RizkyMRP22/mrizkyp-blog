'use client';
import { useState, useMemo, useEffect } from 'react';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectImageModal from '@/components/organisms/ProjectImageModal';
import DetailModal from '@/components/organisms/DetailModal';
import Badge from '@/components/atoms/Badge';
import { ProjectsItem } from '@/app/api/projects/route';

interface ProjectClientProps {
    projects: ProjectsItem[];
}

export default function ProjectClient({ projects }: ProjectClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedProject, setSelectedProject] = useState<{ images: string[], title: string } | null>(null);
    const [selectedProjectDetail, setSelectedProjectDetail] = useState<ProjectsItem | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const scrollRef = useMemo(() => ({ current: null as HTMLDivElement | null }), []);

    // Detect mobile for responsive items per page
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const ITEMS_PER_PAGE = isMobile ? 1 : 3;
    const safeProjects = projects || [];
    const baseURL = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || '';
    const filtered = safeProjects;
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    // Handle scroll to update current page and progress
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.offsetWidth;
        const progress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;
        setScrollProgress(progress);

        const itemWidth = container.offsetWidth;
        const newPage = Math.round(scrollPosition / (itemWidth * (isMobile ? 1 : 1))) + 1;

        const adjustedPage = isMobile
            ? Math.min(Math.max(1, newPage), filtered.length)
            : Math.min(Math.max(1, Math.round(scrollPosition / itemWidth) + 1), totalPages);

        if (adjustedPage !== currentPage) {
            setCurrentPage(adjustedPage);
        }
    };

    const scrollToPage = (page: number) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const itemWidth = container.offsetWidth;
        container.scrollTo({
            left: (page - 1) * itemWidth,
            behavior: 'smooth'
        });
    };

    // Helper to process images with baseURL
    const processImages = (image: string | string[] | undefined): string[] => {
        if (!image) return [];
        const imageArray = Array.isArray(image) ? image : [image];
        return imageArray.map(img => img.startsWith('/') ? `${baseURL}${img}` : img);
    };

    // handleCategoryChange removed

    const handleImageClick = (project: ProjectsItem) => {
        const images = processImages(project.image);
        setSelectedProject({ images, title: project.title });
    };

    return (
        <div className="flex flex-col space-y-6">
            {/* Simple Header */}
            <div className="flex items-center justify-between px-4">
                <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Project Showcase</h4>
                    <p className="text-sm text-slate-400">Exploring <span className="text-white font-semibold">{filtered.length}</span> curated works</p>
                </div>
            </div>

            {/* Carousel Section */}
            <div className="relative group/carousel px-4">
                {/* Navigation Arrows */}
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={() => scrollToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 disabled:opacity-0 flex items-center justify-center shadow-lg lg:opacity-0 lg:group-hover/carousel:opacity-100"
                            aria-label="Previous Page"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 disabled:opacity-0 flex items-center justify-center shadow-lg lg:opacity-0 lg:group-hover/carousel:opacity-100"
                            aria-label="Next Page"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Project Items (Slider Window) */}
                <div className="flex flex-col gap-10">
                    <div
                        ref={(el) => { scrollRef.current = el; }}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 sm:gap-8 lg:gap-10 pb-4"
                    >
                        {filtered.map((project, idx) => (
                            <div
                                key={project.id}
                                className="snap-start shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.67rem)] animate-fade-in-up flex items-stretch"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    tags={project.tags}
                                    category={project.category}
                                    image={processImages(project.image)}
                                    onImageClick={() => handleImageClick(project)}
                                    onReadMore={() => setSelectedProjectDetail(project)}
                                    highlights={project.highlights}
                                    githubUrl={project.githubUrl}
                                    webUrl={project.webUrl}
                                    mobileUrl={project.mobileUrl}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Carousel Navigation Footer - Cohesive Control Center */}
                    {totalPages > 1 && (
                        <div className="flex flex-col items-center gap-8 pt-10 border-t border-white/5">
                            <div className="flex items-center justify-between w-full max-w-lg px-6">
                                {/* Previous Button */}
                                <button
                                    onClick={() => scrollToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="group/btn flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white disabled:opacity-10 transition-all duration-300"
                                >
                                    <div className="p-2 rounded-lg bg-surface/50 border border-white/5 group-hover/btn:border-primary/50 group-hover/btn:bg-primary/10 transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                    <span className="hidden sm:inline">Prev</span>
                                </button>

                                {/* Center Position Indicators - Progress Bar Style */}
                                <div className="flex flex-col items-center gap-5 flex-1 max-w-[240px] sm:max-w-xs">
                                    {/* Progress Track */}
                                    <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_10px_rgba(var(--color-primary),0.5)]"
                                            style={{ width: `${scrollProgress}%` }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                                        <span className="text-slate-600">{isMobile ? 'PROJECT' : 'PAGE'}</span>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                                            <span className="text-white">{currentPage}</span>
                                            <span className="text-slate-600">/</span>
                                            <span className="text-slate-500">{totalPages}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => scrollToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="group/btn flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white disabled:opacity-10 transition-all duration-300"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <div className="p-2 rounded-lg bg-surface/50 border border-white/5 group-hover/btn:border-primary/50 group-hover/btn:bg-primary/10 transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Empty state removed as we don't filter anymore */}

            {/* Project Image Modal */}
            {selectedProject && (
                <ProjectImageModal
                    images={selectedProject.images}
                    title={selectedProject.title}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {/* Project Detail Modal */}
            {selectedProjectDetail && (
                <DetailModal
                    isOpen={!!selectedProjectDetail}
                    onClose={() => setSelectedProjectDetail(null)}
                    title={selectedProjectDetail.title}
                    subtitle={Array.isArray(selectedProjectDetail.category) ? selectedProjectDetail.category.join(', ') : selectedProjectDetail.category}
                    headerIcon={
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    }
                    content={
                        <div className="space-y-6">
                            <p className="text-slate-300 leading-relaxed">
                                {selectedProjectDetail.description}
                            </p>

                            {selectedProjectDetail.highlights && selectedProjectDetail.highlights.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Highlights</h4>
                                    <ul className="space-y-2">
                                        {selectedProjectDetail.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedProjectDetail.tags && selectedProjectDetail.tags.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProjectDetail.tags.map((tag) => (
                                            <Badge key={tag} label={tag} variant="info" />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                />
            )}
        </div>
    );
}
