'use client';

import React from 'react';
import Button from '@/components/atoms/Button';

interface EndorsementDetailModalProps {
    endorsement: {
        fullName: string;
        role: string;
        relation: string;
        description: string;
        linkedinUrl?: string;
        rating?: number;
    } | null;
    onClose: () => void;
}

export default function EndorsementDetailModal({ endorsement, onClose }: EndorsementDetailModalProps) {
    if (!endorsement) return null;

    // Generate Initials
    const initials = endorsement.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    // Vibrant background colors based on initials sum
    const colors = [
        'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
        'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
        'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
        'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
        'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400'
    ];
    
    const hash = endorsement.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorClass = colors[hash % colors.length];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            <div
                className="bg-surface border border-card-border rounded-2xl w-full max-w-2xl shadow-2xl relative my-auto animate-fade-in-up overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="p-6 sm:p-10">
                    <div className="flex items-center gap-5 mb-8">
                        <div className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center font-bold text-2xl bg-gradient-to-br border ${colorClass}`}>
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                {endorsement.fullName}
                                {endorsement.linkedinUrl && (
                                    <a 
                                        href={endorsement.linkedinUrl.startsWith('http') ? endorsement.linkedinUrl : `https://${endorsement.linkedinUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary-light transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                )}
                            </h2>
                            <p className="text-muted text-sm sm:text-base">
                                {endorsement.role} <span className="opacity-50 mx-2">•</span> {endorsement.relation}
                            </p>
                        </div>
                    </div>

                    {endorsement.rating !== undefined && endorsement.rating !== null && (
                        <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm mb-6">
                            <span className="text-muted mr-2">Performance Rating:</span>
                            <span className="font-bold text-amber-400">{endorsement.rating}%</span>
                        </div>
                    )}

                    <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5 relative">
                        <svg className="absolute top-4 left-4 w-8 h-8 text-white/5 -z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M10.017 21L10.017 18C10.017 16.8954 9.12157 16 8.017 16H5.017C4.46472 16 4.017 15.5523 4.017 15V9C4.017 8.44772 4.46472 8 5.017 8H9.017C9.56928 8 10.017 8.44772 10.017 9V11"></path>
                        </svg>
                        <p className="text-slate-300 text-lg leading-relaxed italic whitespace-pre-wrap">
                            &quot;{endorsement.description.replace(/\\n/g, '\n').replace(/<br\s*\/?>/gi, '\n')}&quot;
                        </p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button onClick={onClose} variant="ghost">
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
