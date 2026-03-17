'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    href: string;
    label: string;
    onClick?: () => void;
}

export default function NavLink({ href, label, onClick }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg
        ${isActive
                    ? 'text-primary-light bg-primary/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }
      `}
        >
            {label}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
            )}
        </Link>
    );
}
