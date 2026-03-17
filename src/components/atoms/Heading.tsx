import React from 'react';

interface HeadingProps {
    level?: 1 | 2 | 3 | 4;
    children: React.ReactNode;
    gradient?: boolean;
    className?: string;
}

export default function Heading({ level = 2, children, gradient = false, className = '' }: HeadingProps) {
    const sizes = {
        1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
        2: 'text-3xl md:text-4xl font-bold',
        3: 'text-2xl md:text-3xl font-semibold',
        4: 'text-xl md:text-2xl font-semibold',
    };

    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
        <Tag className={`${sizes[level]} ${gradient ? 'gradient-text' : ''} ${className}`}>
            {children}
        </Tag>
    );
}
