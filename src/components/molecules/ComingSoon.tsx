import React from 'react';

interface ComingSoonProps {
    title?: string;
    description?: string;
}

export default function ComingSoon({
    title = "Coming Soon",
    description = "I am currently working hard to bring this page to life. Please check back later!"
}: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
            {/* Animated Icon */}
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-cyan-400 rounded-full opacity-20 blur-xl" />
                <div className="relative flex items-center justify-center w-full h-full glass rounded-full border border-primary/30">
                    <svg className="w-10 h-10 text-cyan-400 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>

                {/* Floating particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                <div className="absolute top-1/2 -left-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="absolute -bottom-1 right-2 w-2.5 h-2.5 bg-primary-light rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            </div>

            {/* Typography */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 mb-4 tracking-tight">
                {title}
            </h2>
            <p className="max-w-md text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                {description}
            </p>

            {/* Back to Home Button */}
            <a
                href="/mrizkyp-blog"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-200 bg-primary rounded-xl hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
            >
                <span className="mr-2">←</span>
                Return to Home
                <div className="absolute inset-0 h-full w-full rounded-xl mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:20px_20px]" />
            </a>
        </div>
    );
}
