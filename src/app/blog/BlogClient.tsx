'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import BlogCard from '@/components/molecules/BlogCard';
import { PostItem } from '@/app/api/blog/route';
import Button from '@/components/atoms/Button';

interface BlogClientProps {
    posts: PostItem[];
}

export default function BlogClient({ posts }: BlogClientProps) {
    const categories = ['All', ...Array.from(new Set(posts.flatMap(p => Array.isArray(p.category) ? p.category : [p.category])))];
    const [activeCategory, setActiveCategory] = useState('All');
    const containerRef = useRef<HTMLDivElement>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filtered = useMemo(() => {
        let result = posts;

        // Filter by category
        if (activeCategory !== 'All') {
            result = result.filter(p => Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory);
        }

        return result;
    }, [posts, activeCategory]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedPosts = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Scroll to top of section when page changes
    useEffect(() => {
        if (currentPage > 1 || activeCategory !== 'All') {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]);

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl animate-fade-in">
                <div className="w-16 h-16 bg-surface-light/50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Blog Posts Yet</h3>
                <p className="text-muted text-center max-w-md">Check back later for new insights, tutorials, and best practices.</p>
            </div>
        );
    }

    return (
        <div className="w-full" ref={containerRef}>
            {/* Controls Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                {/* Category Filter */}
                <div
                    className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex items-center gap-2 min-w-max">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer border ${activeCategory === cat
                                        ? 'bg-primary/20 border-primary text-primary-light shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                        : 'glass-light text-muted hover:text-white hover:border-primary/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {filtered.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {paginatedPosts.map((post, index) => {
                            // Calculate stagger delay (100, 200, 300, 400, 500, then repeats)
                            const delayClass = `delay-${((index % 5) + 1) * 100}`;
                            return (
                                <div key={post.id} className={`animate-scale-in ${delayClass} opacity-0`} style={{ animationFillMode: 'forwards' }}>
                                    <BlogCard
                                        id={post.id}
                                        title={post.title}
                                        excerpt={post.excerpt}
                                        category={post.category}
                                        date={post.date}
                                        readTime={post.readTime}
                                        tags={post.tags || []}
                                        link={post.link}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12 animate-fade-in">
                            <Button
                                variant="ghost"
                                disabled={currentPage === 1}
                                onClick={() => {
                                    setCurrentPage(prev => Math.max(prev - 1, 1));
                                }}
                                className="!px-5 !py-2.5 shrink-0 bg-surface/50 border border-white/5 backdrop-blur-sm disabled:opacity-30 text-sm hover:border-primary/50 transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                Previous
                            </Button>

                            <div className="flex items-center gap-1.5 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm text-xs font-bold">
                                <span className="text-primary-light tabular-nums">{currentPage}</span>
                                <span className="text-muted opacity-30">/</span>
                                <span className="text-muted tabular-nums">{totalPages}</span>
                            </div>

                            <Button
                                variant="ghost"
                                disabled={currentPage === totalPages}
                                onClick={() => {
                                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                }}
                                className="!px-5 !py-2.5 shrink-0 bg-surface/50 border border-white/5 backdrop-blur-sm disabled:opacity-30 text-sm hover:border-primary/50 transition-all active:scale-95"
                            >
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                /* Filter Empty State */
                <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl animate-fade-in">
                    <div className="w-16 h-16 bg-surface-light/50 rounded-full flex items-center justify-center mb-4 text-primary">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
                    <p className="text-muted text-center mb-6 max-w-md">We couldn't find any articles matching your search or filter criteria.</p>
                    <button
                        onClick={() => {
                            setActiveCategory('All');
                        }}
                        className="px-6 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary-light rounded-full transition-all duration-300 cursor-pointer"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
