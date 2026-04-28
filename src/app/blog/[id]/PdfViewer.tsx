'use client';

import React, { useRef, useState } from 'react';

interface PdfViewerProps {
    pdfUrl: string;
    title: string;
}

export default function PdfViewer({ pdfUrl, title }: PdfViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Listen for fullscreen change events (e.g. Esc key)
    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const [isLoaded, setIsLoaded] = useState(false);
    
    // Process Google Drive URL if needed for better preview compatibility
    const isGoogleDrive = pdfUrl?.includes('drive.google.com');
    const processedUrl = isGoogleDrive && pdfUrl?.includes('/view') 
        ? pdfUrl.replace('/view', '/preview') 
        : pdfUrl;

    const isInvalidPdf = !pdfUrl || pdfUrl.trim() === '' || pdfUrl === '#' || pdfUrl.includes('placeholder');

    // Fallback: If iframe doesn't fire onLoad (common with PDFs), show it after a timeout
    React.useEffect(() => {
        setIsLoaded(false); // Reset when URL changes
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3000); // 3 seconds fallback
        return () => clearTimeout(timer);
    }, [processedUrl]);

    return (
        <div className="group relative mb-20 animate-slide-in-bottom" ref={containerRef}>
            {/* Glow effect - hide in fullscreen for better performance/look */}
            {!isFullscreen && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
            )}
            
            <div className={`relative bg-surface/80 backdrop-blur-md border border-card-border overflow-hidden shadow-2xl transition-all duration-500 ${isFullscreen ? 'w-full h-full rounded-0' : (isInvalidPdf ? 'rounded-2xl h-[25vh]' : 'rounded-3xl h-[60vh] md:h-[75vh]')}`}>
                {/* Controls Overlay - Visible on mobile by default, hover on desktop */}
                {!isInvalidPdf && (
                    <div className="absolute top-4 right-4 z-30 flex gap-2 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100">
                        {/* New Tab Button */}
                        <a 
                            href={`/view-media?url=${encodeURIComponent(pdfUrl)}&title=${encodeURIComponent(title)}&type=pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-surface/90 md:bg-surface/50 hover:bg-primary text-white md:text-slate-300 md:hover:text-white rounded-xl backdrop-blur-md border border-white/20 md:border-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 text-xs font-medium shadow-lg hover:-translate-y-0.5"
                            title="Open in New Tab"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="hidden sm:inline">Open</span>
                        </a>

                        {/* Fullscreen Button */}
                        <button 
                            onClick={toggleFullscreen}
                            className="p-3 bg-surface/90 md:bg-surface/50 hover:bg-primary text-white md:text-slate-300 md:hover:text-white rounded-xl backdrop-blur-md border border-white/20 md:border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {isFullscreen ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5m11-1l5 5m0 0l-5 0m5 0l0-5" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}

                {isInvalidPdf ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-surface/60 to-background/80 relative overflow-hidden border-t border-card-border/50">
                        <div className="relative z-10 animate-fade-in flex items-center gap-6 bg-surface/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5 shadow-2xl">
                            <div className="w-16 h-16 bg-surface/80 border border-card-border rounded-2xl flex items-center justify-center shadow-xl shadow-primary/5 shrink-0 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-8 h-8 text-slate-400 group-hover:text-primary-light transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-1">
                                    {title}
                                </h3>
                                <p className="text-slate-400 text-xs md:text-sm">
                                    Document preview unavailable for this article.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full relative">
                        {/* Loading State for iframe */}
                        {!isLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface animate-pulse z-10">
                                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                                <span className="text-slate-500 text-sm font-medium">Loading document...</span>
                            </div>
                        )}
                        <iframe
                            src={isGoogleDrive ? processedUrl : `${processedUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                            className={`w-full h-full border-none transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-10'}`}
                            title={title}
                            onLoad={() => setIsLoaded(true)}
                        />
                        
                        {/* Mobile Optimized Overlay - Suggest opening in new tab for better reading */}
                        {!isFullscreen && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 md:hidden w-[90%]">
                                <a 
                                    href={`/view-media?url=${encodeURIComponent(pdfUrl)}&title=${encodeURIComponent(title)}&type=pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-white rounded-2xl font-bold shadow-2xl shadow-primary/40 active:scale-95 transition-all border border-white/20"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Full Document
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
