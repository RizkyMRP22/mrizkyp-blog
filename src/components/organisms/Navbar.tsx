'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLink from '@/components/molecules/NavLink';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/testing-strategy', label: 'Testing Strategy' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/test-artifacts', label: 'Test Artifacts' },
    { href: '/contact', label: 'Contact' },
];

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
                        className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden glass animate-fade-in border-t border-card-border">
                    <div className="px-4 py-4 space-y-1">
                        {navItems.map((item) => (
                            <NavLink key={item.href} href={item.href} label={item.label} onClick={() => setIsOpen(false)} />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
