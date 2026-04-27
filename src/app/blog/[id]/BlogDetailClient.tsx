'use client';

import React, { useEffect, useState } from 'react';

interface BlogDetailClientProps {
    title: string;
    pdfUrl: string;
}

export default function BlogDetailClient({ title, pdfUrl }: BlogDetailClientProps) {
    const [progress, setProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                const currentProgress = (window.scrollY / scrollHeight) * 100;
                setProgress(currentProgress);
            }
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const shareOnTwitter = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out this post: ${title}`);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    return (
        <>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
                <div 
                    className="h-full bg-gradient-to-r from-primary via-primary-light to-accent transition-all duration-150 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)] shadow-primary/50"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Floating Share & Scroll to Top */}
            <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 flex flex-col gap-4 z-40">
                {/* Share Menu */}
                <div className="flex flex-col gap-2 bg-surface/80 backdrop-blur-md border border-card-border p-2 rounded-2xl shadow-2xl animate-fade-in">
                    <button 
                        onClick={shareOnTwitter}
                        className="p-3 text-slate-400 hover:text-white hover:bg-primary/20 hover:text-primary-light rounded-xl transition-all duration-300 relative group hover:scale-110"
                        title="Share on Twitter"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-light border border-card-border text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Twitter
                        </span>
                    </button>
                    <button 
                        onClick={shareOnLinkedIn}
                        className="p-3 text-slate-400 hover:text-white hover:bg-primary/20 hover:text-primary-light rounded-xl transition-all duration-300 relative group hover:scale-110"
                        title="Share on LinkedIn"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-light border border-card-border text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            LinkedIn
                        </span>
                    </button>
                    <button 
                        onClick={copyToClipboard}
                        className="p-3 text-slate-400 hover:text-white hover:bg-primary/20 hover:text-primary-light rounded-xl transition-all duration-300 relative group hover:scale-110"
                        title="Copy Link"
                    >
                        {isCopied ? (
                            <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                        )}
                        {isCopied ? (
                            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-success text-white text-xs rounded shadow-lg whitespace-nowrap">
                                Copied!
                            </span>
                        ) : (
                            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-light border border-card-border text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Copy Link
                            </span>
                        )}
                    </button>
                </div>

                {/* Scroll to Top */}
                {showScrollTop && (
                    <button 
                        onClick={scrollToTop}
                        className="p-4 bg-primary text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-primary/40 hover:scale-110 hover:bg-primary-dark hover:ring-4 hover:ring-primary/30 transition-all duration-300 animate-scale-in relative group"
                        title="Scroll to Top"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-light border border-card-border text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Scroll to Top
                        </span>
                    </button>
                )}
            </div>

        </>
    );
}
