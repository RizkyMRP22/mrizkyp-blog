import React from 'react';

interface BadgeProps {
    label: string;
    variant?: 'default' | 'pass' | 'fail' | 'skip' | 'blocked' | 'info';
    size?: 'sm' | 'md';
}

export default function Badge({ label, variant = 'default', size = 'sm' }: BadgeProps) {
    const variants = {
        default: 'bg-primary/20 text-primary-light border-primary/30',
        pass: 'bg-success/20 text-emerald-300 border-success/30',
        fail: 'bg-danger/20 text-red-300 border-danger/30',
        skip: 'bg-warning/20 text-amber-300 border-warning/30',
        blocked: 'bg-muted/20 text-slate-300 border-muted/30',
        info: 'bg-secondary/20 text-cyan-300 border-secondary/30',
    };

    const sizes = {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizes[size]}`}>
            {label}
        </span>
    );
}
