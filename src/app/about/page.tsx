export const dynamic = 'force-dynamic';
import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import Card from '@/components/atoms/Card';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getProfiles } from '@/app/api/profile/route';
import { getCertifications } from '../api/certifications/route';
import TrackingLink from '@/components/atoms/TrackingLink';
import ProfileImagePreview from '@/components/molecules/ProfileImagePreview';
import AboutSocialLinks from '@/components/molecules/AboutSocialLinks';
import ResumeDownloadButton from '@/components/atoms/ResumeDownloadButton';
import { siteConfig } from '@/config/site';
export const metadata: Metadata = {
    title: siteConfig.pages.about.title,
    description: siteConfig.pages.about.description,
};

export default async function AboutPage() {
    const profileData = await getProfiles();
    const certificationsData = await getCertifications();

    return (
        <PageLayout>
            <section data-testid="section-about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-fade-in-up">
                <SectionTitle title={`${siteConfig.pages.about.title}`} subtitle={`${siteConfig.pages.about.description}`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-8 lg:mt-12">
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

                                { /* Social Links */}
                                <AboutSocialLinks
                                    github={profileData.github}
                                    linkedin={profileData.linkedin}
                                    email={profileData.email}
                                />

                                {/* Action Buttons */}
                                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-700/50">
                                    <ResumeDownloadButton />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Main Content */}
                    <div className="lg:col-span-8 space-y-8">

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
                            <div className="text-slate-300 leading-relaxed text-[1.05rem] mb-10 relative z-10 space-y-4 text-justify">
                                {profileData.bio.split('\n').map((paragraph, index) => (
                                    paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                                ))}
                            </div>

                            {profileData.philosophy && (
                                <div className="bg-slate-800/80 rounded-2xl p-5 sm:p-8 border border-white/5 relative z-10 shadow-inner mt-4">
                                    <div className="absolute top-2 sm:top-4 left-4 sm:left-6 text-6xl sm:text-7xl text-primary/20 font-serif leading-none select-none">&quot;</div>
                                    <h4 className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest pl-6 sm:pl-10 mb-2 sm:mb-3 relative z-10">QA Philosophy</h4>
                                    <p className="text-slate-300 italic leading-relaxed pl-6 sm:pl-10 text-sm sm:text-lg relative z-10">
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

                            <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:ml-4 sm:before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-600 before:to-transparent">
                                {profileData.education.map((edu, idx) => (
                                    <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                                        {/* Dot */}
                                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-[3px] sm:border-4 border-slate-900 bg-primary/90 shadow-lg shadow-primary/20 shrink-0 z-10 hover:bg-primary transition-colors hover:scale-110 duration-300">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" /><path d="M12 14.07L4.76 10.8A1 1 0 003.5 11.5v5.5a1 1 0 00.5.87l8.02 4.63a1 1 0 001 0l8.02-4.63a1 1 0 00.5-.87v-5.5a1 1 0 00-1.26-.7L12 14.07z" opacity="0.5" /></svg>
                                        </div>

                                        {/* Card */}
                                        <div className="w-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/60 p-4 sm:p-6 rounded-2xl shadow-lg hover:border-primary/50 hover:bg-slate-800/80 transition-all duration-300 group-hover:-translate-y-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 gap-2">
                                                <h5 className="font-bold text-white text-lg sm:text-xl">{edu.degree}</h5>
                                                <span className="inline-block w-fit text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 bg-primary/10 text-primary-light border border-primary/20 rounded-lg shadow-sm whitespace-nowrap sm:ml-auto">
                                                    {edu.period}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 font-medium text-sm sm:text-base">{edu.institution}</p>
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
                            <div className="flex flex-col gap-3 sm:gap-4">
                                {certificationsData.certifications.map((cert, idx) => {
                                    const cardContent = (
                                        <>
                                            {/* Left accent color */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-b from-primary/50 to-primary/10 group-hover:from-primary group-hover:to-primary-light transition-colors"></div>

                                            <div className="flex items-center w-full z-10 gap-3 sm:gap-4 sm:mr-auto">
                                                {/* Icon Container */}
                                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-all duration-300">
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                                </div>

                                                <div className="flex-grow min-w-0 pr-1 sm:pr-4">
                                                    <h5 className="text-white font-bold text-sm sm:text-[1.05rem] leading-snug group-hover:text-primary-light transition-colors">{cert.name}</h5>
                                                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">{cert.issuer}</p>
                                                </div>
                                            </div>

                                            <div className="flex sm:flex-col items-center sm:items-end w-full sm:w-auto justify-between sm:justify-center flex-shrink-0 z-10 mt-3 sm:mt-0 pl-[3.25rem] sm:pl-0 gap-2">
                                                {cert.year && (
                                                    <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-900 text-slate-300 border border-slate-700/50 rounded shadow-sm">
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

                                    const className = `group flex flex-col sm:flex-row sm:items-center p-4 sm:p-5 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-primary/50 transition-all duration-300 rounded-2xl relative overflow-hidden ${cert.link ? 'cursor-pointer' : ''}`;

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
