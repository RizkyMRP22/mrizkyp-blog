import React from 'react';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
    return (
        <div className={`text-center mb-12 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">{title}</h2>
            {subtitle && <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
            <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
        </div>
    );
}
