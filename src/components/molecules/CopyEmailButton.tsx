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

    const handleScrollToForm = () => {
        const formElement = document.getElementById('contact-form-section');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const copyIcon = (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
        </svg>
    );

    const messageIcon = (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );

    const checkIcon = (
        <svg fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );

    return (
        <div
            className={`
                flex flex-col w-full px-5 py-4 rounded-xl border
                transition-all duration-300
                ${bgClass} ${borderClass}
            `}
        >
            <div className="flex items-center gap-4 mb-3">
                <span className={`transition-colors p-2 rounded-lg bg-white/5 ${colorClass}`}>
                    {icon}
                </span>
                <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs text-muted mb-0.5">{label}</p>
                    <p className={`text-sm font-semibold transition-colors truncate ${colorClass}`}>
                        {displayText}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-1">
                <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium border border-white/5 hover:border-white/10 ${copied ? 'text-success' : 'text-slate-200'}`}
                >
                    {copied ? checkIcon : copyIcon}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                    onClick={handleScrollToForm}
                    className="lg:hidden flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 transition-colors text-xs font-medium border border-indigo-500/20 hover:border-indigo-500/30"
                >
                    {messageIcon}
                    Send Message
                </button>
            </div>
        </div>
    );
}
