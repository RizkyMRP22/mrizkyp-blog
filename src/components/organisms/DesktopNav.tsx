'use client';
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import NavLink from '@/components/molecules/NavLink';

interface DesktopNavProps {
    activeNavItems: any[];
    comingSoonNavItems: any[];
}

export default function DesktopNav({ activeNavItems, comingSoonNavItems }: DesktopNavProps) {
    return (
        <div className="hidden lg:flex items-center gap-1">
            {activeNavItems.map((item) => (
                <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    data-testid={`nav-desktop-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                />
            ))}

            {comingSoonNavItems.length > 0 && (
                <div className="relative group ml-2">
                    <button className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-default group">
                        <span>Lab</span>
                        <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 pt-3 w-56 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                        <div className="bg-nav-bg/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden">
                            <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 mb-1">
                                Coming Soon
                            </div>
                            <div className="flex flex-col gap-1">
                                {comingSoonNavItems.map((item) => (
                                    <div
                                        key={item.href}
                                        className="px-3 py-2.5 text-sm text-slate-400 rounded-xl transition-all flex items-center justify-between"
                                    >
                                        <span>{item.label}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
