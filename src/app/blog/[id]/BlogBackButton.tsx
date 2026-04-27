'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';

interface BlogBackButtonProps {
    className?: string;
    variant?: 'ghost' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export default function BlogBackButton({
    className = '',
    variant = 'ghost',
    size = 'md'
}: BlogBackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        // Try to close the window first
        // Most browsers will only allow window.close() if it was opened by script
        // or if it's a standalone tab with no history.
        const canClose = window.history.length <= 1;

        window.close();

        // If window.close() didn't work (still here), navigate back
        setTimeout(() => {
            router.push('/blog');
        }, 100);
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleBack}
            className={`gap-3 group backdrop-blur-sm bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300 ${className}`}
        >
            <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to List</span>
        </Button>
    );
}
