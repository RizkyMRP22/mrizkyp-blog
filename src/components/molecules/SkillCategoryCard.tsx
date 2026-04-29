'use client';

import React, { useState } from 'react';
import Card from '@/components/atoms/Card';
import DetailModal from '@/components/organisms/DetailModal';

interface Skill {
    name: string;
    level: string;
}

interface Category {
    name: string;
    icon: string;
    skills: Skill[];
}

interface SkillCategoryCardProps {
    category: Category;
    idx: number;
    levelConfig: Record<string, { label: string, badgeClass: string, icon: string }>;
}

export default function SkillCategoryCard({ category, idx, levelConfig }: SkillCategoryCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayedSkills = category.skills.slice(0, 3);
    const hasMore = category.skills.length > 3;

    const renderSkills = (skillsToRender: Skill[], isModal = false) => (
        <div className={`space-y-3 flex-1 relative z-10 ${isModal ? 'w-full' : ''}`}>
            {skillsToRender.map((skill, sIdx) => {
                const config = levelConfig[skill.level] || levelConfig.familiar;
                return (
                    <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300 group/item"
                        style={{ animationDelay: isModal ? '0ms' : `${(idx * 100) + (sIdx * 50)}ms` }}
                    >
                        <span className="font-semibold text-sm text-slate-300 group-hover/item:text-white transition-colors">
                            {skill.name}
                        </span>
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${config.badgeClass} transition-all duration-300 group-hover/item:scale-105`}
                        >
                            <span className="text-[12px]">{config.icon}</span>
                            {config.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    return (
        <>
            <Card
                hover={true}
                className="!p-0 flex flex-col w-full h-full overflow-hidden group border border-white/5 bg-surface/40 backdrop-blur-sm transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
            >
                {/* Card top accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/80 via-secondary/60 to-transparent shrink-0" />

                <div className="p-6 sm:p-8 flex flex-col flex-1 relative">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-primary/10 group-hover:border-primary/20 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-lg shrink-0">
                            {category.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary-light transition-colors duration-300">
                            {category.name}
                        </h3>
                    </div>

                    {/* Skills List */}
                    {renderSkills(displayedSkills)}

                    {hasMore && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-6 w-full py-3 px-4 rounded-xl bg-white/[0.02] border border-white/10 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light transition-all duration-300 flex items-center justify-center gap-2 group/btn z-10 relative shadow-sm"
                        >
                            <span>Show all {category.skills.length} skills</span>
                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    )}

                    {/* Decorative Background Corner */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700 pointer-events-none"></div>
                </div>
            </Card>

            <DetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${category.name} Skills`}
                subtitle={`A comprehensive list of all ${category.skills.length} skills in this category.`}
                headerIcon={
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-3xl shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
                        {category.icon}
                    </div>
                }
                content={
                    <div className="w-full">
                        {renderSkills(category.skills, true)}
                    </div>
                }
            />
        </>
    );
}
