'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

interface EmailContactModalProps {
    email: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function EmailContactModal({ email, isOpen, onClose }: EmailContactModalProps) {
    const [copied, setCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        sendGAEvent('event', 'generate_lead', { value: 'email_copy' });
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-md transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                <div className="glass overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                    {/* Header with gradient line */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-light to-primary" />

                    <div className="p-8">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {/* Icon Wrapper */}
                            <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary-light animate-float">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                            <p className="text-slate-400 text-sm mb-8 px-4">
                                Choose how you&apos;d like to connect. I&apos;m always open to discussing new projects or opportunities.
                            </p>

                            {/* Email Display */}
                            {/* <div className="w-full bg-black/40 rounded-2xl border border-white/5 p-4 mb-6 flex flex-col items-center justify-center group">
                                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Email Address</span>
                                <span className="text-lg font-medium text-slate-200 group-hover:text-primary-light transition-colors break-all">
                                    {email}
                                </span>
                            </div> */}

                            {/* Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 ${copied
                                            ? 'bg-success/20 text-success border border-success/30'
                                            : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                            Copy Email
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/contact#contact-form-section"
                                    onClick={() => {
                                        sendGAEvent('event', 'generate_lead', { value: 'email_modal_contact_click' });
                                        onClose();
                                    }}
                                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    Send Message
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
