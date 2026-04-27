import React from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

interface BlogCardProps {
    id: string;
    title: string;
    excerpt: string;
    category: string | string[];
    date: string;
    readTime: string;
    tags: string[];
    link?: string;
}

export default function BlogCard({ id, title, excerpt, category, date, readTime, tags, link }: BlogCardProps) {
    return (
        <Card className="flex flex-col h-full relative group hover:border-primary/50 transition-colors duration-300">
            {/* Absolute link to make the entire card clickable */}
            <a href={`/blog/${id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50">
                <span className="sr-only">Read article {title}</span>
            </a>

            {/* Header: Badges & Read Time */}
            <div className="flex flex-wrap justify-between items-start gap-3 mb-4 relative z-20 pointer-events-none">
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(category) ? (
                        category.map((cat, idx) => <Badge key={idx} label={cat} variant="info" />)
                    ) : (
                        <Badge label={category} variant="info" />
                    )}
                </div>
                
                {link && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 flex items-center gap-1 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        PDF
                    </span>
                )}
            </div>

            {/* Content: Title & Excerpt */}
            <div className="flex-1 flex flex-col pointer-events-none relative z-20">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors line-clamp-2 leading-snug">
                    {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1 line-clamp-3 mb-6">
                    {excerpt}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-card-border/50 flex flex-col gap-4 relative z-20 pointer-events-none">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{readTime} read</span>
                        <span className="mx-1">&bull;</span>
                        <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface/80 text-secondary-light border border-white/5">
                                #{tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface/50 text-muted">
                                +{tags.length - 3}
                            </span>
                        )}
                    </div>
                    <div className="text-primary-light text-sm font-medium flex items-center gap-1 group-hover:text-primary transition-colors">
                        <span>Read</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Card>
    );
}
