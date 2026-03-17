'use client';
import React, { useState } from 'react';
import { Input, Textarea } from '@/components/atoms/Input';
import BugReportCard from '@/components/molecules/BugReportCard';
import Button from '@/components/atoms/Button';
import SectionTitle from '@/components/atoms/SectionTitle';

interface BugReport {
    title: string;
    severity: string;
    priority: string;
    environment: string;
    stepsToReproduce: string;
    expectedResult: string;
    actualResult: string;
    additionalNotes: string;
    status: string;
    assignee: string;
    reportedBy: string;
    dateReported: string;
}

const defaultBug: BugReport = {
    title: 'Login button unresponsive on mobile Safari',
    severity: 'High',
    priority: 'P1',
    environment: 'iOS 17.2, Safari 17, iPhone 15 Pro',
    stepsToReproduce: '1. Open the app on mobile Safari\n2. Navigate to /login\n3. Enter valid credentials\n4. Tap the \'Sign In\' button',
    expectedResult: 'User should be authenticated and redirected to the dashboard page.',
    actualResult: 'The \'Sign In\' button does not respond to tap events. No network request is triggered.',
    additionalNotes: 'Issue only occurs on Safari mobile. Chrome and Firefox mobile work correctly.',
    status: 'Open',
    assignee: 'Frontend Team',
    reportedBy: 'M. Rizky Pratama',
    dateReported: '2026-03-15',
};

export default function BugReportDemo() {
    const [bug, setBug] = useState<BugReport>(defaultBug);
    const [showPreview, setShowPreview] = useState(true);

    const handleExport = () => {
        const text = `# Bug Report: ${bug.title}
Severity: ${bug.severity} | Priority: ${bug.priority}
Environment: ${bug.environment}
Status: ${bug.status} | Assignee: ${bug.assignee}
Reported By: ${bug.reportedBy} | Date: ${bug.dateReported}

## Steps to Reproduce
${bug.stepsToReproduce}

## Expected Result
${bug.expectedResult}

## Actual Result
${bug.actualResult}

## Additional Notes
${bug.additionalNotes}`;

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bug-report.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <SectionTitle title="Bug Report Demo" subtitle="Create and preview professional bug reports interactively" />

            <div className="flex gap-3 mb-6 justify-center">
                <Button variant={!showPreview ? 'primary' : 'ghost'} size="sm" onClick={() => setShowPreview(false)}>
                    ✏️ Edit
                </Button>
                <Button variant={showPreview ? 'primary' : 'ghost'} size="sm" onClick={() => setShowPreview(true)}>
                    👁 Preview
                </Button>
                <Button variant="secondary" size="sm" onClick={handleExport}>
                    📥 Export
                </Button>
            </div>

            {showPreview ? (
                <div className="animate-scale-in">
                    <BugReportCard {...bug} />
                </div>
            ) : (
                <div className="glass rounded-2xl p-6 space-y-4 animate-scale-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Title" value={bug.title} onChange={(e) => setBug({ ...bug, title: e.target.value })} />
                        <Input label="Environment" value={bug.environment} onChange={(e) => setBug({ ...bug, environment: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-300">Severity</label>
                            <select value={bug.severity} onChange={(e) => setBug({ ...bug, severity: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-300">Priority</label>
                            <select value={bug.priority} onChange={(e) => setBug({ ...bug, priority: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <option value="P0">P0</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-300">Status</label>
                            <select value={bug.status} onChange={(e) => setBug({ ...bug, status: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                    <Textarea label="Steps to Reproduce" rows={4} value={bug.stepsToReproduce} onChange={(e) => setBug({ ...bug, stepsToReproduce: e.target.value })} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea label="Expected Result" rows={3} value={bug.expectedResult} onChange={(e) => setBug({ ...bug, expectedResult: e.target.value })} />
                        <Textarea label="Actual Result" rows={3} value={bug.actualResult} onChange={(e) => setBug({ ...bug, actualResult: e.target.value })} />
                    </div>
                    <Textarea label="Additional Notes" rows={2} value={bug.additionalNotes} onChange={(e) => setBug({ ...bug, additionalNotes: e.target.value })} />
                </div>
            )}
        </div>
    );
}
