'use client';
import React, { useState } from 'react';
import { Input, Textarea } from '@/components/atoms/Input';
import BugReportCard from '@/components/molecules/BugReportCard';
import Button from '@/components/atoms/Button';
import SectionTitle from '@/components/atoms/SectionTitle';
import type { BugReport } from '@/app/api/test-artifacts/route';

const FALLBACK_BUG: BugReport = {
    id: 'BR-000',
    title: 'Login button unresponsive on mobile Safari',
    severity: 'High',
    priority: 'P1',
    environment: 'iOS 17.2, Safari 17, iPhone 15 Pro',
    stepsToReproduce:
        "1. Open the app on mobile Safari\n2. Navigate to /login\n3. Enter valid credentials\n4. Tap the 'Sign In' button",
    expectedResult: 'User should be authenticated and redirected to the dashboard page.',
    actualResult: "The 'Sign In' button does not respond to tap events. No network request is triggered.",
    additionalNotes: 'Issue only occurs on Safari mobile. Chrome and Firefox mobile work correctly.',
    status: 'Open',
    assignee: 'Frontend Team',
    reportedBy: 'M. Rizky Pratama',
    dateReported: '2026-03-15',
};

function SingleBugReport({ bug, isInitiallyExpanded }: { bug: BugReport, isInitiallyExpanded: boolean }) {
    const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState<BugReport>(bug);

    const handleExport = () => {
        const text = `# Bug Report: ${data.title}
Severity: ${data.severity} | Priority: ${data.priority}
Environment: ${data.environment}
Status: ${data.status} | Assignee: ${data.assignee}
Reported By: ${data.reportedBy} | Date: ${data.dateReported}

## Steps to Reproduce
${data.stepsToReproduce}

## Expected Result
${data.expectedResult}

## Actual Result
${data.actualResult}

## Additional Notes
${data.additionalNotes}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bug-report-${data.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`border border-card-border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-lg bg-surface/5' : 'hover:border-primary/30 bg-surface/10'}`}>
            {/* Clickable Header for expand/collapse */}
            <div 
                className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 cursor-pointer hover:bg-surface/20 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                    <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md shrink-0">{data.id}</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200 truncate pr-2">{data.title}</span>
                </div>
                <div className="flex items-center justify-center shrink-0 ml-2 text-slate-400">
                    <svg 
                        className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 border-t border-card-border">
                    {/* Action Bar inside Expanded View */}
                    <div className="bg-surface/30 px-4 sm:px-5 py-3 border-b border-card-border flex justify-end">
                         <div className="flex gap-2 w-full sm:w-auto">
                            <Button
                                variant={editing ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setEditing((v) => !v)}
                                className="flex-1 sm:flex-none justify-center"
                            >
                                {editing ? '👁 Preview' : '✏️ Edit'}
                            </Button>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={handleExport} 
                                className="flex-1 sm:flex-none justify-center"
                            >
                                📥 Export
                            </Button>
                        </div>
                    </div>

                    {editing ? (
                        <div className="p-4 sm:p-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                                <Input label="Environment" value={data.environment} onChange={(e) => setData({ ...data, environment: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-300">Severity</label>
                                    <select value={data.severity} onChange={(e) => setData({ ...data, severity: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                                        <option value="Critical">Critical</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-300">Priority</label>
                                    <select value={data.priority} onChange={(e) => setData({ ...data, priority: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                                        <option value="P0">P0</option>
                                        <option value="P1">P1</option>
                                        <option value="P2">P2</option>
                                        <option value="P3">P3</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-300">Status</label>
                                    <select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            <Textarea label="Steps to Reproduce" rows={4} value={data.stepsToReproduce} onChange={(e) => setData({ ...data, stepsToReproduce: e.target.value })} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Textarea label="Expected Result" rows={3} value={data.expectedResult} onChange={(e) => setData({ ...data, expectedResult: e.target.value })} />
                                <Textarea label="Actual Result" rows={3} value={data.actualResult} onChange={(e) => setData({ ...data, actualResult: e.target.value })} />
                            </div>
                            <Textarea label="Additional Notes" rows={2} value={data.additionalNotes} onChange={(e) => setData({ ...data, additionalNotes: e.target.value })} />
                        </div>
                    ) : (
                        <div className="p-4 sm:p-5">
                            <BugReportCard {...data} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function BugReportDemo({ initialData }: { initialData?: BugReport[] }) {
    const reports = initialData && initialData.length > 0 ? initialData : [FALLBACK_BUG];

    return (
        <div>
            <SectionTitle title="Bug Report Demo" subtitle="Create and preview professional bug reports interactively" />
            <div className="flex flex-col gap-4">
                {reports.map((bug, i) => (
                    <SingleBugReport key={`${bug.id}-${i}`} bug={bug} isInitiallyExpanded={i === 0} />
                ))}
            </div>
        </div>
    );
}
