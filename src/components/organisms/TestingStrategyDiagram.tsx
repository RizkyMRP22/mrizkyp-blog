'use client';

import React, { useState } from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import data from '@/data/testingStrategy.json';

export default function TestingStrategyDiagram() {
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);
    const activePhase = data.phases[activePhaseIndex];

    return (
        <div className="space-y-12">
            {/* Interactive Flowchart Diagram */}
            <div className="relative">
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 overflow-x-auto pb-6 hide-scrollbar">
                    {data.phases.map((phase, index) => {
                        const isActive = index === activePhaseIndex;
                        const isFirst = index === 0;
                        const isLast = index === data.phases.length - 1;

                        // Calculate dynamic clip-path for arrow shapes
                        let clipPathClass = '[clip-path:polygon(90%_0,100%_50%,90%_100%,0%_100%,10%_50%,0%_0)]';
                        if (isFirst) {
                            clipPathClass = '[clip-path:polygon(90%_0,100%_50%,90%_100%,0%_100%,0%_50%,0%_0)]';
                        }
                        
                        return (
                            <button
                                key={phase.id}
                                onClick={() => setActivePhaseIndex(index)}
                                className={`
                                    relative flex-1 min-w-[170px] py-6 px-4 md:-ml-4 first:ml-0
                                    flex items-center justify-center text-center font-bold text-sm sm:text-base
                                    transition-all duration-300 ease-in-out hover:scale-105 active:scale-95
                                    ${clipPathClass}
                                    ${isActive 
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white z-20 shadow-xl shadow-primary/20 scale-105' 
                                        : 'bg-card border-none text-slate-300 hover:bg-white/10 hover:text-white z-10'}
                                    md:min-h-[100px]
                                `}
                                style={{
                                    zIndex: isActive ? 20 : 10 - index
                                }}
                            >
                                <span className="relative z-10 max-w-[120px] drop-shadow-md">{phase.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" key={activePhase.id}>
                {/* Tasks / Explanation */}
                <div className="lg:col-span-2">
                    <Card hover={false} className="h-full border-primary/20 bg-card/50 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                {activePhaseIndex + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-white">{activePhase.title} Details</h3>
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
