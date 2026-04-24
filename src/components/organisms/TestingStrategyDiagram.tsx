'use client';

import React, { useState } from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
// import data from '@/data/testingStrategy.json';
import { TestingStrategiesData } from '@/app/api/testing-strategies/route';

interface TestingStrategyDiagramProps {
    data: TestingStrategiesData;
}

export default function TestingStrategyDiagram({ data }: TestingStrategyDiagramProps) {
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);
    const activePhase = data.phases[activePhaseIndex];

    return (
        <div className="space-y-12">
            {/* Interactive Flowchart Diagram / Mobile Stepper */}
            <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0 pt-2 md:pt-0">
                {/* Mobile vertical timeline line */}
                <div className="md:hidden absolute top-8 bottom-8 left-[19px] w-[2px] bg-white/10 z-0"></div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-0 relative z-10 w-full mb-6">
                    {data.phases.map((phase, index) => {
                        const isActive = index === activePhaseIndex;
                        const isFirst = index === 0;

                        // Desktop arrow clip-paths ONLY applied on md breakpoint
                        let desktopClipPath = 'md:[clip-path:polygon(90%_0,100%_50%,90%_100%,0%_100%,10%_50%,0%_0)]';
                        if (isFirst) {
                            desktopClipPath = 'md:[clip-path:polygon(90%_0,100%_50%,90%_100%,0%_100%,0%_50%,0%_0)]';
                        }

                        return (
                            <button
                                key={phase.id}
                                id={`phase-${index}`}
                                onClick={() => setActivePhaseIndex(index)}
                                className={`
                                    group relative flex items-center text-left
                                    /* Mobile: simple flex-row wrapper */
                                    w-full flex-row py-1 bg-transparent
                                    
                                    /* Desktop: rigid arrow block layout */
                                    md:flex-col md:flex-1 md:w-auto md:min-w-[170px] md:justify-center md:text-center
                                    md:py-6 md:px-4 md:-ml-4 md:first:ml-0
                                    transition-all duration-300 ease-in-out md:hover:scale-105 active:scale-95
                                    ${desktopClipPath}
                                    ${isActive
                                        ? 'md:bg-gradient-to-r md:from-primary md:to-secondary md:text-white md:shadow-xl md:shadow-primary/20 md:scale-[1.05] md:z-20'
                                        : 'md:bg-card md:border-none md:text-slate-300 md:hover:bg-white/10 md:hover:text-white md:z-10'}
                                    md:min-h-[100px]
                                `}
                                style={{
                                    zIndex: isActive ? 20 : 10 - index
                                }}
                            >
                                {/* ---- MOBILE VIEW ENHANCEMENTS ---- */}

                                {/* Timeline Node Indicator */}
                                <div className={`
                                    md:hidden flex-none w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 mr-4 font-bold text-sm
                                    transition-all duration-300 ring-[#0B1120] ring-4
                                    ${isActive
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 scale-110'
                                        : 'bg-card text-slate-400 group-hover:bg-white/10 group-hover:text-white group-hover:scale-105'}
                                `}>
                                    {index + 1}
                                </div>

                                {/* Title Card */}
                                <div className={`
                                    md:hidden flex-1 px-4 py-3 rounded-xl border
                                    transition-all duration-300 shadow-sm flex flex-col justify-center
                                    ${isActive
                                        ? 'bg-gradient-to-r from-primary/10 to-transparent border-primary/30 text-white'
                                        : 'bg-card/40 border-white/5 text-slate-400 group-hover:bg-card/80 group-hover:border-white/10 group-hover:text-slate-200'}
                                `}>
                                    <span className="font-bold text-sm leading-tight drop-shadow-md">
                                        {phase.title}
                                    </span>
                                    {isActive && (
                                        <div
                                            className="text-xs text-primary/90 mt-1 flex items-center gap-1.5 cursor-pointer hover:text-primary active:scale-95 transition-transform w-fit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const detailsEl = document.getElementById('phase-details-section');
                                                if (detailsEl) {
                                                    const y = detailsEl.getBoundingClientRect().top + window.scrollY - 80; // Offset for stick nav
                                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                                }
                                            }}
                                        >
                                            <span className="border-b border-primary/30">View details</span>
                                            <svg className="w-3 h-3 animate-bounce mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* ---- DESKTOP VIEW ---- */}
                                {/* Desktop Text View (Hidden on mobile) */}
                                <span className="hidden md:block relative z-10 max-w-[140px] drop-shadow-md font-bold text-sm lg:text-base leading-tight">
                                    {phase.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Details Section */}
            <div id="phase-details-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in mt-4 md:mt-8" key={activePhase.id}>
                {/* Tasks / Explanation */}
                <div className="lg:col-span-2">
                    <Card hover={false} className="h-full border-primary/20 bg-card/50 backdrop-blur-md">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-6">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                {activePhaseIndex + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-white">{activePhase.subTitle}</h3>
                        </div>

                        <ul className="space-y-4">
                            {activePhase.tasks.map((task, idx) => {
                                // Highlight specific keywords nicely
                                const isNiceToHave = task.toLowerCase().includes('(nice to have)');
                                let displayTask = task.replace(/\(nice to have\)/i, '').trim();

                                return (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <div className="mt-1 text-primary group-hover:scale-110 transition-transform">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                                            {displayTask}
                                            {isNiceToHave && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    Nice to Have
                                                </span>
                                            )}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>
                </div>

                {/* Tools */}
                <div className="lg:col-span-1">
                    <Card hover={false} className="h-full">
                        <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <span>🛠️</span> Tools Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {activePhase.tools.map((tool, idx) => (
                                <Badge key={idx} variant="info" size="md" label={tool} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
