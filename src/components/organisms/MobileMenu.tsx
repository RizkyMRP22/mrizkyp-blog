'use client';
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import NavLink from '@/components/molecules/NavLink';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    activeNavItems: any[];
    comingSoonNavItems: any[];
}

export default function MobileMenu({ isOpen, setIsOpen, activeNavItems, comingSoonNavItems }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="lg:hidden absolute top-[calc(100%-1rem)] inset-x-4 sm:inset-x-6 bg-[#09090b]/98 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 rounded-[2.5rem] overflow-hidden pointer-events-auto"
                >
                    <div className="max-h-[85vh] overflow-y-auto px-6 py-8 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            {activeNavItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                                    >
                                        <span className="text-lg font-medium text-white/80 group-hover:text-white">
                                            {item.label}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {comingSoonNavItems.length > 0 && (
                            <div className="flex flex-col gap-3 mt-4">
                                <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <div className="h-[1px] flex-1 bg-white/10"></div>
                                    <span>Coming Soon</span>
                                    <div className="h-[1px] flex-1 bg-white/10"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {comingSoonNavItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: (activeNavItems.length + index) * 0.05 }}
                                        >
                                            <div className="p-3 text-sm text-slate-500 bg-white/2 rounded-xl text-center">
                                                {item.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
