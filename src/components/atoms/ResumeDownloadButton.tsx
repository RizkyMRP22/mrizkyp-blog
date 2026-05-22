'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the modal so the heavy @react-pdf bundle only loads on demand
const ResumeDownloadModal = dynamic(
    () => import('@/components/organisms/ResumeDownloadModal'),
    { ssr: false }
);

export default function ResumeDownloadButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                id="download-resume-btn"
                onClick={() => setIsOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 group cursor-pointer"
            >
                <svg
                    className="w-5 h-5 group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                Download Resume
            </button>

            {isOpen && (
                <ResumeDownloadModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
