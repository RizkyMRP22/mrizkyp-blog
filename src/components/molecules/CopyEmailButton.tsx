'use client';

import React, { useState } from 'react';

interface CopyEmailButtonProps {
    email: string;
    icon: React.ReactNode;
    label: string;
    displayText: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
}

export default function CopyEmailButton({
    email,
    icon,
    label,
    displayText,
    colorClass,
    bgClass,
    borderClass,
}: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            data-testid="contact-link-email"
            aria-label={`${label}: ${displayText}`}
            className={`
                flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left
                transition-all duration-200 group
                ${bgClass} ${borderClass}
            `}
        >
            <span className={`transition-colors ${colorClass}`}>
                {icon}
            </span>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-muted">{label}</p>
                <p className={`text-sm font-medium transition-colors truncate ${colorClass}`}>
                    {copied ? 'Copied to clipboard!' : displayText}
                </p>
            </div>
            <span className={`text-xs transition-all duration-200 ${copied ? 'text-success' : 'text-muted group-hover:translate-x-0.5'}`}>
                {copied ? '✓' : 'Copy'}
            </span>
        </button>
    );
}
