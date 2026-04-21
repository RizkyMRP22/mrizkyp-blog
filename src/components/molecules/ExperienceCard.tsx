"use client";

import React, { useState } from 'react';
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
    index?: number;
}

export default function ExperienceCard({
    company,
    role,
    period,
    location,
    description,
    achievements,
    technologies,
    isLast,
    index = 0,
}: ExperienceCardProps) {
    const [isExpanded, setIsExpanded] = useState(index === 0);

    // Stagger delay classes
    const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];
    const delayClass = delays[index % delays.length];

    const hasContributions = achievements.contribution && achievements.contribution.length > 0;
    const hasImpact = achievements.impact && achievements.impact.length > 0;
    const hasCollapsibleContent = hasContributions || hasImpact || technologies.length > 0;

    return (
        <div className={`relative pl-8 pb-12 group animate-fade-in ${delayClass}`}>
            {/* Timeline connector line */}
            {!isLast && (
                <div className="absolute left-[11px] top-6 w-0.5 h-full bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
            )}

            {/* Timeline dot with pulse ring */}
            <div className="absolute left-0 top-1.5 flex items-center justify-center">
                {/* Pulse ring (visible only for first/most recent) */}
                {index === 0 && (
                    <span className="absolute w-6 h-6 rounded-full bg-primary/30 animate-ping" />
                )}
                <div className="relative w-6 h-6 rounded-full bg-primary border-4 border-surface flex items-center justify-center group-hover:scale-125 transition-transform duration-300 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
            </div>

            {/* Card */}
            <div className="glass rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-white/[0.06] hover:border-primary/20 transition-all duration-300">

                {/* Card top accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/80 via-secondary/60 to-transparent" />

                <div className="p-6 md:p-8">
                    {/* Header: Role + Period */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-1">
                        <h3 className="text-xl font-bold text-white leading-snug tracking-tight pr-2">
                            {role}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20 whitespace-nowrap self-start shrink-0">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {period}
                        </span>
                    </div>

                    {/* Company & Location */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5">
                        <span className="text-base font-semibold text-secondary">{company}</span>
                        <span className="text-muted/40">•</span>
                        <span className="inline-flex items-center gap-1 text-sm text-muted">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </span>
                    </div>

                    {/* Description */}
                    <p className={`text-sm text-slate-300 leading-relaxed border-l-2 border-primary/30 pl-3 italic ${hasCollapsibleContent && !isExpanded ? 'mb-4' : 'mb-6'}`}>
                        {description}
                    </p>

                    {/* Toggle Button */}
                    {hasCollapsibleContent && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group/btn flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-primary-light transition-colors duration-200 focus:outline-none mb-1"
                        >
                            <span>{isExpanded ? 'Less Details' : 'More Details'}</span>
                            <svg 
                                className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : ''}`} 
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Collapsible Content */}
                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            {/* Contribution & Impact Grid */}
                            {(hasContributions || hasImpact) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                                    {/* Contributions */}
                                    {hasContributions && (
                                        <div className="rounded-xl p-5 bg-white/[0.03] border border-white/[0.06] hover:border-emerald-400/20 hover:bg-emerald-400/[0.03] transition-all duration-300">
                                            <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-400/10">
                                                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                                Contribution
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {achievements.contribution.map((item, i) => (
                                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                                                        <span className="text-emerald-400 mt-0.5 shrink-0 text-xs">▸</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Impact */}
                                    {hasImpact && (
                                        <div className="rounded-xl p-5 bg-primary/[0.04] border border-primary/10 hover:border-primary/25 hover:bg-primary/[0.07] transition-all duration-300">
                                            <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
                                                    <svg className="w-3.5 h-3.5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </span>
                                                Impact
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {achievements.impact.map((item, i) => (
                                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                                                        <span className="text-primary-light mt-0.5 shrink-0 text-xs">▸</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Tech Stack */}
                            {technologies.length > 0 && (
                                <div className="pt-5 border-t border-white/[0.05]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tech Stack</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 text-[11px] font-semibold bg-cyan-400/5 text-cyan-300 border border-cyan-400/15 rounded-md hover:bg-cyan-400/15 hover:border-cyan-400/30 hover:text-cyan-200 transition-all duration-200 cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

