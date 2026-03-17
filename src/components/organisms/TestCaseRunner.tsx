'use client';
import React, { useState } from 'react';
import TestCaseRow from '@/components/molecules/TestCaseRow';
import SectionTitle from '@/components/atoms/SectionTitle';
import Button from '@/components/atoms/Button';

interface TestCase {
    id: string;
    step: string;
    action: string;
    expectedResult: string;
    status: 'idle' | 'pass' | 'fail' | 'skip';
}

const initialTestCases: TestCase[] = [
    { id: 'TC-001', step: 'Navigate to login page', action: 'Open browser and go to /login', expectedResult: 'Login page loads with email and password fields', status: 'idle' },
    { id: 'TC-002', step: 'Enter valid email', action: "Type 'user@example.com' in email field", expectedResult: 'Email field accepts input without error', status: 'idle' },
    { id: 'TC-003', step: 'Enter valid password', action: "Type 'P@ssw0rd123' in password field", expectedResult: 'Password is masked and field shows no error', status: 'idle' },
    { id: 'TC-004', step: 'Click login button', action: "Click the 'Sign In' button", expectedResult: 'Loading spinner appears, request sent to API', status: 'idle' },
    { id: 'TC-005', step: 'Verify successful login', action: 'Wait for redirect to dashboard', expectedResult: 'User is redirected to /dashboard with welcome message', status: 'idle' },
    { id: 'TC-006', step: 'Enter invalid email format', action: "Type 'invalid-email' in email field", expectedResult: "Validation error: 'Please enter a valid email address'", status: 'idle' },
    { id: 'TC-007', step: 'Submit with empty password', action: 'Leave password field empty and click Sign In', expectedResult: "Validation error: 'Password is required'", status: 'idle' },
    { id: 'TC-008', step: 'Test incorrect credentials', action: 'Enter valid email but wrong password, click Sign In', expectedResult: "Error message: 'Invalid email or password'", status: 'idle' },
];

export default function TestCaseRunner() {
    const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);

    const handleStatusChange = (id: string, status: 'pass' | 'fail' | 'skip') => {
        setTestCases(prev => prev.map(tc => tc.id === id ? { ...tc, status: tc.status === status ? 'idle' : status } : tc));
    };

    const resetAll = () => setTestCases(initialTestCases);

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
                        step={tc.step}
                        action={tc.action}
                        expectedResult={tc.expectedResult}
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
