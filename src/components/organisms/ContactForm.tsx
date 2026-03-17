'use client';
import React, { useState } from 'react';
import { Input, Textarea } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="Name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
            </div>
            <Input
                label="Subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <Textarea
                label="Message"
                placeholder="Tell me about your project or question..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </Button>

            {status === 'success' && (
                <div className="text-center text-sm text-success animate-fade-in p-3 bg-success/10 rounded-lg">
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                </div>
            )}
            {status === 'error' && (
                <div className="text-center text-sm text-danger animate-fade-in p-3 bg-danger/10 rounded-lg">
                    ✗ Something went wrong. Please try again.
                </div>
            )}
        </form>
    );
}
