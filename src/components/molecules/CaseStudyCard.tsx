'use client';
import React, { useState } from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

interface CaseStudyCardProps {
    title: string;
    summary: string;
    challenge: string;
    approach: string;
    solution: string;
    results: string[];
    tags: string[];
    duration: string;
}

export default function CaseStudyCard({ title, summary, challenge, approach, solution, results, tags, duration }: CaseStudyCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card className="cursor-pointer" hover={!expanded}>
            <div onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <Badge key={tag} label={tag} variant="default" />
                        ))}
                    </div>
                    <span className="text-xs text-muted">{duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{summary}</p>

                <div className="mt-3 text-xs text-primary-light flex items-center gap-1">
                    {expanded ? 'Click to collapse' : 'Click to expand'}
                    <svg className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {expanded && (
                <div className="mt-4 pt-4 border-t border-card-border space-y-4 animate-fade-in">
                    <div>
                        <h4 className="text-sm font-semibold text-accent mb-1">🎯 Challenge</h4>
                        <p className="text-sm text-slate-300">{challenge}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-secondary mb-1">🔬 Approach</h4>
                        <p className="text-sm text-slate-300">{approach}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-success mb-1">💡 Solution</h4>
                        <p className="text-sm text-slate-300">{solution}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-primary-light mb-1">📊 Results</h4>
                        <ul className="space-y-1">
                            {results.map((r, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                    <span className="text-success">✓</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </Card>
    );
}
