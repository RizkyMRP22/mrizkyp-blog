'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLink from '@/components/molecules/NavLink';

const navItems = [
    { href: '/', label: 'Home', comingSoon: process.env.NEXT_PUBLIC_ENABLE_HOME !== 'true' },
    { href: '/about', label: 'About', comingSoon: process.env.NEXT_PUBLIC_ENABLE_ABOUT !== 'true' },
    { href: '/experience', label: 'Experience', comingSoon: process.env.NEXT_PUBLIC_ENABLE_EXPERIENCE !== 'true' },
    { href: '/testing-strategy', label: 'Testing Strategy', comingSoon: process.env.NEXT_PUBLIC_ENABLE_TESTING_STRATEGY !== 'true' },
    { href: '/projects', label: 'Projects', comingSoon: process.env.NEXT_PUBLIC_ENABLE_PROJECTS !== 'true' },
    { href: '/skills', label: 'Skills', comingSoon: process.env.NEXT_PUBLIC_ENABLE_SKILLS !== 'true' },
    { href: '/case-studies', label: 'Case Studies', comingSoon: process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES !== 'true' },
    { href: '/blog', label: 'Blog', comingSoon: process.env.NEXT_PUBLIC_ENABLE_BLOG !== 'true' },
    { href: '/test-artifacts', label: 'Test Artifacts', comingSoon: process.env.NEXT_PUBLIC_ENABLE_TEST_ARTIFACTS !== 'true' },
    { href: '/contact', label: 'Contact', comingSoon: process.env.NEXT_PUBLIC_ENABLE_CONTACT !== 'true' },
].map(item => ({
    ...item,
    href: item.comingSoon ? `/coming-soon?page=${encodeURIComponent(item.label)}` : item.href,
}));

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-nav-bg shadow-xl shadow-black/20' : 'bg-transparent'}`}
            style={{ backdropFilter: scrolled ? 'blur(16px)' : 'none' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                            MRP
                        </div>
                        <span className="text-lg font-bold text-white hidden sm:block">Blog</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink key={item.href} href={item.href} label={item.label} />
                        ))}
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden relative z-50 p-2 -mr-2 rounded-xl text-slate-300 hover:bg-white/5 transition-colors focus:outline-none"
                        aria-expanded={isOpen}
                        aria-label="Toggle Navigation"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
                            <span className={`h-0.5 w-5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`h-0.5 w-5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 translate-x-3' : ''}`} />
                            <span className={`h-0.5 w-5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`
                lg:hidden absolute inset-x-0 top-full origin-top transition-all duration-300 ease-in-out border-b border-white/5 
                ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
            `}>
                <div className="bg-nav-bg/95 backdrop-blur-xl shadow-2xl max-h-[80vh] overflow-y-auto w-full border-t border-card-border">
                    <div className="px-6 py-6 flex flex-col gap-3">
                        {navItems.map((item, index) => (
                            <div
                                key={item.href}
                                className={`transform transition-all duration-300 flex flex-col ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                                style={{ transitionDelay: `${index * 40}ms` }}
                            >
                                <NavLink href={item.href} label={item.label} onClick={() => setIsOpen(false)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
