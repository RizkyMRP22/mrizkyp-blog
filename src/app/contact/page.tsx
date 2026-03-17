import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ContactForm from '@/components/organisms/ContactForm';
import Card from '@/components/atoms/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | QA Portfolio',
    description: 'Get in touch with M. Rizky Pratama - QA Engineer available for collaboration and opportunities.',
};

const contactInfo = [
    { icon: '✉️', label: 'Email', value: 'rizky.qa@email.com', href: 'mailto:rizky.qa@email.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/mrizkyp22', href: 'https://github.com/mrizkyp22' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/mrizkyp22', href: 'https://linkedin.com/in/mrizkyp22' },
    { icon: '📍', label: 'Location', value: 'Jakarta, Indonesia', href: null },
];

export default function ContactPage() {
    return (
        <PageLayout>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="Get In Touch" subtitle="Have a project or opportunity? I'd love to hear from you" />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card hover={false}>
                            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                {contactInfo.map((info) => (
                                    <div key={info.label} className="flex items-center gap-3">
                                        <span className="text-xl">{info.icon}</span>
                                        <div>
                                            <div className="text-xs text-muted">{info.label}</div>
                                            {info.href ? (
                                                <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-light hover:text-white transition-colors">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className="text-sm text-slate-300">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card hover={false}>
                            <h3 className="text-lg font-semibold text-white mb-3">Open For</h3>
                            <ul className="space-y-2">
                                {['Full-time QA positions', 'Contract/Freelance work', 'QA Consulting', 'Test automation setup', 'Speaking & Mentoring'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="text-success">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
