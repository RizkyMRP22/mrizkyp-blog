'use client';
import React, { useState, useRef } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    className?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ children, content, className = '', position = 'top' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
        left: 'right-full top-1/2 -translate-y-1/2 mr-3',
        right: 'left-full top-1/2 -translate-y-1/2 ml-3'
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-surface-light',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-surface-light',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-surface-light',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-surface-light'
    };

    return (
        <div 
            ref={triggerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && content && (
                <div className={`absolute z-[100] w-max max-w-[280px] px-3 py-2 rounded-xl bg-surface-light/95 border border-primary/30 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] backdrop-blur-xl text-xs font-medium text-white leading-relaxed animate-scale-in pointer-events-none ${positionClasses[position]}`}>
                    {content}
                    {/* Arrow */}
                    <div className={`absolute border-[6px] border-transparent ${arrowClasses[position]}`} />
                    
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </div>
            )}
        </div>
    );
}
