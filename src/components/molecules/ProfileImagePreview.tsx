'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProfileImagePreviewProps {
    src: string;
    alt: string;
}

export default function ProfileImagePreview({ src, alt }: ProfileImagePreviewProps) {
    const [isOpen, setIsOpen] = useState(false);

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
                className="relative z-10 w-48 h-48 mx-auto mt-8 mb-10 group/avatar cursor-pointer flex items-center justify-center"
                onClick={() => setIsOpen(true)}
                title="Click to expand photo"
            >
                {/* Outside subtle rotating dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 group-hover/avatar:border-primary/60 group-hover/avatar:scale-105 animate-[spin_15s_linear_infinite] transition-all duration-700"></div>
                
                {/* Secondary inner rotating solid ring */}
                <div className="absolute inset-[6px] rounded-full border border-secondary/20 group-hover/avatar:border-secondary/50 group-hover/avatar:scale-105 animate-[spin_20s_linear_infinite_reverse] transition-all duration-700"></div>

                {/* Expansive glowing shadow mask */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl opacity-30 group-hover/avatar:opacity-70 group-hover/avatar:scale-110 transition-all duration-700 ease-in-out"></div>
                
                {/* Core Image container */}
                <div className="absolute inset-4 rounded-full bg-slate-800 overflow-hidden border-[3px] border-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center transform group-hover/avatar:scale-[1.02] transition-transform duration-500 ease-out">
                    <Image
                        src={src}
                        alt={alt}
                        width={200}
                        height={200}
                        quality={100}
                        priority
                        className="rounded-full object-cover w-full h-full group-hover/avatar:scale-110 group-hover/avatar:rotate-1 transition-all duration-700 ease-out"
                    />
                    
                    {/* Dark bottom gradient overlay for contrast punch when hovering */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"></div>

                    {/* Hover Magnify Overlay Icon - with a smooth upward float animation */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-700 translate-y-4 group-hover/avatar:translate-y-0">
                        <div className="p-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl group-hover/avatar:animate-pulse">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Pulsing Status Dot ("Available / Online") */}
                <div className="absolute bottom-5 right-5 z-20" title="Actively Seeking Opportunities">
                    <div className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-slate-900 shadow-lg"></span>
                    </div>
                </div>
            </div>

            {/* Lightbox Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-xl animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                    onContextMenu={(e) => e.preventDefault()} /* Prevent right click globally on overlay */
                >
                    <div 
                        className="relative w-full h-full flex flex-col items-center justify-center group/modal animate-in zoom-in-95 ease-out duration-300 p-2 sm:p-6 md:p-12" 
                        onClick={(e) => e.stopPropagation()}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* Close button */}
                        <button 
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-[60] p-3 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-slate-800 hover:scale-110 transition-all shadow-2xl"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close preview"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        {/* Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                quality={100}
                                className="object-contain select-none pointer-events-none"
                                priority
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                                draggable={false}
                            />
                            {/* Security overlay to catch interactions before they hit the image */}
                            <div 
                                className="absolute inset-0 z-[50]" 
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
