'use client';
import React, { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
    name: string;
    level: number;
}

export default function SkillBar({ name, level }: SkillBarProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="mb-4">
            <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-200">{name}</span>
                <span className="text-sm font-semibold text-primary-light">{level}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-light/50 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-primary-light transition-all duration-[1500ms] ease-out"
                    style={{ width: visible ? `${level}%` : '0%' }}
                />
            </div>
        </div>
    );
}
