'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Script from 'next/script';
import { useTurnstile } from '@/hooks/use-turnstile';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type Step = 'form' | 'done';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeDownloadModal({ isOpen, onClose }: Props) {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<Step>('form');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const turnstileRef = useRef<HTMLDivElement | null>(null);
    const { token: turnstileToken, setToken: setTurnstileToken } = useTurnstile(turnstileRef, isOpen);

    // Mount on client side
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const t = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setStep('form');
                setFullName('');
                setEmail('');
                setErrors({});
                setLoading(false);
                setFetchError('');
                setTurnstileToken('');
            }, 350);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!fullName.trim() || fullName.trim().length < 2) {
            newErrors.fullName = 'Full name is required (min 2 characters).';
        }
        if (!email || !isValidEmail(email)) {
            newErrors.email = 'A valid email address is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
        const fallbackInput = turnstileRef.current?.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement;
        const currentToken = turnstileToken || (fallbackInput ? fallbackInput.value : '');

        if (siteKey && !currentToken) {
            setFetchError('Please complete the safety verification to proceed.');
            return;
        }

        setLoading(true);
        setFetchError('');

        try {
            // 1. Log the downloader/viewer to MongoDB
            await fetch('/api/resume-download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: fullName.trim(),
                    email: email.trim().toLowerCase()
                }),
            });

            // 2. Auto-open premium full-page preview/download page in new window/tab
            const previewUrl = `/resume/preview?name=${encodeURIComponent(fullName.trim())}&email=${encodeURIComponent(email.trim().toLowerCase())}`;
            window.open(previewUrl, '_blank');

            // 3. Set Step to success 'done' immediately
            setStep('done');
        } catch (err) {
            console.error('Failed to log or open preview:', err);
            setFetchError('Could not launch preview page. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;
    if (!isVisible && !isOpen) return null;

    const modalJSX = (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal Box */}
            <div
                className={`relative w-full max-w-md transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                <div className="glass overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-950/90">
                    {/* Gradient top bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-light to-primary" />

                    <div className="p-6 sm:p-8">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* ── STEP 1: Identity Form ─────────────────────── */}
                        {step === 'form' && (
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                {/* Icon + Title */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/25">
                                        <svg className="w-6 h-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Download Resume</h3>
                                        <p className="text-slate-400 text-sm">I’d love to know who’s viewing my resume.</p>
                                    </div>
                                </div>

                                {/* Info notice */}
                                <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-6">
                                    <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs text-slate-400">Your information is only used to personalize the PDF and track downloads. No spam — ever.</p>
                                </div>

                                {/* Fields */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label htmlFor="modal-fullname" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="modal-fullname"
                                            type="text"
                                            value={fullName}
                                            onChange={e => {
                                                setFullName(e.target.value);
                                                if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                                            }}
                                            placeholder="e.g. John Doe"
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.fullName ? 'border-red-500/60' : 'border-slate-800 hover:border-slate-700'}`}
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {errors.fullName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="modal-email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                            Email Address <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="modal-email"
                                            type="email"
                                            value={email}
                                            onChange={e => {
                                                setEmail(e.target.value);
                                                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                            }}
                                            placeholder="e.g. john@company.com"
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.email ? 'border-red-500/60' : 'border-slate-800 hover:border-slate-700'}`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Turnstile widget */}
                                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
                                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                                    <div className="flex justify-center w-full mt-2 mb-4">
                                        <div ref={turnstileRef} className="cf-turnstile" data-theme="dark" />
                                    </div>
                                )}

                                {fetchError && (
                                    <p className="text-red-400 text-xs mb-4 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {fetchError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Opening Preview…
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Preview & Download Resume
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* ── STEP 2: Done (Success Screen) ──────────────── */}
                        {step === 'done' && (
                            <div className="flex flex-col items-center text-center py-4">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5 animate-bounce-subtle">
                                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">All Set!</h3>
                                <p className="text-slate-400 text-sm mb-1">
                                    The resume preview is open in a new tab.
                                </p>
                                <p className="text-slate-500 text-xs mb-8">
                                    Feel free to explore and download the resume in PDF. Thank you, <span className="text-slate-300 font-medium">{fullName}</span>!
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalJSX, document.body);
}
