'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLink from '@/components/molecules/NavLink';

import { navItems } from '@/config/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Group active and coming soon items
    const activeNavItems = navItems.filter((item) => !item.comingSoon);
    const comingSoonNavItems = navItems.filter((item) => item.comingSoon);

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
                    <Link href="/" className="flex items-center gap-3 group relative transition-all duration-300 outline-none" data-testid="navbar-logo-link">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                            {/* Core Logo Block */}
                            <div className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 border border-white/20 group-hover:border-white/50 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 overflow-hidden">
                                {/* Inner subtle highlight */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                                <svg className="w-6 h-6 text-white relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col justify-center">
                            <span className="text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                MRizkyP<span className="text-primary-light group-hover:text-primary transition-colors duration-300">.</span>QA
                            </span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {activeNavItems.map((item) => (
                            <NavLink key={item.href} href={item.href} label={item.label} data-testid={`nav-desktop-${item.label.toLowerCase().replace(/\s+/g, '-')}`} />
                        ))}

                        {/* Coming Soon Dropdown */}
                        {comingSoonNavItems.length > 0 && (
                            <div className="relative group">
                                <button className="px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-1 cursor-default">
                                    Coming Soon
                                    <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {/* Invisible pt-2 bridge connects hover target area strictly */}
                                <div className="absolute top-full right-0 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                                    <div className="bg-nav-bg/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl">
                                        <div className="p-2 flex flex-col gap-1">
                                            {comingSoonNavItems.map((item) => (
                                                <Link 
                                                    key={item.href} 
                                                    href={item.href}
                                                    className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden relative z-50 p-2.5 -mr-2 rounded-xl border transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 ${
                            isOpen 
                                ? 'bg-primary/10 text-primary border-primary/20 shadow-lg shadow-primary/10' 
                                : 'bg-transparent text-slate-300 border-transparent hover:bg-white/5 hover:text-white hover:border-white/10'
                        }`}
                        aria-expanded={isOpen}
                        aria-label="Toggle Navigation"
                        data-testid="navbar-burger-button"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
                            <span className={`h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-5'}`} />
                            <span className={`h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'w-0 opacity-0 translate-x-2' : 'w-5'}`} />
                            <span className={`h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
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
                        {activeNavItems.map((item, index) => (
                            <div
                                key={item.href}
                                className={`transform transition-all duration-300 flex flex-col ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                                style={{ transitionDelay: `${index * 40}ms` }}
                            >
                                <NavLink href={item.href} label={item.label} onClick={() => setIsOpen(false)} data-testid={`nav-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`} />
                            </div>
                        ))}

                        {/* Coming Soon Mobile Submenu */}
                        {comingSoonNavItems.length > 0 && (
                            <div 
                                className={`transform transition-all duration-300 flex flex-col gap-2 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                                style={{ transitionDelay: `${activeNavItems.length * 40}ms` }}
                            >
                                <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-4 border-t border-white/10 pt-6 mb-1">
                                    Coming Soon
                                </div>
                                {comingSoonNavItems.map((item) => (
                                    <Link 
                                        key={item.href} 
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ml-2"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

