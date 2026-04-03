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
            className={`px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full
        ${isActive
                    ? 'text-primary-light bg-primary/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
      `}
        >
            {label}
        </Link>
    );
}
