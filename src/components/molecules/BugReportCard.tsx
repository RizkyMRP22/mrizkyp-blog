import React from 'react';
import Badge from '@/components/atoms/Badge';

interface BugReportCardProps {
    title: string;
    severity: string;
    priority: string;
    environment: string;
    stepsToReproduce: string;
    expectedResult: string;
    actualResult: string;
    additionalNotes?: string;
    status: string;
    assignee: string;
    reportedBy: string;
    dateReported: string;
}

export default function BugReportCard({
    title, severity, priority, environment, stepsToReproduce, expectedResult, actualResult,
    additionalNotes, status, assignee, reportedBy, dateReported
}: BugReportCardProps) {
    const severityVariant = severity === 'High' || severity === 'Critical' ? 'fail' : severity === 'Medium' ? 'skip' : 'default';

    return (
        <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-white flex-1">{title}</h3>
                <Badge label={status} variant={status === 'Open' ? 'fail' : 'pass'} size="md" />
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge label={`Severity: ${severity}`} variant={severityVariant} />
                <Badge label={`Priority: ${priority}`} variant="info" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span className="text-muted">Environment:</span> <span className="text-slate-300">{environment}</span></div>
                <div><span className="text-muted">Assignee:</span> <span className="text-slate-300">{assignee}</span></div>
                <div><span className="text-muted">Reported By:</span> <span className="text-slate-300">{reportedBy}</span></div>
            </div>

            <div>
                <h4 className="text-sm font-semibold text-accent mb-1">Steps to Reproduce</h4>
                <pre className="text-sm text-slate-300 bg-surface/60 rounded-lg p-3 whitespace-pre-wrap font-sans">{stepsToReproduce}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-sm font-semibold text-success mb-1">Expected Result</h4>
                    <p className="text-sm text-slate-300 bg-success/5 rounded-lg p-3 border border-success/20">{expectedResult}</p>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-danger mb-1">Actual Result</h4>
                    <p className="text-sm text-slate-300 bg-danger/5 rounded-lg p-3 border border-danger/20">{actualResult}</p>
                </div>
            </div>

            {additionalNotes && (
                <div>
                    <h4 className="text-sm font-semibold text-muted mb-1">Additional Notes</h4>
                    <p className="text-sm text-slate-400 italic">{additionalNotes}</p>
                </div>
            )}

            <div className="text-xs text-muted pt-2 border-t border-card-border">
                Reported on {new Date(dateReported).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
        </div>
    );
}
