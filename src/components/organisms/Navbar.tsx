'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { navItems } from '@/config/navigation';
import { useScroll } from '@/hooks/use-scroll';
import NavbarLogo from './NavbarLogo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const scrolled = useScroll(20);
    
    // Group active and coming soon items
    const activeNavItems = navItems.filter((item) => !item.comingSoon);
    const comingSoonNavItems = navItems.filter((item) => item.comingSoon);

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center p-4 sm:p-6 pointer-events-none">
            <motion.nav 
                initial={false}
                animate={scrolled ? "scrolled" : "top"}
                variants={{
                    top: {
                        width: '100%',
                        maxWidth: '1280px',
                        backgroundColor: 'rgba(9, 9, 11, 0)',
                        backdropFilter: 'blur(0px)',
                        borderRadius: '0px',
                        padding: '0px 24px',
                        boxShadow: '0 0 0 rgba(0,0,0,0)',
                        border: '1px solid rgba(255,255,255,0)'
                    },
                    scrolled: {
                        width: 'auto',
                        maxWidth: '100%',
                        backgroundColor: 'rgba(15, 15, 20, 0.7)',
                        backdropFilter: 'blur(16px)',
                        borderRadius: '999px',
                        padding: '8px 12px 8px 24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.08)'
                    }
                }}
                className={`relative flex items-center justify-between h-16 pointer-events-auto transition-all duration-500`}
            >
                {/* Logo Section */}
                <div className="flex items-center">
                    <NavbarLogo />
                </div>

                {/* Desktop Navigation */}
                <div className={`${scrolled ? 'ml-8' : ''} transition-all duration-500`}>
                    <DesktopNav 
                        activeNavItems={activeNavItems} 
                        comingSoonNavItems={comingSoonNavItems} 
                    />
                </div>

                {/* Mobile Burger / Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden relative p-2.5 rounded-full transition-all duration-300 flex items-center justify-center
                            ${isOpen ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}
                        `}
                        aria-expanded={isOpen}
                        aria-label="Toggle Navigation"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    
                </div>

            </motion.nav>
            
            {/* Mobile Menu Overlay */}
            <MobileMenu 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                activeNavItems={activeNavItems}
                comingSoonNavItems={comingSoonNavItems}
            />
        </header>
    );
}

