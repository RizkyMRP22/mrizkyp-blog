import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    style?: React.CSSProperties;
}

export default function Card({ children, className = '', hover = true, glow = false, style }: CardProps) {
    return (
        <div
            className={`glass rounded-2xl p-6 ${hover ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300' : ''} ${glow ? 'animate-pulse-glow' : ''} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
