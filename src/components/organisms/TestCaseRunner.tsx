'use client';
import React, { useState } from 'react';
import TestCaseRow from '@/components/molecules/TestCaseRow';
import SectionTitle from '@/components/atoms/SectionTitle';
import Button from '@/components/atoms/Button';

export interface TestCase {
    id: string;
    feature: string;
    scenario: string;
    given: string;
    when: string;
    then: string;
    status: 'idle' | 'pass' | 'fail' | 'skip';
}

const initialTestCases: TestCase[] = [
    { id: 'TC-001', feature: 'Navigation Menu', scenario: 'User navigates to the About page', given: 'The user is on the Home page', when: 'The user clicks on the "About" link in the navigation menu', then: 'The user should be redirected to the About page', status: 'idle' },
    { id: 'TC-002', feature: 'Theme Toggle', scenario: 'User switches from dark to light mode', given: 'The user is on the application viewing in dark mode', when: 'The user clicks the theme toggle button', then: 'The application theme should switch to light mode', status: 'idle' },
    { id: 'TC-003', feature: 'Blog', scenario: 'User reads a blog post', given: 'The user is on the Blog list page', when: 'The user clicks on a specific blog post title', then: 'The user should be redirected to the blog post details page', status: 'idle' },
    { id: 'TC-004', feature: 'Contact Form', scenario: 'User submits a contact message', given: 'The user is on the Contact page', when: 'The user fills in "Name", "Email", and "Message" fields and clicks "Send"', then: 'A success message should be displayed', status: 'idle' },
    { id: 'TC-005', feature: 'Test Case Artifacts', scenario: 'User marks a test case as passed', given: 'The user is on the Test Artifacts page viewing the Test Case Runner', when: 'The user clicks the "✓ Pass" button for a given test case', then: 'The test case status indicator should turn green and the passed count should increase', status: 'idle' },
    { id: 'TC-006', feature: 'Projects List', scenario: 'User filters projects by skill', given: 'The user is on the Projects page', when: 'The user clicks on the "React" skill filter tag', then: 'Only projects built with React should be displayed in the list', status: 'idle' },
];

export default function TestCaseRunner({ initialData }: { initialData?: TestCase[] }) {
    const defaultData = initialData && initialData.length > 0 ? initialData : initialTestCases;
    const [testCases, setTestCases] = useState<TestCase[]>(defaultData);

    const handleStatusChange = (id: string, status: 'pass' | 'fail' | 'skip') => {
        setTestCases(prev => prev.map(tc => tc.id === id ? { ...tc, status: tc.status === status ? 'idle' : status } : tc));
    };

    const resetAll = () => setTestCases(prev => prev.map(tc => ({ ...tc, status: 'idle' })));

    const total = testCases.length;
    const executed = testCases.filter(tc => tc.status !== 'idle').length;
    const passed = testCases.filter(tc => tc.status === 'pass').length;
    const failed = testCases.filter(tc => tc.status === 'fail').length;
    const skipped = testCases.filter(tc => tc.status === 'skip').length;
    const progress = total > 0 ? (executed / total) * 100 : 0;

    return (
        <div>
            <SectionTitle title="Interactive Test Case Runner" subtitle="Execute test cases and track results in real-time" />

            {/* Progress Bar */}
            <div className="glass rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Test Progress</span>
                    <span className="text-sm font-semibold text-primary-light">{executed}/{total} executed ({Math.round(progress)}%)</span>
                </div>
                <div className="w-full h-3 bg-surface-light/50 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-success transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Test Cases */}
            <div className="space-y-3 mb-6">
                {testCases.map((tc) => (
                    <TestCaseRow
                        key={tc.id}
                        id={tc.id}
                        feature={tc.feature}
                        scenario={tc.scenario}
                        given={tc.given}
                        when={tc.when}
                        then={tc.then}
                        status={tc.status}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>

            {/* Summary */}
            <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-white">Test Summary</h4>
                    <Button variant="ghost" size="sm" onClick={resetAll}>Reset All</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-surface/40">
                        <div className="text-2xl font-bold text-white">{total}</div>
                        <div className="text-xs text-muted">Total</div>
                    </div>
                    <div className="p-3 rounded-lg bg-success/10">
                        <div className="text-2xl font-bold text-emerald-300">{passed}</div>
                        <div className="text-xs text-muted">Passed</div>
                    </div>
                    <div className="p-3 rounded-lg bg-danger/10">
                        <div className="text-2xl font-bold text-red-300">{failed}</div>
                        <div className="text-xs text-muted">Failed</div>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10">
                        <div className="text-2xl font-bold text-amber-300">{skipped}</div>
                        <div className="text-xs text-muted">Skipped</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
