'use client';
import React, { useState } from 'react';
import MetricCard from '@/components/molecules/MetricCard';
import Badge from '@/components/atoms/Badge';
import SectionTitle from '@/components/atoms/SectionTitle';

interface TestResult {
    id: number;
    suite: string;
    testName: string;
    status: string;
    duration: string;
    error?: string;
}

interface DashboardData {
    summary: {
        totalTests: number;
        passed: number;
        failed: number;
        skipped: number;
        avgDuration: string;
        lastRun: string;
        passRate: number;
        environment: string;
    };
    results: TestResult[];
}

export default function AutomationDashboard({ data }: { data: DashboardData }) {
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const { summary, results } = data;

    const filteredResults = filterStatus === 'all'
        ? results
        : results.filter(r => r.status === filterStatus);

    const passPercent = (summary.passed / summary.totalTests) * 100;
    const failPercent = (summary.failed / summary.totalTests) * 100;
    const skipPercent = (summary.skipped / summary.totalTests) * 100;

    return (
        <div>
            <SectionTitle title="Automation Result Dashboard" subtitle="Real-time test execution metrics and results" />

            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <MetricCard icon="🧪" label="Total Tests" value={summary.totalTests} color="text-white" />
                <MetricCard icon="✅" label="Pass Rate" value={`${summary.passRate}%`} color="text-emerald-400" subtext={`${summary.passed} passed`} />
                <MetricCard icon="❌" label="Failed" value={summary.failed} color="text-red-400" subtext={`${(100 - summary.passRate).toFixed(1)}% fail rate`} />
                <MetricCard icon="⏱" label="Avg Duration" value={summary.avgDuration} color="text-cyan-400" subtext={summary.environment} />
            </div>

            {/* Donut Chart */}
            <div className="glass rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-semibold text-white mb-6 text-center">Test Distribution</h4>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* CSS Donut */}
                    <div className="relative w-48 h-48">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                            {/* Pass */}
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.5"
                                strokeDasharray={`${passPercent} ${100 - passPercent}`} strokeDashoffset="0"
                                className="transition-all duration-1000" />
                            {/* Fail */}
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3.5"
                                strokeDasharray={`${failPercent} ${100 - failPercent}`} strokeDashoffset={`${-passPercent}`}
                                className="transition-all duration-1000" />
                            {/* Skip */}
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.5"
                                strokeDasharray={`${skipPercent} ${100 - skipPercent}`} strokeDashoffset={`${-(passPercent + failPercent)}`}
                                className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">{summary.passRate}%</span>
                            <span className="text-xs text-muted">Pass Rate</span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-emerald-500" />
                            <span className="text-sm text-slate-300">Passed: {summary.passed} ({passPercent.toFixed(1)}%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-red-500" />
                            <span className="text-sm text-slate-300">Failed: {summary.failed} ({failPercent.toFixed(1)}%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-amber-500" />
                            <span className="text-sm text-slate-300">Skipped: {summary.skipped} ({skipPercent.toFixed(1)}%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Table */}
            <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h4 className="text-lg font-semibold text-white">Test Results</h4>
                    <div className="flex gap-2">
                        {['all', 'passed', 'failed', 'skipped'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${filterStatus === s ? 'bg-primary text-white' : 'bg-surface/60 text-muted hover:text-white'}`}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-card-border text-left">
                                <th className="pb-3 text-muted font-medium">#</th>
                                <th className="pb-3 text-muted font-medium">Suite</th>
                                <th className="pb-3 text-muted font-medium">Test Name</th>
                                <th className="pb-3 text-muted font-medium">Status</th>
                                <th className="pb-3 text-muted font-medium">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.map((r) => (
                                <tr key={r.id} className="border-b border-card-border/50 hover:bg-white/5 transition-colors">
                                    <td className="py-3 text-muted">{r.id}</td>
                                    <td className="py-3 text-slate-300">{r.suite}</td>
                                    <td className="py-3 text-white">
                                        {r.testName}
                                        {r.error && <p className="text-xs text-red-400 mt-0.5">⚠ {r.error}</p>}
                                    </td>
                                    <td className="py-3">
                                        <Badge
                                            label={r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                            variant={r.status === 'passed' ? 'pass' : r.status === 'failed' ? 'fail' : 'skip'}
                                        />
                                    </td>
                                    <td className="py-3 text-muted font-mono text-xs">{r.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-xs text-muted text-right">
                    Last run: {new Date(summary.lastRun).toLocaleString()} • {summary.environment}
                </div>
            </div>
        </div>
    );
}
