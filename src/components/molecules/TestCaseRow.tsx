'use client';
import React, { useState } from 'react';

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

const statusMeta = {
    idle:  { label: 'Idle',    dot: 'bg-slate-500',   badge: '' },
    pass:  { label: 'Passed',  dot: 'bg-emerald-400', badge: 'text-emerald-300' },
    fail:  { label: 'Failed',  dot: 'bg-red-400',     badge: 'text-red-300'     },
    skip:  { label: 'Skipped', dot: 'bg-amber-400',   badge: 'text-amber-300'   },
};

export default function TestCaseRow({ id, feature, scenario, given, when, then, status, onStatusChange }: TestCaseRowProps) {
    const [expanded, setExpanded] = useState(false);

    const borderBg = {
        idle: 'border-card-border bg-surface/40',
        pass: 'border-success/40 bg-success/10',
        fail: 'border-danger/40 bg-danger/10',
        skip: 'border-warning/40 bg-warning/10',
    }[status];

    const meta = statusMeta[status];

    return (
        <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${borderBg}`}>
            {/* ── Header row (always visible) ─────────────────────────────── */}
            <div className="flex items-center gap-3 p-4">
                {/* Status dot */}
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${meta.dot} shadow-sm`} />

                {/* ID + Feature */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-mono text-primary-light bg-primary/10 px-2 py-0.5 rounded">{id}</span>
                        <span className="text-xs font-semibold text-slate-300 truncate">{feature}</span>
                    </div>
                    <p className="text-sm font-medium text-white leading-snug line-clamp-2">{scenario}</p>
                </div>

                {/* Expand toggle — mobile only */}
                <button
                    onClick={() => setExpanded(v => !v)}
                    aria-label={expanded ? 'Collapse details' : 'Expand details'}
                    className="md:hidden shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400"
                >
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* ── BDD details ─────────────────────────────────────────────── */}
            {/* Always shown on md+; toggled on mobile */}
            <div className={`px-4 pb-3 ${expanded ? 'block' : 'hidden'} md:block`}>
                <div className="border-t border-white/5 pt-3 space-y-1.5">
                    {[
                        { label: 'Given', value: given },
                        { label: 'When',  value: when  },
                        { label: 'Then',  value: then  },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex items-start gap-2 text-xs text-muted">
                            <strong className="text-slate-400 w-10 shrink-0 pt-px">{label}</strong>
                            <span>{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Action buttons ───────────────────────────────────────────── */}
            {/* Mobile: full-width row pinned to card bottom */}
            {/* md+: same layout but sits below the details naturally */}
            <div className="flex gap-px border-t border-white/5">
                <button
                    onClick={() => onStatusChange(id, 'pass')}
                    className={`
                        flex-1 py-2.5 text-xs font-semibold transition-all cursor-pointer rounded-bl-xl
                        ${status === 'pass'
                            ? 'bg-success text-white shadow-inner'
                            : 'bg-success/10 text-emerald-300 hover:bg-success/25'}
                    `}
                >
                    ✓ Pass
                </button>
                <button
                    onClick={() => onStatusChange(id, 'fail')}
                    className={`
                        flex-1 py-2.5 text-xs font-semibold transition-all cursor-pointer
                        ${status === 'fail'
                            ? 'bg-danger text-white shadow-inner'
                            : 'bg-danger/10 text-red-300 hover:bg-danger/25'}
                    `}
                >
                    ✗ Fail
                </button>
                <button
                    onClick={() => onStatusChange(id, 'skip')}
                    className={`
                        flex-1 py-2.5 text-xs font-semibold transition-all cursor-pointer rounded-br-xl
                        ${status === 'skip'
                            ? 'bg-warning text-white shadow-inner'
                            : 'bg-warning/10 text-amber-300 hover:bg-warning/25'}
                    `}
                >
                    ⊘ Skip
                </button>
            </div>
        </div>
    );
}
