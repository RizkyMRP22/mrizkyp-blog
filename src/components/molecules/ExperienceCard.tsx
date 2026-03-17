import React from 'react';
import Badge from '@/components/atoms/Badge';

interface ExperienceCardProps {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
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

                <p className="text-sm text-muted mb-3">{description}</p>

                <ul className="space-y-1.5 mb-4">
                    {achievements.map((a, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-accent mt-0.5">▸</span> {a}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                        <Badge key={tech} label={tech} variant="default" size="sm" />
                    ))}
                </div>
            </div>
        </div>
    );
}
