import React from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    highlights: string[];
    githubUrl?: string;
    webUrl?: string;
    mobileUrl?: string;
}

export default function ProjectCard({ title, description, tags, highlights, githubUrl, webUrl, mobileUrl }: ProjectCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-muted text-sm mb-4 leading-relaxed">{description}</p>

                <div className="mb-4">
                    {highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 mb-1">
                            <span className="text-success mt-0.5">✓</span>
                            <span className="text-sm text-slate-300">{h}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag) => (
                        <Badge key={tag} label={tag} variant="info" />
                    ))}
                </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-card-border items-center">
                {githubUrl && githubUrl !== '#' && githubUrl !== '' && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-light hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        GitHub
                    </a>
                )}
                {webUrl && webUrl !== '#' && webUrl !== '' && (
                    <a href={webUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Web
                    </a>
                )}
                {mobileUrl && mobileUrl !== '#' && mobileUrl !== '' && (
                    <a href={mobileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        Mobile
                    </a>
                )}
            </div>
        </Card>
    );
}
