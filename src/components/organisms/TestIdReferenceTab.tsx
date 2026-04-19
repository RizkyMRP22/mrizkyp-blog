'use client';

import React, { useState } from 'react';

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
    { id: 'section-testing-strategy', component: 'Testing Strategy Page', description: 'Main wrapper for Testing Strategy.', type: 'Section' }
];

export default function TestIdReferenceTab() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIds = TEST_IDS.filter(
        item =>
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search and Filter */}
            {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by ID, component, or description..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden sm:block">
                    Showing {filteredIds.length} of {TEST_IDS.length} items
                </div>
            </div> */}

            {/* Test IDs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredIds.length > 0 ? (
                    filteredIds.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <code className="block text-sm font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-800/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                    [data-testid="{item.id}"]
                                </code>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                    {item.type}
                                </span>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 tracking-tight">
                                Component: {item.component}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 lg:col-span-2 py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">No test IDs found</p>
                        <p className="text-sm mt-1">We couldn't find anything matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-4 md:p-5 flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">Automation Best Practices</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                        For resilient E2E UI automation frameworks (like Playwright, Cypress, Selenium), always prefer querying selectors using the <code className="bg-white/50 dark:bg-black/20 px-1 py-0.5 rounded text-xs mx-1">data-testid</code> attribute over volatile CSS classes or changing text contents. The attributes cataloged here are guaranteed to be stable across redesigns.
                    </p>
                </div>
            </div>
        </div>
    );
}
