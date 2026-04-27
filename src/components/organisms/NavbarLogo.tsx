'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavbarLogo() {
    return (
        <Link 
            href="/" 
            className="flex items-center gap-3 group relative transition-all duration-300 outline-none" 
            data-testid="navbar-logo-link"
        >
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Ambient Glow */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md"
                    initial={{ opacity: 0.4, scale: 1 }}
                    whileHover={{ opacity: 1, scale: 1.25 }}
                    transition={{ duration: 0.5 }}
                />
                
                {/* Core Logo Block */}
                <motion.div 
                    className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 border border-white/20 overflow-hidden"
                    whileHover={{ rotate: -6, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                    {/* Inner subtle highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                    
                    <svg 
                        className="w-6 h-6 text-white relative z-10" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                        />
                    </svg>
                </motion.div>
            </div>
            
            <div className="hidden sm:flex flex-col justify-center">
                <span className="text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                    MRizkyP<span className="text-primary-light group-hover:text-primary transition-colors duration-300">.</span>QA
                </span>
            </div>
        </Link>
    );
}
