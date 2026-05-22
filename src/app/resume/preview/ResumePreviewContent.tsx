'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { ResumeData } from '@/app/api/resume-data/route';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import ResumeDocument from '@/components/organisms/ResumeDocument';

function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-300 p-4">
            <svg className="w-12 h-12 animate-spin text-primary mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-base font-semibold tracking-wide animate-pulse">{text}</p>
        </div>
    );
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ResumePreviewContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
    const [errorMsg, setErrorMsg] = useState('');
    const [downloading, setDownloading] = useState(false);

    const fetchResumeData = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await fetch('/api/resume-data');
            if (!res.ok) throw new Error('Failed to load resume data');
            const data: ResumeData = await res.json();
            setResumeData(data);
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to load resume data. Please refresh or try again.');
        } finally {
            setLoading(false);
        }
    };

    const verifyToken = async (token: string) => {
        setVerifying(true);
        setErrorMsg('');
        try {
            const res = await fetch(`/api/resume-download/verify?token=${encodeURIComponent(token)}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'This preview link has expired or is invalid.');
            }
            const data = await res.json();
            setFullName(data.name);
            setEmail(data.email);
            setSubmitted(true);
            await fetchResumeData();
        } catch (err: any) {
            console.error('Verification failed:', err);
            setErrorMsg(err.message || 'Failed to verify preview link.');
            setSubmitted(false);
        } finally {
            setVerifying(false);
        }
    };

    // Load and verify token when search parameters change
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            verifyToken(token);
        } else {
            // Reset state if no token is present (e.g. visiting /resume/preview directly)
            setSubmitted(false);
            setFullName('');
            setEmail('');
        }
    }, [searchParams]);

    useEffect(() => {
        if (resumeData?.profile?.name) {
            const now = new Date();
            const timeStr = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta',
            });
            document.title = `Resume - ${resumeData.profile.name} - ${timeStr}`;
        }
    }, [resumeData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!fullName.trim() || fullName.trim().length < 2) {
            newErrors.fullName = 'Full name is required (min 2 characters).';
        }
        if (!email || !isValidEmail(email)) {
            newErrors.email = 'A valid email address is required.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setVerifying(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/resume-download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: fullName.trim(),
                    email: email.trim().toLowerCase(),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to register preview access.');
            }

            const data = await res.json();
            const token = data.token;

            // Route to self with token to trigger verification and load
            const params = new URLSearchParams();
            params.set('token', token);
            router.push(`?${params.toString()}`);
        } catch (err: any) {
            console.error('Failed to log or get preview token:', err);
            setErrorMsg(err.message || 'Could not verify preview access. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    const handleDownload = async () => {
        if (!resumeData) return;
        setDownloading(true);
        try {
            const now = new Date();
            const timeStr = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Jakarta',
            });
            const filename = `Resume - ${resumeData.profile.name} - ${timeStr}.pdf`;

            const doc = (
                <ResumeDocument
                    data={resumeData}
                    downloaderName={fullName}
                    downloaderEmail={email}
                />
            );
            const blob = await pdf(doc).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to download PDF:', err);
        } finally {
            setDownloading(false);
        }
    };

    if (verifying) {
        return <LoadingSpinner text="Verifying preview link..." />;
    }

    if (errorMsg) {
        const isVerificationError = !submitted;
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-300 p-6 text-center">
                <div className="p-4 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-white mb-2">{errorMsg}</p>
                <button
                    onClick={() => {
                        if (isVerificationError) {
                            setErrorMsg('');
                            setSubmitted(false);
                            router.push('/resume/preview');
                        } else {
                            fetchResumeData();
                        }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold transition-all cursor-pointer"
                >
                    {isVerificationError ? 'Generate New Preview' : 'Retry Fetch'}
                </button>
            </div>
        );
    }

    if (submitted) {
        if (loading) {
            return <LoadingSpinner text="Please wait... The resume is being generated" />;
        }

        const now = new Date();
        const timeStr = now.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta',
        });

        if (resumeData) {
            return (
                <div className="w-full h-screen bg-slate-950 flex flex-col">
                    {/* Compact Top Bar */}
                    <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    window.close();
                                }}
                                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 text-sm font-semibold"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to About
                            </button>
                            <span className="h-4 w-px bg-slate-800 hidden sm:inline" />
                            <p className="text-slate-300 text-xs hidden sm:inline">
                                Preview for: <strong className="text-primary-light">{fullName}</strong> ({email}) - generated at <strong className="text-primary-light">{timeStr}</strong>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hidden sm:inline">
                                ATS-Optimized PDF
                            </span> */}
                            <button
                                onClick={handleDownload}
                                disabled={downloading}
                                className="px-3.5 py-1.5 bg-primary hover:bg-primary-light disabled:bg-slate-850 disabled:text-slate-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-primary/20 cursor-pointer"
                            >
                                {downloading ? (
                                    <>
                                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* PDF Viewer Container */}
                    <div className="flex-1 w-full bg-slate-900 overflow-hidden relative">
                        <PDFViewer className="w-full h-full border-none" showToolbar={false}>
                            <ResumeDocument
                                data={resumeData}
                                downloaderName={fullName}
                                downloaderEmail={email}
                            />
                        </PDFViewer>
                    </div>
                </div >
            );
        }
    }

    // RENDER IDENTITY FORM IF NOT SUBMITTED
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Ambient gradients */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md z-10">
                <div className="glass overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-light to-primary" />

                    <div className="p-8">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary-light mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Resume Preview</h2>
                            <p className="text-slate-400 text-sm">
                                I’d love to know who’s viewing my resume.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="fullname" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="fullname"
                                    type="text"
                                    value={fullName}
                                    onChange={e => {
                                        setFullName(e.target.value);
                                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                                    }}
                                    placeholder="e.g. Jane Doe"
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
                                <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                    }}
                                    placeholder="e.g. jane@company.com"
                                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${errors.email ? 'border-red-500/60' : 'border-slate-800 hover:border-slate-700'}`}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer mt-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview & Download Resume
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
