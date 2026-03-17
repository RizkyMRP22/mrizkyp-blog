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
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 flex items-center gap-1.5 w-fit">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {period}
                    </span>
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

                <div className="pt-5 mt-auto border-t border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <span 
                                key={tech} 
                                className="px-2.5 py-1 text-[11px] font-medium bg-secondary/10 text-cyan-200 border border-secondary/20 rounded-md hover:bg-secondary/20 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
