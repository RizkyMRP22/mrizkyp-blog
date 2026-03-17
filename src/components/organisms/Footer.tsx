import React from 'react';
import Link from 'next/link';

const quickLinks = [
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

const socialLinks = [
    { href: 'https://github.com/mrizkyp22', label: 'GitHub', icon: '🐙' },
    { href: 'https://linkedin.com/in/mrizkyp22', label: 'LinkedIn', icon: '💼' },
    { href: 'mailto:rizky.qa@email.com', label: 'Email', icon: '✉️' },
];

export default function Footer() {
    return (
        <footer className="border-t border-card-border mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                MRP
                            </div>
                            <span className="text-lg font-bold text-white">Blog</span>
                        </div>
                        <p className="text-sm text-muted leading-relaxed">
                            Building quality into every line of code. Passionate about test automation, quality assurance, and continuous improvement.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted hover:text-primary-light transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
                        <div className="space-y-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-muted hover:text-primary-light transition-colors"
                                >
                                    <span>{link.icon}</span> {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-card-border text-center text-xs text-muted">
                    © {new Date().getFullYear()} — Made with ❤️ by MRizkyP
                </div>
            </div>
        </footer>
    );
}
