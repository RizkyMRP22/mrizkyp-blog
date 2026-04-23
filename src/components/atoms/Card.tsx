import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, glow = false, style, onClick }: CardProps) {
    return (
        <div
            className={`glass rounded-2xl p-5 sm:p-6 ${hover ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300' : ''} ${glow ? 'animate-pulse-glow' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
