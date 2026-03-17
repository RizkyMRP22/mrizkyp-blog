import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import Card from '@/components/atoms/Card';
import profileData from '@/data/profile.json';
import educationData from '@/data/education.json';
import certificationsData from '@/data/certifications.json';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Me | QA Portfolio',
    description: 'Learn about M. Rizky Pratama - QA Engineer with 5+ years of experience in test automation and quality assurance.',
};

export default function AboutPage() {
    return (
        <PageLayout>
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="About Me" subtitle="Get to know the person behind the quality" />

                <div className="space-y-8">
                    {/* Profile */}
                    <Card hover={false} className="text-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-6 flex items-center justify-center text-5xl">
                            <Image src={profileData.photo} alt={profileData.name} width={128} height={128} className="rounded-full" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{profileData.name}</h3>
                        <p className="text-primary-light font-medium mb-2">{profileData.title}</p>
                        <p className="text-sm text-muted mb-4">📍 {profileData.location}</p>
                    </Card>

                    {/* Bio */}
                    <Card hover={false}>
                        <h4 className="text-lg font-semibold text-white mb-3">📝 Bio</h4>
                        <p className="text-slate-300 leading-relaxed">{profileData.bio}</p>
                    </Card>

                    {/* Philosophy */}
                    <Card hover={false}>
                        <h4 className="text-lg font-semibold text-white mb-3">💭 QA Philosophy</h4>
                        <blockquote className="border-l-4 border-primary pl-4 text-slate-300 italic leading-relaxed">
                            &ldquo;{profileData.philosophy}&rdquo;
                        </blockquote>
                    </Card>

                    {/* Education */}
                    <Card hover={false}>
                        <h4 className="text-lg font-semibold text-white mb-4">🎓 Education</h4>
                        <div className="space-y-4">
                            {educationData.education.map((edu, idx) => (
                                <div key={idx} className="border-l-2 border-slate-700 pl-4">
                                    <h5 className="font-bold text-white">{edu.degree}</h5>
                                    <p className="text-slate-400">{edu.institution}</p>
                                    <p className="text-sm text-primary-light">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Certifications & Courses */}
                    <Card hover={false}>
                        <h4 className="text-lg font-semibold text-white mb-4">🏆 Certifications & Courses</h4>
                        <ul className="space-y-3">
                            {certificationsData.certifications.map((cert, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <span className="text-primary mt-1">✓</span>
                                    <div className="flex-grow">
                                        <p className="text-slate-200 font-medium">{cert.name}</p>
                                        <p className="text-sm text-slate-400 mb-1">
                                            {cert.issuer} {cert.year && `• ${cert.year}`}
                                        </p>
                                        <div className="text-sm mt-1">
                                            {cert.link ? (
                                                <a
                                                    href={cert.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary-light flex items-center gap-1 transition-colors w-fit"
                                                >
                                                    View Certificate <span className="text-xs opacity-70">↗</span>
                                                </a>
                                            ) : (
                                                <span className="text-slate-500 italic text-xs">Link Not Available</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Stats */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Years Experience', value: `${profileData.stats.yearsExperience}+`, icon: '📅' },
                            { label: 'Projects', value: `${profileData.stats.projectsCompleted}+`, icon: '🚀' },
                            { label: 'Bugs Found', value: `${profileData.stats.bugsFound.toLocaleString()}+`, icon: '🐛' },
                            { label: 'Test Cases', value: `${profileData.stats.testCasesWritten.toLocaleString()}+`, icon: '📋' },
                        ].map((stat) => (
                            <Card key={stat.label} className="text-center">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold gradient-text-primary">{stat.value}</div>
                                <div className="text-xs text-muted mt-1">{stat.label}</div>
                            </Card>
                        ))}
                    </div> */}

                    {/* Links */}
                    <Card hover={false}>
                        <h4 className="text-lg font-semibold text-white mb-4">🔗 Connect</h4>
                        <div className="flex flex-wrap gap-4">
                            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-light hover:text-white transition-colors">
                                <span>🐙</span> GitHub
                            </a>
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-light hover:text-white transition-colors">
                                <span>💼</span> LinkedIn
                            </a>
                            <a href={`mailto:${profileData.email}`} className="flex items-center gap-2 text-primary-light hover:text-white transition-colors">
                                <span>✉️</span> {profileData.email}
                            </a>
                        </div>
                    </Card>
                </div>
            </section>
        </PageLayout>
    );
}
