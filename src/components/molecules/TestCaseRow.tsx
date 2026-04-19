'use client';
import React from 'react';

interface TestCaseRowProps {
    id: string;
    feature: string;
    scenario: string;
    given: string;
    when: string;
    then: string;
    status: 'idle' | 'pass' | 'fail' | 'skip';
    onStatusChange: (id: string, status: 'pass' | 'fail' | 'skip') => void;
}

export default function TestCaseRow({ id, feature, scenario, given, when, then, status, onStatusChange }: TestCaseRowProps) {
    const statusColors = {
        idle: 'border-card-border bg-surface/40',
        pass: 'border-success/40 bg-success/10',
        fail: 'border-danger/40 bg-danger/10',
        skip: 'border-warning/40 bg-warning/10',
    };

    return (
        <div className={`rounded-xl border p-4 transition-all duration-300 ${statusColors[status]}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-primary-light bg-primary/10 px-2 py-0.5 rounded">{id}</span>
                        <span className="text-sm font-semibold text-white">Feature: {feature}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-300 mb-2 mt-1">Scenario: {scenario}</p>
                    <div className="text-xs text-muted mb-1 flex items-start"><strong className="text-slate-400 w-12 shrink-0">Given</strong> <span>{given}</span></div>
                    <div className="text-xs text-muted mb-1 flex items-start"><strong className="text-slate-400 w-12 shrink-0">When</strong> <span>{when}</span></div>
                    <div className="text-xs text-muted flex items-start"><strong className="text-slate-400 w-12 shrink-0">Then</strong> <span>{then}</span></div>
                </div>

                <div className="flex gap-1.5 shrink-0">
                    <button
                        onClick={() => onStatusChange(id, 'pass')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${status === 'pass' ? 'bg-success text-white shadow-lg shadow-success/30' : 'bg-success/20 text-emerald-300 hover:bg-success/30'}`}
                    >
                        ✓ Pass
                    </button>
                    <button
                        onClick={() => onStatusChange(id, 'fail')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${status === 'fail' ? 'bg-danger text-white shadow-lg shadow-danger/30' : 'bg-danger/20 text-red-300 hover:bg-danger/30'}`}
                    >
                        ✗ Fail
                    </button>
                    <button
                        onClick={() => onStatusChange(id, 'skip')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${status === 'skip' ? 'bg-warning text-white shadow-lg shadow-warning/30' : 'bg-warning/20 text-amber-300 hover:bg-warning/30'}`}
                    >
                        ⊘ Skip
                    </button>
                </div>
            </div>
        </div>
    );
}
