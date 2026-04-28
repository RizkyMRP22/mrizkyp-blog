export const dynamic = 'force-dynamic';
import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import Card from '@/components/atoms/Card';
import CopyEmailButton from '@/components/molecules/CopyEmailButton';
import ContactForm from '@/components/molecules/ContactForm';
import { getProfiles } from '@/app/api/profile/route';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: siteConfig.pages.contact.title,
    description: siteConfig.pages.contact.description,
};

// SVG icons as inline components — no external deps
function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

export default async function ContactPage() {
    const profileData = await getProfiles();

    // Social links — no raw PII shown in UI
    const socialLinks = [
        {
            id: 'github',
            icon: <GitHubIcon />,
            label: 'GitHub',
            displayText: 'View my repositories',
            href: profileData.github,
            colorClass: 'text-slate-300 hover:text-white',
            bgClass: 'bg-slate-700/50 hover:bg-slate-600/50',
            borderClass: 'border-slate-600/30 hover:border-slate-500/50',
        },
        {
            id: 'linkedin',
            icon: <LinkedInIcon />,
            label: 'LinkedIn',
            displayText: 'Connect professionally',
            href: profileData.linkedin,
            colorClass: 'text-blue-300 hover:text-blue-200',
            bgClass: 'bg-blue-900/30 hover:bg-blue-800/40',
            borderClass: 'border-blue-700/30 hover:border-blue-600/50',
        },
        {
            id: 'email',
            icon: <EmailIcon />,
            label: 'Let\'s Talk',
            // Only show label text — never expose the raw email address in the DOM
            displayText: 'Copy My Email or Send a Message',
            href: `mailto:${profileData.email}`,
            colorClass: 'text-indigo-300 hover:text-indigo-200',
            bgClass: 'bg-indigo-900/30 hover:bg-indigo-800/40',
            borderClass: 'border-indigo-700/30 hover:border-indigo-600/50',
        },
    ];

    const statusConfig = {
        available: {
            text: "Currently open to new opportunities",
            colorClass: "text-success border-success/25",
            bgClass: "bg-success",
            ping: true,
        },
        freelance_only: {
            text: "Available for freelance work",
            colorClass: "text-blue-400 border-blue-400/25",
            bgClass: "bg-blue-400",
            ping: true,
        },
        exploring: {
            text: "Discussing new opportunities",
            colorClass: "text-amber-400 border-amber-400/25",
            bgClass: "bg-amber-400",
            ping: false,
        },
        unavailable: {
            text: "Currently not taking new projects",
            colorClass: "text-slate-400 border-slate-600/50",
            bgClass: "bg-slate-400",
            ping: false,
        }
    };

    const currentStatus = statusConfig[siteConfig.contact.availabilityStatus] || statusConfig.available;

    return (
        <PageLayout>
            <section
                data-testid="section-contact"
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
                {/* ── Page Header & Location ───────────────────────── */}
                <div className="animate-fade-in text-center mb-8">
                    <SectionTitle
                        title="Get In Touch"
                        subtitle="Have a project, opportunity, or just want to say hello? I'd love to hear from you."
                        className="mb-8"
                    />

                    {/* Badges Container */}
                    <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
                        {/* Availability Badge */}
                        <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border text-sm font-medium transition-colors shadow-lg ${currentStatus.colorClass}`}>
                            <span className="relative flex h-2.5 w-2.5">
                                {currentStatus.ping && (
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatus.bgClass}`} />
                                )}
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentStatus.bgClass}`} />
                            </span>
                            {currentStatus.text}
                        </div>
                    </div>
                </div>

                {/* ── Main content layout ────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start mt-16 animate-fade-in delay-200">

                    {/* Left Column: Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Social / Contact Links */}
                        <Card hover={true} className="flex flex-col">
                            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-5 flex items-center gap-2">
                                <span className="w-8 h-px bg-primary/50"></span>
                                Reach me via
                            </h3>
                            <div className="space-y-3">
                                {socialLinks.map((link) => (
                                    link.id === 'email' ? (
                                        <CopyEmailButton
                                            key={link.id}
                                            email={profileData.email}
                                            icon={link.icon}
                                            label={link.label}
                                            displayText={link.displayText}
                                            colorClass={link.colorClass}
                                            bgClass={link.bgClass}
                                            borderClass={link.borderClass}
                                        />
                                    ) : (
                                        <a
                                            key={link.id}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-testid={`contact-link-${link.id}`}
                                            aria-label={`${link.label}: ${link.displayText}`}
                                            className={`
                                                flex items-center gap-4 w-full px-5 py-4 rounded-xl border
                                                transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg
                                                ${link.bgClass} ${link.borderClass}
                                            `}
                                        >
                                            <span className={`transition-colors p-2 rounded-lg bg-white/5 group-hover:bg-white/10 ${link.colorClass}`}>
                                                {link.icon}
                                            </span>
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="text-xs text-muted mb-0.5">{link.label}</p>
                                                <p className={`text-sm font-semibold transition-colors truncate ${link.colorClass}`}>
                                                    {link.displayText}
                                                </p>
                                            </div>
                                            <span className="text-muted group-hover:translate-x-1 group-hover:text-white transition-all duration-300 text-sm">
                                                →
                                            </span>
                                        </a>
                                    )
                                ))}
                            </div>
                        </Card>

                        {/* Location */}
                        <Card hover={true} className="flex flex-col">
                            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-5 flex items-center gap-2">
                                <span className="w-8 h-px bg-amber-500/50"></span>
                                Location
                            </h3>
                            <div className="flex items-start gap-4 w-full px-5 py-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg">
                                <span className="text-amber-300 transition-colors p-2 rounded-lg bg-white/5 group-hover:bg-white/10 shrink-0 mt-1">
                                    <LocationIcon />
                                </span>
                                <div className="flex flex-col flex-1 gap-3 w-full">
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-xs text-muted mb-0.5">Based in</p>
                                        <p className="text-sm font-semibold text-amber-300 transition-colors truncate">
                                            {profileData.location}
                                        </p>
                                    </div>
                                    <div className="w-full h-px bg-white/5"></div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-xs text-muted mb-0.5">Working Mode</p>
                                        <p className="text-sm font-semibold text-amber-300 transition-colors">
                                            Remote / Hybrid / On-site
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Open For */}
                        <Card hover={true} className="flex flex-col relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>

                            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-5 flex items-center gap-2 relative z-10">
                                <span className="w-8 h-px bg-success/50"></span>
                                Open for
                            </h3>
                            <ul className="space-y-4 relative z-10" aria-label="Types of work I'm open to">
                                {profileData.openFor.map((item: string) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-4 text-sm text-slate-300 group"
                                    >
                                        <span className="text-success flex-shrink-0 bg-success/10 p-1.5 rounded-full mt-0.5 group-hover:bg-success/20 group-hover:scale-110 transition-all duration-300 shadow-sm shadow-success/10">
                                            <CheckIcon />
                                        </span>
                                        <span className="font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7 animate-fade-in delay-300" id="contact-form-section">
                        <div className="relative">
                            {/* Subtle background glow for the form area */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-3xl blur-xl opacity-50 z-0 pointer-events-none"></div>

                            <div className="relative z-10">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
