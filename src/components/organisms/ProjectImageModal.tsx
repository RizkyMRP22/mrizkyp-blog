'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';

interface ProjectImageModalProps {
    images: string[];
    title: string;
    onClose: () => void;
    initialIndex?: number;
}

export default function ProjectImageModal({ images, title, onClose, initialIndex = 0 }: ProjectImageModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!images || images.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300">
            {/* Top Gradient Overlay for readability */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-[105] pointer-events-none" />
            
            {/* Bottom Gradient Overlay for readability */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-[105] pointer-events-none" />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2.5 sm:p-3 text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-md shadow-lg"
                aria-label="Close modal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {/* Title Overlay */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[110] max-w-[calc(100%-80px)]">
                <h3 className="text-white font-bold text-lg sm:text-2xl drop-shadow-md leading-tight">{title}</h3>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5 font-medium">Image {currentIndex + 1} of {images.length}</p>
            </div>

            {/* Main Content */}
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-12 md:p-20">
                {/* Previous Button */}
                {images.length > 1 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-8 z-[110] p-3 sm:p-4 text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 border border-white/10 backdrop-blur-md shadow-xl group"
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Image Container */}
                <div className="relative w-full h-full max-w-6xl flex items-center justify-center animate-fade-in overflow-hidden">
                    <div className={`relative w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} - Image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                            onLoad={() => setIsLoaded(true)}
                        />
                    </div>
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-8 z-[110] p-3 sm:p-4 text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 border border-white/10 backdrop-blur-md shadow-xl group"
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Thumbnail Navigation / Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 sm:gap-3 z-[110] p-2 sm:p-2.5 bg-black/50 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (currentIndex !== idx) {
                                    setIsLoaded(false);
                                    setCurrentIndex(idx);
                                }
                            }}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                                currentIndex === idx ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(var(--color-primary),0.8)]' : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
