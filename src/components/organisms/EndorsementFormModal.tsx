'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import { Input, Textarea, Select } from '@/components/atoms/Input';
import EndorsementCard from '@/components/molecules/EndorsementCard';

const RELATIONSHIP_OPTIONS = [
    "Manager",
    "Direct Report",
    "Senior Colleague",
    "Junior Colleague",
    "Teammate (same group)",
    "Colleague (different group)",
    "Client / Service Provider / Vendor",
    "Mentor / Teacher",
    "Mentee / Student",
    "Classmate",
    "Other"
];

interface EndorsementFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EndorsementFormModal({ isOpen, onClose, onSuccess }: EndorsementFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    // Form inputs state
    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        relation: '',
        linkedinUrl: '',
        description: '',
        rating: ''
    });

    // Reset form states when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                fullName: '',
                role: '',
                relation: '',
                linkedinUrl: '',
                description: '',
                rating: ''
            });
            setError(null);
            setIsSuccess(false);
            setIsPreview(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPreview(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/endorsements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to submit endorsement');
            }

            // Show success state instead of closing immediately
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSuccessClose = () => {
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto pt-[10vh]">
            <div
                className="bg-surface border border-card-border rounded-2xl w-full max-w-2xl shadow-2xl relative my-auto animate-fade-in-up"
            >
                {/* Close Button */}
                {!isSuccess && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-muted hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                <div className="p-6 sm:p-8">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                            <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed mb-8">
                                I truly appreciate you taking the time to share your experience. Your endorsement has been safely received!
                                <br /><br />
                                <span className="text-sm text-slate-400 block bg-white/5 p-4 rounded-xl border border-white/5">
                                    <strong className="text-emerald-400 block mb-1">Pending Review</strong>
                                    It is currently waiting for a quick review and will appear on this page shortly once approved.
                                </span>
                            </p>
                            <Button onClick={handleSuccessClose} className="w-full sm:w-auto min-w-[200px]">
                                Back to Endorsements
                            </Button>
                        </div>
                    ) : isPreview ? (
                        <>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">Preview Endorsement</h2>
                            <p className="text-muted text-sm mb-6">Here is how your endorsement will look. Please review before submitting.</p>

                            {error && (
                                <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-xl text-danger text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="mb-8">
                                <EndorsementCard
                                    endorsement={{
                                        ...formData,
                                        rating: formData.rating ? parseInt(formData.rating) : undefined,
                                        createdAt: new Date().toISOString()
                                    }}
                                />
                            </div>

                            <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-card-border/50">
                                <Button type="button" variant="ghost" onClick={() => setIsPreview(false)} disabled={isSubmitting} className="w-full sm:w-auto">
                                    Back to Edit
                                </Button>
                                <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : 'Confirm & Submit'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">Write an Endorsement</h2>
                            <p className="text-muted text-sm mb-6">Share your experience working or creating with me. Your words mean a lot!</p>

                            {error && (
                                <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-xl text-danger text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handlePreview} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name *"
                                        name="fullName"
                                        placeholder="E.g., John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                    />
                                    <Input
                                        label="Role/Title *"
                                        name="role"
                                        placeholder="E.g., Senior Engineer"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Select
                                        label="Relationship *"
                                        name="relation"
                                        options={RELATIONSHIP_OPTIONS}
                                        placeholder="Please select..."
                                        value={formData.relation}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        label="LinkedIn URL (Optional)"
                                        name="linkedinUrl"
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        value={formData.linkedinUrl}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <Select
                                        label="Performance Rating / Satisfaction (Optional)"
                                        name="rating"
                                        options={Array.from({ length: 21 }, (_, i) => (100 - i * 5).toString())}
                                        placeholder="No rating / Skip"
                                        value={formData.rating}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Textarea
                                    label="Your Endorsement *"
                                    name="description"
                                    placeholder="What was it like working together?"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    minLength={10}
                                />

                                <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-card-border/50">
                                    <Button type="button" variant="ghost" onClick={onClose} className="w-full sm:w-auto">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="w-full sm:w-auto">
                                        Preview Endorsement
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
