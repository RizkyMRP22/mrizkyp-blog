import React from 'react';

interface ReadMoreProps {
    text: string;
    limit?: number;
    className?: string;
    hoverGroupName?: string;
    onClick?: () => void;
}

/**
 * Reusable Read More indicator for truncated text.
 * Shows a "Read More" link with an arrow if text length exceeds the limit.
 */
export default function ReadMore({ 
    text, 
    limit = 160, 
    className = '', 
    hoverGroupName,
    onClick
}: ReadMoreProps) {
    const isLong = text && text.length > limit;

    if (!isLong) return null;

    const hoverClass = hoverGroupName 
        ? `group-hover/${hoverGroupName}:translate-x-1` 
        : 'group-hover:translate-x-1';

    return (
        <div className={`mt-auto ${className}`}>
            <span 
                onClick={(e) => {
                    if (onClick) {
                        e.stopPropagation();
                        onClick();
                    }
                }}
                className={`text-primary text-xs font-bold flex items-center gap-1 ${hoverClass} transition-transform cursor-pointer hover:text-primary-light`}
            >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </span>
        </div>
    );
}
