import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-card-border mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="border-card-border text-center text-xs text-muted">
                    © {new Date().getFullYear()} — Made with ❤️ by MRizkyP
                </div>
            </div>
        </footer>
    );
}
