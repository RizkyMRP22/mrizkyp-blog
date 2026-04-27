import React from 'react';
import Card from '@/components/atoms/Card';
import ReadMore from '@/components/atoms/ReadMore';

interface EndorsementCardProps {
    endorsement: {
        fullName: string;
        role: string;
        relation: string;
        description: string;
        linkedinUrl?: string;
        rating?: number;
        createdAt: string;
    };
    onReadMore?: () => void;
}

export default function EndorsementCard({ endorsement, onReadMore }: EndorsementCardProps) {
    // Generate Initials
    const initials = endorsement.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    // Vibrant background colors based on initials sum
    const colors = [
        'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
        'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
        'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
        'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
        'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400'
    ];
    
    // Simple hash function for consistent color per name
    const hash = endorsement.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorClass = colors[hash % colors.length];


    return (
        <Card className="h-full flex flex-col min-h-[300px] group/card transition-all duration-500" hover onClick={onReadMore}>
            <div className="flex-1 flex flex-col">
                {endorsement.rating !== undefined && endorsement.rating !== null && (
                    <div className="flex justify-start mb-4">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs">
                            <span className="text-muted mr-1.5">Satisfaction:</span>
                            <span className="font-semibold text-amber-400">{endorsement.rating}%</span>
                        </div>
                    </div>
                )}
                <div className="relative flex-1">
                    <p className="text-muted text-sm italic mb-4 leading-relaxed line-clamp-4 group-hover/card:text-slate-200 transition-colors whitespace-pre-wrap">
                        &quot;{endorsement.description.replace(/\\n/g, '\n').replace(/<br\s*\/?>/gi, '\n')}&quot;
                    </p>
                    <ReadMore 
                        text={endorsement.description} 
                        limit={160} 
                        hoverGroupName="card"
                        className="mb-4"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-card-border/50">
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-bold text-lg bg-gradient-to-br border ${colorClass}`}>
                    {initials}
                </div>
                <div>
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                        {endorsement.fullName}
                        {endorsement.linkedinUrl && (
                            <a 
                                href={endorsement.linkedinUrl.startsWith('http') ? endorsement.linkedinUrl : `https://${endorsement.linkedinUrl}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-light transition-colors"
                                title="LinkedIn Profile"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                        )}
                    </h4>
                    <p className="text-xs text-muted">
                        {endorsement.role} <span className="opacity-50 mx-1">•</span> {endorsement.relation}
                    </p>
                </div>
            </div>
        </Card>
    );
}
