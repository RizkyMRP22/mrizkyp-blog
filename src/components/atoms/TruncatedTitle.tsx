'use client';
import React, { useRef, useState, useEffect } from 'react';
import Tooltip from './Tooltip';

interface TruncatedTitleProps {
    title: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

export default function TruncatedTitle({ title, className = '', as: Component = 'h3' }: TruncatedTitleProps) {
    const textRef = useRef<HTMLElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                // For line-clamp, we check if scrollHeight is greater than offsetHeight
                const isClamped = textRef.current.scrollHeight > textRef.current.offsetHeight;
                setIsTruncated(isClamped);
            }
        };

        // Small delay to ensure styles are applied
        const timer = setTimeout(checkTruncation, 100);
        
        window.addEventListener('resize', checkTruncation);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkTruncation);
        };
    }, [title]);

    return (
        <Tooltip content={isTruncated ? title : ''} className="w-full">
            <Component 
                ref={textRef as any} 
                className={`${className} pointer-events-auto`}
            >
                {title}
            </Component>
        </Tooltip>
    );
}
