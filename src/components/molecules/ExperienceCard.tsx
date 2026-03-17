import React from 'react';
import Badge from '@/components/atoms/Badge';

interface ExperienceCardProps {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    achievements: {
        contribution: string[];
        impact: string[];
    };
    technologies: string[];
    isLast?: boolean;
}

export default function ExperienceCard({ company, role, period, location, description, achievements, technologies, isLast }: ExperienceCardProps) {
    return (
        <div className="relative pl-8 pb-10 group">
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-[11px] top-6 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-primary border-4 border-surface flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            <div className="glass rounded-xl p-6 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{role}</h3>
                    <span className="text-sm text-primary-light font-medium">{period}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-semibold text-secondary">{company}</span>
                    <span className="text-xs text-muted">• {location}</span>
                </div>

                <p className="text-sm text-muted mb-5 leading-relaxed">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    {/* Contributions block */}
                    {achievements.contribution && achievements.contribution.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-5 lg:p-6 border border-white/5 hover:border-white/10 transition-colors">
                            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contribution
                            </h4>
                            <ul className="space-y-2">
                                {achievements.contribution.map((a, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                                        <span className="text-emerald-400 mt-1 min-w-[12px]">▸</span> 
                                        <span>{a}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Impact block */}
                    {achievements.impact && achievements.impact.length > 0 && (
                        <div className="bg-primary/5 rounded-xl p-5 lg:p-6 border border-primary/10 hover:border-primary/20 transition-colors">
                            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Impact
                            </h4>
                            <ul className="space-y-2">
                                {achievements.impact.map((a, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                                        <span className="text-primary-light mt-1 min-w-[12px]">▸</span> 
                                        <span>{a}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-card-border">
                    {technologies.map((tech) => (
                        <Badge key={tech} label={tech} variant="default" size="sm" />
                    ))}
                </div>
            </div>
        </div>
    );
}
