'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    label: string;
    onClick?: () => void;
}

export default function NavLink({ href, label, onClick, ...props }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full outline-none
                ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
            `}
            {...props}
        >
            {isActive && (
                <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full z-[-1]"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
            )}
            <span className="relative z-10">{label}</span>
        </Link>
    );
}
