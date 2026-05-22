'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ResumePreviewContent = dynamic(
    () => import('./ResumePreviewContent'),
    {
        ssr: false,
        loading: () => (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-300 p-4">
                <svg className="w-12 h-12 animate-spin text-primary mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <p className="text-base font-semibold tracking-wide animate-pulse">Loading Premium Resume Viewer...</p>
            </div>
        ),
    }
);

export default function ClientPreviewWrapper() {
    return <ResumePreviewContent />;
}
