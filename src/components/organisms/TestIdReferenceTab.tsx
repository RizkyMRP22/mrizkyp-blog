'use client';

import React, { useState, useCallback } from 'react';

const TEST_IDS = [
    { id: 'navbar-logo-link', component: 'Navbar', description: 'Main logo link in the navigation bar used to return to home page.', type: 'Link' },
    { id: 'navbar-burger-button', component: 'Navbar', description: 'Mobile burger menu toggle button.', type: 'Button' },
    { id: 'nav-desktop-{label}', component: 'Navbar', description: 'Dynamic ID for desktop navigation links (e.g., nav-desktop-home, nav-desktop-about).', type: 'Link' },
    { id: 'nav-mobile-{label}', component: 'Navbar', description: 'Dynamic ID for mobile navigation links.', type: 'Link' },
    { id: 'section-hero', component: 'HeroSection', description: 'The hero section displayed at the top of the home page.', type: 'Section' },
    { id: 'section-home-quicklinks', component: 'Home Page', description: 'Explore my work quick links section.', type: 'Section' },
    { id: 'section-about', component: 'About Page', description: 'Main wrapper section for the About page.', type: 'Section' },
    { id: 'section-blog', component: 'Blog Page', description: 'Main wrapper section for the Blog page.', type: 'Section' },
    { id: 'section-case-studies', component: 'Case Studies Page', description: 'Main wrapper section for Case Studies.', type: 'Section' },
    { id: 'section-coming-soon', component: 'Coming Soon Page', description: 'Main wrapper section for Coming Soon.', type: 'Section' },
    { id: 'section-contact', component: 'Contact Page', description: 'Main wrapper section for Contact page.', type: 'Section' },
    { id: 'section-experience', component: 'Experience Page', description: 'Main wrapper section for Experience page.', type: 'Section' },
    { id: 'section-projects', component: 'Projects Page', description: 'Main wrapper for the Projects page.', type: 'Section' },
    { id: 'section-skills', component: 'Skills Page', description: 'Main wrapper for the Skills page.', type: 'Section' },
    { id: 'section-test-artifacts', component: 'Test Artifacts Page', description: 'Main wrapper for the QA Demo section.', type: 'Section' },
    { id: 'section-testing-strategy', component: 'Testing Strategy Page', description: 'Main wrapper for Testing Strategy.', type: 'Section' },
];

const TYPE_STYLES: Record<string, string> = {
    Link: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/40',
    Button: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-700/40',
    Section: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/40',
    Input: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-700/40',
};

function CopyBadge({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(`[data-testid="${value}"]`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [value]);

    return (
        <button
            onClick={handleCopy}
            title={`Copy selector: [data-testid="${value}"]`}
            className="group/copy flex items-center gap-1.5 min-w-0 text-left"
        >
            <code className="block text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-800/30 group-hover/copy:bg-blue-100 dark:group-hover/copy:bg-blue-900/40 transition-colors truncate max-w-[190px] sm:max-w-[280px]">
                {value}
            </code>
            <span className={`shrink-0 transition-all duration-300 ${copied ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600 group-hover/copy:text-blue-400'}`}>
                {copied ? (
                    <span className="text-xs font-semibold">✓</span>
                ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                )}
            </span>
        </button>
    );
}

export default function TestIdReferenceTab() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIds = TEST_IDS.filter(
        item =>
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-5">
            {/* ── Search bar ────────────────────────────────────────────────
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl px-3 py-2.5">
                <svg className="shrink-0 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                    type="text"
                    placeholder="Search by ID, component, or description…"
                    className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Clear search"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <span className="shrink-0 text-xs font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                    {filteredIds.length}/{TEST_IDS.length}
                </span>
            </div> */}

            {/* ── Cards grid ──────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                {filteredIds.length > 0 ? (
                    filteredIds.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 p-4 md:p-5 rounded-2xl hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300"
                        >
                            {/* Header: code badge (truncated) + type badge */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <CopyBadge value={item.id} />
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border shrink-0 ${TYPE_STYLES[item.type] ?? TYPE_STYLES['Section']}`}>
                                    {item.type}
                                </span>
                            </div>

                            {/* Component */}
                            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                                {item.component}
                            </p>

                            {/* Description */}
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 lg:col-span-2 py-10 text-center bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <svg className="mx-auto h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-base font-medium text-gray-900 dark:text-gray-100">No test IDs found</p>
                        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">No results matching &ldquo;{searchTerm}&rdquo;</p>
                    </div>
                )}
            </div>

            {/* ── Info banner ─────────────────────────────────────────────── */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-4 flex items-start gap-3">
                <svg className="shrink-0 mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="min-w-0">
                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">Automation Best Practices</h4>
                    <p className="text-xs md:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                        For resilient E2E UI automation (Playwright, Cypress, Selenium), always prefer
                        <code className="bg-white/50 dark:bg-black/20 px-1 py-0.5 rounded text-xs mx-1">data-testid</code>
                        over volatile CSS classes or text content. Tap any ID badge above to copy the full selector to your clipboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
