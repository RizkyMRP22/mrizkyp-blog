'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ProfileImagePreviewProps {
    src: string;
    alt: string;
}

export default function ProfileImagePreview({ src, alt }: ProfileImagePreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const blurNow = () => setIsBlurred(true);
    const restoreAfter = (ms = 3000) => {
        if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current);
        restoreTimerRef.current = setTimeout(() => {
            if (document.hasFocus() && !document.hidden) setIsBlurred(false);
        }, ms);
    };

    // Anti-screenshot obfuscation (Desktop: Window focus + Keyboard Shortcuts)
    useEffect(() => {
        const handleBlur = () => blurNow();
        const handleFocus = () => {
            if (!document.hidden) setIsBlurred(false);
        };
        const handleVisibilityChange = () => {
            // Fires when iOS screenshot sheet appears or app switcher is invoked
            if (document.hidden) {
                blurNow();
            } else {
                // Small delay — screenshot sheet dismissal triggers visibilitychange too
                restoreAfter(1500);
            }
        };

        // pagehide fires on iOS when the app moves to background (e.g. cmd-tab equivalent)
        const handlePageHide = () => blurNow();
        const handlePageShow = () => restoreAfter(1500);

        // Desktop: blur on Cmd/Ctrl+Shift (screenshot modifier combo) or PrintScreen
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
                blurNow();
            }
            if (e.key === 'PrintScreen') {
                blurNow();
                restoreAfter(3000);
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (!((e.metaKey || e.ctrlKey) && e.shiftKey) && document.hasFocus() && !document.hidden) {
                setIsBlurred(false);
            }
        };

        // Mobile: detect 3-finger touches — iOS screenshot gesture is power+volume,
        // but app-switcher swipes and some assistive-touch screenshot shortcuts use 3 fingers.
        // More importantly, any time touchcount >= 3 on the lightbox we proactively blur.
        let touchBlurTimer: ReturnType<typeof setTimeout> | null = null;
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length >= 3) {
                blurNow();
                // Restore ~2s later if nothing happened
                touchBlurTimer = setTimeout(() => {
                    if (document.hasFocus() && !document.hidden) setIsBlurred(false);
                }, 2000);
            }
        };
        const handleTouchEnd = () => {
            if (touchBlurTimer) {
                clearTimeout(touchBlurTimer);
                touchBlurTimer = null;
            }
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('pageshow', handlePageShow);
        window.addEventListener('keydown', handleKeyDown, { capture: true });
        window.addEventListener('keyup', handleKeyUp, { capture: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });

        // Run once on mount in case it spawned in background
        setIsBlurred(document.hidden || !document.hasFocus());

        return () => {
            if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current);
            if (touchBlurTimer) clearTimeout(touchBlurTimer);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('pageshow', handlePageShow);
            window.removeEventListener('keydown', handleKeyDown, { capture: true });
            window.removeEventListener('keyup', handleKeyUp, { capture: true });
            window.removeEventListener('touchstart', handleTouchStart, { capture: true });
            window.removeEventListener('touchend', handleTouchEnd, { capture: true });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <div 
                className="relative z-10 w-32 h-32 md:w-40 xl:w-48 md:h-40 xl:h-48 mx-auto mt-6 lg:mt-8 mb-8 group/avatar cursor-pointer"
                onClick={() => setIsOpen(true)}
                title="Click to expand photo"
            >
                {/* Glowing ambient background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary-light to-secondary blur-xl md:blur-2xl opacity-40 group-hover/avatar:opacity-80 transition-opacity duration-700"></div>
                
                {/* Animated gradient ring wrapper */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 p-[2px] opacity-70 group-hover/avatar:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full rounded-full bg-slate-900 border border-slate-800"></div>
                </div>

                {/* Core Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] md:border-[4px] border-slate-900 shadow-2xl z-10 flex items-center justify-center transform group-hover/avatar:scale-105 transition-transform duration-500 ease-out bg-slate-800">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                        quality={100}
                        priority
                        className={`rounded-full object-cover group-hover/avatar:scale-110 group-hover/avatar:-rotate-2 transition-all duration-700 ease-out select-none ${isBlurred ? 'blur-xl opacity-20 grayscale scale-110' : ''}`}
                        style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                    />
                    {/* Mobile CSS screenshot-corruption overlay: mix-blend-mode trick.
                         Invisible during normal viewing (blend cancels out on screen renderers)
                         but appears as a coloured artifact in screenshot pixel data. */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full pointer-events-none select-none z-[5]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(15,23,42,0.04) 2px, rgba(15,23,42,0.04) 4px)',
                            mixBlendMode: 'difference',
                            WebkitUserSelect: 'none',
                        }}
                    />
                    
                    {/* Privacy Lock Icon (Shows when blurred) */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${isBlurred ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <div className="p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white shadow-2xl flex flex-col items-center gap-1">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Protected</span>
                        </div>
                    </div>
                    
                    {/* Dark gradient overlay for hover contrast */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"></div>

                    {/* Hover Magnify Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 scale-50 group-hover/avatar:scale-100">
                        <div className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Status Dot ("Available / Online") */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 lg:bottom-3 lg:right-3 z-20" title="Actively Seeking Opportunities">
                    <div className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-green-500 border-2 border-slate-900 shadow-lg"></span>
                    </div>
                </div>
            </div>

            {/* Lightbox Overlay using Portal to break out of containing blocks */}
            {isOpen && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/98 backdrop-blur-xl animate-in fade-in duration-300 cursor-zoom-out"
                    onClick={() => setIsOpen(false)}
                    onContextMenu={(e) => e.preventDefault()} /* Prevent right click globally on overlay */
                >
                    <div 
                        className="relative w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 slide-in-from-bottom-2 sm:slide-in-from-bottom-0 ease-out duration-300 p-4 sm:p-8 md:p-16" 
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* Interactive Hint (Desktop) */}
                        <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/60 text-xs sm:text-sm font-medium hidden sm:flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-700 delay-300 fill-mode-both pointer-events-none shadow-lg">
                            Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-[10px] sm:text-xs">ESC</kbd> or click outside to close
                        </div>

                        {/* Close button */}
                        <button 
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[60] p-2.5 sm:p-3 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center justify-center group"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                            aria-label="Close preview"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        {/* Image Container */}
                        <div className={`relative w-full h-full flex items-center justify-center max-w-5xl mx-auto transition-all duration-700 ${isBlurred ? 'blur-3xl opacity-10 scale-95 grayscale' : ''}`}>
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                quality={100}
                                className="object-contain select-none pointer-events-none drop-shadow-2xl"
                                style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                                priority
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                                draggable={false}
                            />
                            {/* Security overlay: catches right-clicks/drags, and on mobile
                                 the mix-blend-mode layer corrupts screenshot pixel data */}
                            <div 
                                className="absolute inset-0 z-[50]" 
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            {/* Mobile CSS screenshot-corruption overlay (mix-blend-mode difference).
                                 Visually transparent on real displays; appears as distortion in screenshots. */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-[51] pointer-events-none select-none"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)',
                                    mixBlendMode: 'difference',
                                    WebkitUserSelect: 'none',
                                }}
                            />
                        </div>

                        {/* Privacy Lock inside Lightbox (Shows when blurred) */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 transition-all duration-500 pointer-events-none ${isBlurred ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                            <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700 shadow-2xl flex flex-col items-center gap-3">
                                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                <span className="text-sm uppercase tracking-[0.2em] font-bold text-slate-400">Content Protected</span>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
