'use client';

import React from 'react';
import Button from '@/components/atoms/Button';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    headerIcon?: React.ReactNode;
    content: React.ReactNode;
    badge?: {
        label: string;
        value: string;
        colorClass?: string;
    };
    footerActions?: React.ReactNode;
}

export default function DetailModal({
    isOpen,
    onClose,
    title,
    subtitle,
    headerIcon,
    content,
    badge,
    footerActions
}: DetailModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose} />
            
            <div
                className="bg-surface border border-card-border rounded-2xl w-full max-w-2xl shadow-2xl relative my-auto animate-fade-in-up overflow-hidden z-10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors z-20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="p-6 sm:p-10">
                    <div className="flex items-start gap-5 mb-8 pr-8 sm:pr-0">
                        {headerIcon && (
                            <div className="shrink-0">
                                {headerIcon}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-white break-words">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-muted text-sm sm:text-base break-words mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {badge && (
                        <div className={`inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm mb-6 ${badge.colorClass || ''}`}>
                            <span className="text-muted mr-2">{badge.label}:</span>
                            <span className="font-bold">{badge.value}</span>
                        </div>
                    )}

                    <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5 relative">
                        <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap break-words">
                            {content}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-3">
                            {footerActions}
                        </div>
                        <Button onClick={onClose} variant="ghost">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
