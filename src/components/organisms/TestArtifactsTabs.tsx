'use client';

import React, { useState } from 'react';
import BugReportDemo from '@/components/organisms/BugReportDemo';
import TestCaseRunner from '@/components/organisms/TestCaseRunner';
import AutomationDashboard from '@/components/organisms/AutomationDashboard';
import TestIdReferenceTab from '@/components/organisms/TestIdReferenceTab';
import ProjectShowcaseTab from '@/components/organisms/ProjectShowcaseTab';
import showcaseData from '@/data/project-showcase.json';

interface TestArtifactsTabsProps {
    bugReports: any;
    testCases: any;
    automationData: any;
}

export default function TestArtifactsTabs({
    bugReports,
    testCases,
    automationData,
}: TestArtifactsTabsProps) {
    const [activeTab, setActiveTab] = useState<'project-showcase' | 'bug-report' | 'test-runner' | 'automation-dashboard' | 'testid-reference'>('project-showcase');

    const tabs = [
        { 
            id: 'project-showcase', 
            label: 'Project Showcase', 
            description: 'Demonstrations and highlights',
            icon: '🎬',
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-100 dark:bg-indigo-900/30'
        },
        { 
            id: 'bug-report', 
            label: 'Bug Report Creator', 
            description: 'Practice logging defects',
            icon: '🐞',
            color: 'text-red-600 dark:text-red-400',
            bg: 'bg-red-100 dark:bg-red-900/30'
        },
        { 
            id: 'test-runner', 
            label: 'Interactive Test Runner', 
            description: 'Execute predefined step-by-step test cases',
            icon: '⚡',
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30'
        },
        { 
            id: 'automation-dashboard', 
            label: 'Results Dashboard', 
            description: 'Analyze execution metrics and rates',
            icon: '📊',
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-100 dark:bg-purple-900/30'
        },
        {
            id: 'testid-reference',
            label: 'Test Identifiers',
            description: 'Reference of data-testid attributes',
            icon: '🎯',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-900/30'
        }
    ] as const;

    const activeTabMeta = tabs.find((t) => t.id === activeTab)!;

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex flex-col items-center mb-8 md:mb-12 px-2 sm:px-4">

                {/* ── Mobile: icon-only chip row ─────────────────────────────── */}
                <div className="flex md:hidden w-full justify-center mb-3">
                    <div
                        className="flex gap-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    aria-label={tab.label}
                                    title={tab.label}
                                    className={`
                                        flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0
                                        transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500
                                        ${isActive
                                            ? 'bg-white dark:bg-gray-900 shadow-md ring-1 ring-gray-200/60 dark:ring-gray-700/60 scale-105'
                                            : 'hover:bg-gray-200/60 dark:hover:bg-gray-700/50 opacity-70 hover:opacity-100'}
                                    `}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${isActive ? tab.bg : 'bg-transparent'}`}>
                                        <span className={`text-lg leading-none ${isActive ? tab.color : 'text-gray-500 dark:text-gray-400'}`}>
                                            {tab.icon}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Mobile: active-tab label strip ─────────────────────────── */}
                <div className="flex md:hidden items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${activeTabMeta.color}`}>
                        {activeTabMeta.label}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 hidden xs:inline">
                        — {activeTabMeta.description}
                    </span>
                </div>

                {/* ── md+: full pill row ─────────────────────────────────────── */}
                <div className="hidden md:flex overflow-x-auto no-scrollbar">
                    <div className="inline-flex flex-nowrap bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`
                                        flex items-center gap-3 px-5 lg:px-6 py-3.5 rounded-full text-center
                                        transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-w-max flex-shrink-0
                                        ${isActive
                                            ? 'bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-700/50 z-10'
                                            : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50 opacity-80 hover:opacity-100'}
                                    `}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full ${isActive ? tab.bg : 'bg-gray-200 dark:bg-gray-700'}`}>
                                        <span className={`text-base ${isActive ? tab.color : 'text-gray-500 dark:text-gray-400'}`}>
                                            {tab.icon}
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-bold text-sm lg:text-base whitespace-nowrap ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {tab.label}
                                        </div>
                                        <div className={`text-xs mt-0.5 hidden xl:block whitespace-nowrap ${isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
                                            {tab.description}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="relative w-full">
                {activeTab === 'project-showcase' && (
                    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-6 md:p-10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Project Showcase</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Video and image demonstrations of framework capabilities and features.</p>
                            </div>
                        </div>
                        <ProjectShowcaseTab data={showcaseData as any} />
                    </div>
                )}

                {activeTab === 'bug-report' && (
                    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-6 md:p-10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Bug Report Creator</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Practice logging comprehensive defects to ensure quick resolution.</p>
                            </div>
                        </div>
                        <BugReportDemo initialData={bugReports} />
                    </div>
                )}
                
                {activeTab === 'test-runner' && (
                    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-6 md:p-10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Interactive Test Runner</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Execute predefined test cases step-by-step and track execution status.</p>
                            </div>
                        </div>
                        <TestCaseRunner initialData={testCases} />
                    </div>
                )}
                
                {activeTab === 'automation-dashboard' && (
                    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-6 md:p-10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Automation Results Dashboard</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Analyze test execution metrics and identify flaky tests.</p>
                            </div>
                        </div>
                        <AutomationDashboard data={automationData} />
                    </div>
                )}

                {activeTab === 'testid-reference' && (
                    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 p-4 sm:p-6 md:p-10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Data Test Identifiers</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">A comprehensive reference of all structural data-testid properties injected for reliable UI Automation.</p>
                            </div>
                        </div>
                        <TestIdReferenceTab />
                    </div>
                )}
            </div>
        </div>
    );
}
