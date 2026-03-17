import React from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string | string[];
    date: string;
    readTime: string;
    tags: string[];
    link?: string;
}

export default function BlogCard({ title, excerpt, category, date, readTime, tags, link }: BlogCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <div className="flex flex-wrap items-center gap-3 mb-3">

                {Array.isArray(category) ? (
                    category.map((cat, idx) => <Badge key={idx} label={cat} variant="info" />)
                ) : (
                    <Badge label={category} variant="info" />
                )}
                <span className="text-xs text-muted">{readTime} read</span>
            </div>

            {link && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 flex items-center gap-1" title="Click title to open file">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    File Available
                </span>
            )}

            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="block w-fit group">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-light transition-colors cursor-pointer">{title}</h3>
                </a>
            ) : (
                <h3 className="text-lg font-bold text-white mb-2 transition-colors cursor-pointer">{title}</h3>
            )}

            <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{excerpt}</p>

            <div className="flex items-center justify-between pt-3 border-t border-card-border">
                <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-slate-400">#{tag}</span>
                    ))}
                </div>
                <span className="text-xs text-muted">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
        </Card>
    );
}
