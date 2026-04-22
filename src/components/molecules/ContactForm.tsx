'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
    fullName: string;
    email: string;
    company: string;
    role: string;
    subject: string;
    opportunityType: string;
    message: string;
    timeline: string;
    linkedinUrl: string;
}

const OPPORTUNITY_TYPES = [
    { value: 'full-time', label: '💼 Full-time / Contract Role' },
    { value: 'freelance', label: '🚀 Freelance / Project' },
    { value: 'collaboration', label: '🤝 Open-source / Collaboration' },
    { value: 'mentorship', label: '🎓 Mentorship / Speaking' },
    { value: 'other', label: '✉️ Other' },
];

const TIMELINE_OPTIONS = [
    { value: '', label: 'Select timeline (optional)' },
    { value: 'asap', label: 'ASAP / Immediate' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '1-3-months', label: '1 – 3 months' },
    { value: '3-6-months', label: '3 – 6 months' },
    { value: 'flexible', label: 'Flexible' },
];

function SendIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    );
}

function CheckCircleIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-12 h-12" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

const inputBase =
    'w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/50 transition-all duration-200 hover:border-white/20';

const labelBase = 'block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide';

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [serverMessage, setServerMessage] = useState('');
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [showBudget, setShowBudget] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const attemptRender = () => {
            const ts = (window as any).turnstile;
            if (ts && turnstileRef.current) {
                try {
                    turnstileRef.current.innerHTML = '';
                    setTurnstileToken('');
                    ts.render(turnstileRef.current, {
                        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
                        theme: 'dark',
                        callback: function(token: string) {
                            setTurnstileToken(token);
                        }
                    });
                    if (intervalId) clearInterval(intervalId);
                } catch (e) {
                    console.error("Turnstile explicit render error:", e);
                }
            }
        };

        if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
            if ((window as any).turnstile) {
                attemptRender();
            } else {
                intervalId = setInterval(attemptRender, 500);
            }
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    const [form, setForm] = useState<FormState>({
        fullName: '',
        email: '',
        company: '',
        role: '',
        subject: '',
        opportunityType: '',
        message: '',
        timeline: '',
        linkedinUrl: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear field error on change
        if (errors[name as keyof FormState]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        // Show budget/timeline only for freelance or project types
        if (name === 'opportunityType') {
            setShowBudget(value === 'freelance' || value === 'collaboration');
        }
    }

    function validate(): boolean {
        const newErrors: Partial<FormState> = {};
        if (!form.fullName.trim() || form.fullName.trim().length < 2) newErrors.fullName = 'Full name is required.';
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required.';
        if (!form.subject.trim() || form.subject.trim().length < 3) newErrors.subject = 'Subject is required.';
        if (!form.opportunityType) newErrors.opportunityType = 'Please select an opportunity type.';
        if (!form.message.trim() || form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
        const fallbackInput = turnstileRef.current?.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement;
        const currentToken = turnstileToken || (fallbackInput ? fallbackInput.value : '');

        if (siteKey && !currentToken) {
            setStatus('error');
            setServerMessage('Please complete the safety verification to proceed.');
            return;
        }

        setStatus('submitting');
        setServerMessage('');

        try {
            const payload = { ...form, turnstileToken: currentToken };
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),

            });
            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setServerMessage(data.message);
                formRef.current?.reset();
                setForm({ fullName: '', email: '', company: '', role: '', subject: '', opportunityType: '', message: '', timeline: '', linkedinUrl: '' });
                setShowBudget(false);
                setTurnstileToken('');
            } else {
                setStatus('error');
                setServerMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setServerMessage('Network error. Please check your connection and try again.');
        }
    }

    if (status === 'success') {
        return (
            <div className="glass rounded-2xl p-8 sm:p-10 text-center animate-scale-in">
                <div className="flex justify-center mb-4 text-success">
                    <CheckCircleIcon />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Received!</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">{serverMessage}</p>
                <button
                    onClick={() => { setStatus('idle'); setServerMessage(''); }}
                    className="mt-6 text-xs text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form
            id="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            data-testid="contact-form"
            className="glass rounded-2xl p-6 sm:p-8 space-y-6"
        >
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
            <div className="mb-2">
                <h3 className="text-base font-semibold text-white">Send a Message</h3>
                <p className="text-xs text-slate-500 mt-1">
                    All fields marked <span className="text-danger">*</span> are required.
                </p>
            </div>

            {/* Error banner */}
            {status === 'error' && serverMessage && (
                <div role="alert" className="flex items-start gap-3 px-4 py-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {serverMessage}
                </div>
            )}

            {/* Row 1 — Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="cf-fullName" className={labelBase}>
                        Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                        id="cf-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={form.fullName}
                        onChange={handleChange}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                        className={`${inputBase} ${errors.fullName ? 'border-danger/60 focus:ring-danger/40' : ''}`}
                    />
                    {errors.fullName && <p id="err-fullName" role="alert" className="mt-1.5 text-xs text-danger">{errors.fullName}</p>}
                </div>
                <div>
                    <label htmlFor="cf-email" className={labelBase}>
                        Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                        id="cf-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'err-email' : undefined}
                        className={`${inputBase} ${errors.email ? 'border-danger/60 focus:ring-danger/40' : ''}`}
                    />
                    {errors.email && <p id="err-email" role="alert" className="mt-1.5 text-xs text-danger">{errors.email}</p>}
                </div>
            </div>

            {/* Row 2 — Company + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="cf-company" className={labelBase}>Company / Organization</label>
                    <input
                        id="cf-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Corp (optional)"
                        value={form.company}
                        onChange={handleChange}
                        className={inputBase}
                    />
                </div>
                <div>
                    <label htmlFor="cf-role" className={labelBase}>Your Role / Title</label>
                    <input
                        id="cf-role"
                        name="role"
                        type="text"
                        placeholder="e.g. Technical Recruiter (optional)"
                        value={form.role}
                        onChange={handleChange}
                        className={inputBase}
                    />
                </div>
            </div>

            {/* Row 3 — Opportunity Type */}
            <div>
                <label htmlFor="cf-opportunityType" className={labelBase}>
                    Opportunity Type <span className="text-danger">*</span>
                </label>
                <select
                    id="cf-opportunityType"
                    name="opportunityType"
                    value={form.opportunityType}
                    onChange={handleChange}
                    aria-invalid={!!errors.opportunityType}
                    aria-describedby={errors.opportunityType ? 'err-opportunityType' : undefined}
                    className={`${inputBase} ${errors.opportunityType ? 'border-danger/60 focus:ring-danger/40' : ''}`}
                >
                    <option value="" disabled className="bg-slate-900 text-slate-400">Select opportunity type…</option>
                    {OPPORTUNITY_TYPES.map(o => (
                        <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
                    ))}
                </select>
                {errors.opportunityType && <p id="err-opportunityType" role="alert" className="mt-1.5 text-xs text-danger">{errors.opportunityType}</p>}
            </div>

            {/* Row 4 — Budget + Timeline (conditional) */}
            {showBudget && (
                <div>
                    <label htmlFor="cf-timeline" className={labelBase}>Expected Timeline</label>
                    <select
                        id="cf-timeline"
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className={inputBase}
                    >
                        {TIMELINE_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Row 5 — Subject */}
            <div>
                <label htmlFor="cf-subject" className={labelBase}>
                    Subject <span className="text-danger">*</span>
                </label>
                <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    placeholder="e.g. QA Engineer Opportunity at Acme Corp"
                    value={form.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'err-subject' : undefined}
                    className={`${inputBase} ${errors.subject ? 'border-danger/60 focus:ring-danger/40' : ''}`}
                />
                {errors.subject && <p id="err-subject" role="alert" className="mt-1.5 text-xs text-danger">{errors.subject}</p>}
            </div>

            {/* Row 6 — Message */}
            <div>
                <label htmlFor="cf-message" className={labelBase}>
                    Message <span className="text-danger">*</span>
                </label>
                <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about the opportunity, project, or what you have in mind…"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                    className={`${inputBase} resize-none ${errors.message ? 'border-danger/60 focus:ring-danger/40' : ''}`}
                />
                <div className="flex justify-between items-center mt-1.5">
                    {errors.message
                        ? <p id="err-message" role="alert" className="text-xs text-danger">{errors.message}</p>
                        : <span />
                    }
                    <span className={`text-xs ml-auto ${form.message.length < 20 ? 'text-slate-600' : 'text-slate-500'}`}>
                        {form.message.length} / 20 min
                    </span>
                </div>
            </div>

            {/* Row 7 — LinkedIn (optional) */}
            <div>
                <label htmlFor="cf-linkedinUrl" className={labelBase}>Your LinkedIn Profile</label>
                <input
                    id="cf-linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile (optional)"
                    value={form.linkedinUrl}
                    onChange={handleChange}
                    className={inputBase}
                />
            </div>

            {/* Submit */}
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <div className="flex justify-center w-full mt-2 mb-4">
                    <div ref={turnstileRef} className="cf-turnstile" data-theme="dark"></div>
                </div>
            )}
            <button
                type="submit"
                id="contact-form-submit"
                disabled={status === 'submitting'}
                data-testid="contact-form-submit"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
                {status === 'submitting' ? (
                    <>
                        <SpinnerIcon />
                        Sending…
                    </>
                ) : (
                    <>
                        <SendIcon />
                        Send Message
                    </>
                )}
            </button>

            <p className="text-center text-xs text-slate-600">
                Your data is stored securely and never shared with third parties.
            </p>
        </form>
    );
}
