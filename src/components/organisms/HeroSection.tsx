'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import { ProfileItem } from '@/app/api/profile/route';
import { sendGAEvent } from '@next/third-parties/google';

export default function HeroSection({ profileData }: { profileData: ProfileItem }) {
    const titles = profileData.titles;

    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentTitle = titles[titleIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentTitle.length) {
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (charIndex > 0) {
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTitleIndex((titleIndex + 1) % titles.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex, titles]);

    return (
        <section data-testid="section-hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-float delay-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <div className="animate-fade-in">
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4">Welcome to My Blog</p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {profileData.name}
                    </h1>
                    <div className="flex justify-center mb-6 w-full px-2 sm:px-0">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 max-w-full">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="hidden sm:inline">ISTQB® Certified Tester Foundation Level (CTFL)</span>
                            <span className="sm:hidden truncate">ISTQB® CTFL</span>
                        </div>
                    </div>
                    <div className="text-2xl md:text-4xl font-bold mb-6 h-12 md:h-14 flex items-center justify-center">
                        <span className="gradient-text">{titles[titleIndex].substring(0, charIndex)}</span>
                        <span className="ml-0.5 w-[2px] h-8 md:h-10 bg-primary-light animate-pulse" />
                    </div>
                    <p className="text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
                        {/* {profileData.tagline}. {profileData.bio} */}
                        {profileData.tagline}

                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in delay-300">
                    <Link href="/testing-strategy" onClick={() => sendGAEvent('event', 'select_content', { value: 'hero_testing_strategy' })}>
                        <Button variant="primary" size="lg">View My Work</Button>
                    </Link>
                    <Link href="/contact" onClick={() => sendGAEvent('event', 'generate_lead', { value: 'hero_contact_button' })}>
                        <Button variant="ghost" size="lg">Get In Touch</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in delay-500">
                    {[
                        { value: `${profileData.stats.yearsExperience}+`, label: 'Years Experience' },
                        { value: `${profileData.stats.projectsCompleted}+`, label: 'Projects' },
                        { value: `${profileData.stats.bugsFound >= 1000 ? (profileData.stats.bugsFound / 1000) + 'K+' : profileData.stats.bugsFound + '+'}`, label: 'Bugs Found' },
                        { value: `${profileData.stats.testCasesWritten >= 1000 ? (profileData.stats.testCasesWritten / 1000) + 'K+' : profileData.stats.testCasesWritten + '+'}`, label: 'Test Cases' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold gradient-text-primary">{stat.value}</div>
                            <div className="text-sm text-muted mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="mt-16 animate-bounce">
                    <svg className="w-6 h-6 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
