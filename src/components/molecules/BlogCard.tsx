import React from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    tags: string[];
}

export default function BlogCard({ title, excerpt, category, date, readTime, tags }: BlogCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
                <Badge label={category} variant="info" />
                <span className="text-xs text-muted">{readTime} read</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 hover:text-primary-light transition-colors cursor-pointer">{title}</h3>
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
