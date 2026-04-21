import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import Card from '@/components/atoms/Card';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getProfiles } from '@/app/api/profile/route';
import { getCertifications } from '../api/certifications/route';
import TrackingLink from '@/components/atoms/TrackingLink';
import ProfileImagePreview from '@/components/molecules/ProfileImagePreview';
export const metadata: Metadata = {
    title: 'About Me | QA Portfolio',
    description: 'Learn about M. Rizky Pratama - QA Engineer with 5+ years of experience in test automation and quality assurance.',
};

export default async function AboutPage() {
    const profileData = await getProfiles();
    const certificationsData = await getCertifications();

    return (
        <PageLayout>
            <section data-testid="section-about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in-up">
                <SectionTitle title="About Me" subtitle="Get to know the person behind the quality" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
                    {/* Left Column: Sticky Profile Card */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                        <Card hover={false} className="text-center relative overflow-hidden backdrop-blur-md bg-slate-900/60 border border-slate-700/50 shadow-2xl">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/30 to-secondary/30 z-0 opacity-80 mix-blend-overlay"></div>

                            <ProfileImagePreview src={profileData.photo} alt={profileData.name} />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">{profileData.name}</h3>
                                <div className="inline-block px-3 py-1 bg-primary/20 rounded-full border border-primary/30 mb-4">
                                    <p className="text-primary-light font-semibold text-sm">{profileData.title}</p>
                                </div>
                                {profileData.tagline && (
                                    <p className="text-sm text-slate-300 italic mb-4 px-2">&quot;{profileData.tagline}&quot;</p>
                                )}

                                <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    {profileData.location}
                                </div>

                                {/* Open For */}
                                {profileData.openFor && profileData.openFor.length > 0 && (
                                    <div className="mb-6 border-t border-slate-700/50 pt-5">
                                        <h5 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Open Opportunities</h5>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {profileData.openFor.map((role, idx) => (
                                                <span key={idx} className="px-3 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors cursor-default">
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 mt-6">
                                    {/* {profileData.resumeUrl && (
                                        <TrackingLink 
                                            href={profileData.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 group"
                                            eventName="click_outbound"
                                            eventParams={{ link_url: profileData.resumeUrl, link_type: 'resume' }}
                                        >
                                            <svg className="w-5 h-5 group-hover:animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                            Download Resume
                                        </TrackingLink>
                                    )} */}
                                    {/* <TrackingLink
                                        href={`mailto:${profileData.email}`}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 group"
                                        eventName="generate_lead"
                                        eventParams={{ value: 'email_click' }}
                                    >
                                        <svg className="w-5 h-5 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        Send an Email
                                    </TrackingLink> */}
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-700/50">
                                    <TrackingLink href={profileData.github} target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-primary/80 transition-all duration-300 shadow hover:shadow-primary/50 hover:-translate-y-1" eventName="click_outbound" eventParams={{ link_url: profileData.github, link_type: 'github' }}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                    </TrackingLink>
                                    <TrackingLink href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-[#0A66C2] transition-all duration-300 shadow hover:shadow-[#0A66C2]/50 hover:-translate-y-1" eventName="click_outbound" eventParams={{ link_url: profileData.linkedin, link_type: 'linkedin' }}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.3333 4H4.66667C4.3013 4 4 4.3013 4 4.66667V19.3333C4 19.6987 4.3013 20 4.66667 20H19.3333C19.6987 20 20 19.6987 20 19.3333V4.66667C20 4.3013 19.6987 4 19.3333 4ZM10.5187 17.3333H8.16533V10.1653H10.5187V17.3333ZM9.34133 9.096C8.58667 9.096 7.97333 8.48267 7.97333 7.728C7.97333 6.97333 8.58667 6.36 9.34133 6.36C10.096 6.36 10.7093 6.97333 10.7093 7.728C10.7093 8.48267 10.096 9.096 9.34133 9.096ZM17.3333 17.3333H14.9813V13.84C14.9813 13.008 14.9653 11.9333 13.816 11.9333C12.6507 11.9333 12.472 12.8427 12.472 13.7813V17.3333H10.1187V10.1653H12.3787V11.144H12.4107C12.7253 10.548 13.4933 9.93333 14.6187 9.93333C16.9813 9.93333 17.3333 11.488 17.3333 13.504V17.3333Z" /></svg>
                                    </TrackingLink>
                                    <TrackingLink href={`mailto:${profileData.email}`} className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-600 transition-all duration-300 shadow hover:-translate-y-1" eventName="generate_lead" eventParams={{ value: 'email_click_social' }}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </TrackingLink>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Stats Grid */}
                        {/* {profileData.stats && (profileData.stats.yearsExperience > 0 || profileData.stats.projectsCompleted > 0) && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Years Exp.', value: `${profileData.stats.yearsExperience}+`, icon: '⏳', gradient: 'from-blue-500/20 to-blue-500/5' },
                                    { label: 'Projects', value: `${profileData.stats.projectsCompleted}+`, icon: '🚀', gradient: 'from-primary/20 to-primary/5' },
                                    { label: 'Bugs Found', value: `${profileData.stats.bugsFound}+`, icon: '🐛', gradient: 'from-orange-500/20 to-orange-500/5' },
                                    { label: 'Test Cases', value: `${profileData.stats.testCasesWritten}+`, icon: '📝', gradient: 'from-purple-500/20 to-purple-500/5' },
                                ].filter(stat => !stat.value.startsWith('0')).map((stat, idx) => (
                                    <Card key={idx} hover={true} className={`text-center p-6 flex flex-col justify-center items-center bg-gradient-to-b ${stat.gradient} border-slate-700/50 backdrop-blur-sm group`}>
                                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                                        <h4 className="text-3xl font-extrabold text-white mb-1 group-hover:text-primary transition-colors">{stat.value}</h4>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{stat.label}</p>
                                    </Card>
                                ))}
                            </div>
                        )} */}

                        {/* Bio & Philosophy Block */}
                        <Card hover={false} className="relative overflow-hidden bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
                            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] text-primary pointer-events-none">
                                <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" /></svg>
                            </div>

                            <h4 className="flex items-center gap-3 text-2xl font-bold text-white mb-6 relative z-10">
                                <div className="p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                About Me
                            </h4>
                            <p className="text-slate-300 leading-relaxed text-[1.05rem] mb-10 relative z-10">
                                {profileData.bio}
                            </p>

                            {profileData.philosophy && (
                                <div className="bg-slate-800/80 rounded-2xl p-8 border border-white/5 relative z-10 shadow-inner">
                                    <div className="absolute top-4 left-6 text-7xl text-primary/20 font-serif leading-none select-none">&quot;</div>
                                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest pl-10 mb-3 relative z-10">QA Philosophy</h4>
                                    <p className="text-slate-300 italic leading-relaxed pl-10 text-lg relative z-10">
                                        {profileData.philosophy}
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Education Timeline */}
                        <Card hover={false} className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
                            <h4 className="flex items-center gap-3 text-2xl font-bold text-white mb-10">
                                <div className="p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6.5"></path></svg>
                                </div>
                                Education
                            </h4>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-600 before:to-transparent">
                                {profileData.education.map((edu, idx) => (
                                    <div key={idx} className="relative flex items-start gap-6 group">
                                        {/* Dot */}
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-primary/90 shadow-lg shadow-primary/20 shrink-0 z-10 hover:bg-primary transition-colors hover:scale-110 duration-300">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" /><path d="M12 14.07L4.76 10.8A1 1 0 003.5 11.5v5.5a1 1 0 00.5.87l8.02 4.63a1 1 0 001 0l8.02-4.63a1 1 0 00.5-.87v-5.5a1 1 0 00-1.26-.7L12 14.07z" opacity="0.5" /></svg>
                                        </div>

                                        {/* Card */}
                                        <div className="w-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/60 p-6 rounded-2xl shadow-lg hover:border-primary/50 hover:bg-slate-800/80 transition-all duration-300 group-hover:-translate-y-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                                <h5 className="font-bold text-white text-xl">{edu.degree}</h5>
                                                <span className="inline-block text-xs font-bold px-3 py-1.5 bg-primary/10 text-primary-light border border-primary/20 rounded-lg shadow-sm whitespace-nowrap sm:ml-auto">
                                                    {edu.period}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 font-medium text-base">{edu.institution}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Certifications Grid */}
                        <Card hover={false} className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
                            <h4 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
                                <div className="p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                </div>
                                Certifications & Courses
                            </h4>
                            <div className="flex flex-col gap-4">
                                {certificationsData.certifications.map((cert, idx) => {
                                    const cardContent = (
                                        <>
                                            {/* Left accent color */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/50 to-primary/10 group-hover:from-primary group-hover:to-primary-light transition-colors"></div>

                                            {/* Icon Container */}
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mr-4 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-all duration-300 z-10">
                                                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                            </div>

                                            <div className="flex-grow min-w-0 pr-4 z-10">
                                                <h5 className="text-white font-bold text-[1.05rem] leading-snug group-hover:text-primary-light transition-colors">{cert.name}</h5>
                                                <p className="text-sm text-slate-400 font-medium mt-0.5">{cert.issuer}</p>
                                            </div>

                                            <div className="flex flex-col items-end flex-shrink-0 z-10 gap-2">
                                                {cert.year && (
                                                    <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700/50 rounded shadow-sm">
                                                        {cert.year}
                                                    </span>
                                                )}
                                                {cert.link && (
                                                    <div className="text-xs font-semibold text-primary/70 group-hover:text-primary flex items-center gap-1 transition-colors">
                                                        View
                                                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    );

                                    const className = `group flex items-center p-5 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-primary/50 transition-all duration-300 rounded-2xl relative overflow-hidden ${cert.link ? 'cursor-pointer' : ''}`;

                                    if (cert.link) {
                                        return (
                                            <TrackingLink
                                                key={idx}
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={className}
                                                eventName="click_outbound"
                                                eventParams={{ link_url: cert.link, link_type: 'certificate', item_name: cert.name }}
                                            >
                                                {cardContent}
                                            </TrackingLink>
                                        );
                                    }

                                    return (
                                        <div key={idx} className={className}>
                                            {cardContent}
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
