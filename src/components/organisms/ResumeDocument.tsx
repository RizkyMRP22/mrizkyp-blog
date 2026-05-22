import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';
import type { ResumeData } from '@/app/api/resume-data/route';

// Register standard ATS-safe fonts (built-in to @react-pdf/renderer)
Font.register({
    family: 'Helvetica',
    fonts: [],
});

// ─── Styles ───────────────────────────────────────────────────────────────────
const colors = {
    black: '#000000',
    dark: '#111827',
    heading: '#1e3a5f',
    accent: '#1d4ed8',
    text: '#1f2937',
    muted: '#4b5563',
    light: '#6b7280',
    border: '#d1d5db',
    bg: '#f8fafc',
    white: '#ffffff',
};

const s = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        color: colors.text,
        backgroundColor: colors.white,
        paddingTop: 36,
        paddingBottom: 48,
        paddingHorizontal: 44,
        lineHeight: 1.45,
    },

    // ── Header ────────────────────────────────────────────────────────────────
    header: {
        marginBottom: 14,
        borderBottomWidth: 2,
        borderBottomColor: colors.heading,
        paddingBottom: 10,
    },
    name: {
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
        color: colors.heading,
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    titleText: {
        fontSize: 11,
        color: colors.accent,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 4,
    },
    contactItem: {
        fontSize: 8.5,
        color: colors.muted,
        marginRight: 10,
    },
    contactSep: {
        fontSize: 8.5,
        color: colors.border,
        marginRight: 10,
    },

    // ── Section ───────────────────────────────────────────────────────────────
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: colors.heading,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        borderBottomWidth: 1,
        borderBottomColor: colors.heading,
        paddingBottom: 2,
        marginBottom: 6,
    },

    // ── Summary ───────────────────────────────────────────────────────────────
    summaryText: {
        fontSize: 9.5,
        color: colors.text,
        lineHeight: 1.5,
    },

    // ── Skills ────────────────────────────────────────────────────────────────
    skillsGrid: {
        flexDirection: 'column',
        gap: 3,
    },
    skillRow: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    skillCategory: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        color: colors.text,
        width: 110,
        flexShrink: 0,
    },
    skillList: {
        fontSize: 9,
        color: colors.muted,
        flex: 1,
        flexWrap: 'wrap',
    },

    // ── Experience ────────────────────────────────────────────────────────────
    expEntry: {
        marginBottom: 9,
    },
    expHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 1,
    },
    expRole: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: colors.dark,
    },
    expPeriod: {
        fontSize: 8.5,
        color: colors.muted,
        textAlign: 'right',
    },
    expCompany: {
        fontSize: 9,
        color: colors.accent,
        fontFamily: 'Helvetica-Oblique',
        marginBottom: 3,
    },
    bulletList: {
        paddingLeft: 10,
        marginTop: 2,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 1.5,
    },
    bulletDot: {
        fontSize: 9,
        color: colors.muted,
        width: 10,
        flexShrink: 0,
    },
    bulletText: {
        fontSize: 9,
        color: colors.text,
        flex: 1,
        lineHeight: 1.4,
    },
    techLine: {
        fontSize: 8.5,
        color: colors.light,
        marginTop: 2,
        fontFamily: 'Helvetica-Oblique',
    },

    // ── Projects ──────────────────────────────────────────────────────────────
    projectEntry: {
        marginBottom: 7,
    },
    projectTitle: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: colors.dark,
        marginBottom: 1,
    },
    projectDesc: {
        fontSize: 9,
        color: colors.text,
        lineHeight: 1.4,
        marginBottom: 2,
    },
    projectTags: {
        fontSize: 8.5,
        color: colors.light,
        fontFamily: 'Helvetica-Oblique',
    },

    // ── Certs ─────────────────────────────────────────────────────────────────
    certEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    certLeft: {
        flex: 1,
    },
    certName: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: colors.dark,
    },
    certIssuer: {
        fontSize: 8.5,
        color: colors.muted,
        marginTop: 1,
    },
    certYear: {
        fontSize: 8.5,
        color: colors.muted,
        textAlign: 'right',
        flexShrink: 0,
    },

    // ── Education ─────────────────────────────────────────────────────────────
    eduEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    eduDegree: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: colors.dark,
    },
    eduInstitution: {
        fontSize: 8.5,
        color: colors.muted,
        marginTop: 1,
    },
    eduPeriod: {
        fontSize: 8.5,
        color: colors.muted,
        textAlign: 'right',
        flexShrink: 0,
    },

    // ── Diagonal Page Watermark ───────────────────────────────────────────────
    pageWatermarkWrapper: {
        position: 'absolute',
        top: 0,
        left: -200,
        right: -200,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageWatermarkText: {
        fontFamily: 'Helvetica-Bold',
        color: '#9ca3af',
        opacity: 0.12,
        transform: 'rotate(-45deg)',
        textAlign: 'center',
        lineHeight: 1.1,
    },

    // ── Footer ────────────────────────────────────────────────────────────────
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 44,
        right: 44,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: colors.muted,
        paddingTop: 4,
    },
    footerWatermark: {
        fontSize: 7.5,
        color: colors.muted,
        fontFamily: 'Helvetica-Oblique',
        flex: 1,
    },
    footerPage: {
        fontSize: 7.5,
        color: colors.muted,
        textAlign: 'right',
    },
});

// ─── Helper Components ────────────────────────────────────────────────────────

function SectionTitle({ title }: { title: string }) {
    return <Text style={s.sectionTitle}>{title}</Text>;
}

function Bullet({ text }: { text: string }) {
    return (
        <View style={s.bulletItem}>
            <Text style={s.bulletDot}>•</Text>
            <Text style={s.bulletText}>{text}</Text>
        </View>
    );
}

// ─── Main Document ────────────────────────────────────────────────────────────

interface ResumeDocumentProps {
    data: ResumeData;
    downloaderName: string;
    downloaderEmail: string;
}

export default function ResumeDocument({ data, downloaderName, downloaderEmail }: ResumeDocumentProps) {
    const { profile, experiences, skillCategories, certifications, projects } = data;

    const now = new Date();
    const watermarkDate = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
    });
    const watermarkText = `Downloaded by ${downloaderName} (${downloaderEmail}) on ${watermarkDate} WIB`;

    // Compute adaptive font size and letter spacing for the diagonal watermark to handle different email lengths without overflowing
    const watermarkEmailLength = (downloaderEmail || '').length || 1;
    // Base scaling off layout bounds (container width stretched horizontally to prevent layout wrapping)
    const watermarkFontSize = Math.max(12, Math.min(42, Math.floor(700 / watermarkEmailLength)));
    const watermarkLetterSpacing = watermarkFontSize > 28 ? 6 : 3;

    // Build clean summary from bio (first 2 sentences for ATS summary)
    const bioSentences = profile.bio
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean)
        .slice(0, 3)
        .join(' ');

    // Build skills list — expert & proficient only for ATS keyword density
    const allExpertSkills = skillCategories.flatMap(cat =>
        cat.skills
            .filter(sk => sk.level === 'expert' || sk.level === 'proficient')
            .map(sk => sk.name)
    );

    return (
        <Document
            title={`Resume - ${profile.name} - ${watermarkDate}`}
            author={profile.name}
            subject={`${profile.title} - Professional Resume`}
            keywords={[
                profile.title,
                'QA Engineer',
                'Quality Assurance',
                'Test Automation',
                ...allExpertSkills.slice(0, 15),
            ].join(', ')}
            creator="mrizkyp.com"
            producer="mrizkyp.com"
        >
            <Page size="A4" style={s.page}>

                {/* ── Header ─────────────────────────────────────────────── */}
                <View style={s.header}>
                    <Text style={s.name}>{profile.name}</Text>
                    <Text style={s.contactSep}>-</Text>
                    <Text style={s.titleText}>{profile.title}</Text>
                    <View style={s.contactRow}>
                        <Text style={s.contactItem}>{profile.email}</Text>
                        <Text style={s.contactSep}>|</Text>
                        <Text style={s.contactItem}>{profile.linkedin}</Text>
                        <Text style={s.contactSep}>|</Text>
                        <Text style={s.contactItem}>{profile.github}</Text>
                        <Text style={s.contactSep}>|</Text>
                        <Text style={s.contactItem}>{profile.location}</Text>
                    </View>
                </View>

                {/* ── Professional Summary ────────────────────────────────── */}
                <View style={s.section}>
                    <SectionTitle title="Professional Summary" />
                    <Text style={s.summaryText}>{bioSentences}</Text>
                </View>

                {/* ── Core Competencies (ATS keyword section) ─────────────── */}
                <View style={s.section}>
                    <SectionTitle title="Core Competencies" />
                    <View style={s.skillsGrid}>
                        {skillCategories
                            .filter(cat => cat.skills.some(sk => sk.level === 'expert' || sk.level === 'proficient'))
                            .map((cat, i) => {
                                const filteredSkills = cat.skills
                                    .filter(sk => sk.level === 'expert' || sk.level === 'proficient')
                                    .map(sk => sk.name)
                                    .join(' · ');
                                return (
                                    <View key={i} style={s.skillRow}>
                                        <Text style={s.skillCategory}>{cat.name}:</Text>
                                        <Text style={s.skillList}>{filteredSkills}</Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>

                {/* ── Professional Experience ─────────────────────────────── */}
                <View style={s.section}>
                    <SectionTitle title="Professional Experience" />
                    {experiences.map((exp, i) => (
                        <View key={i} style={s.expEntry} wrap={false}>
                            <View style={s.expHeaderRow}>
                                <Text style={s.expRole}>{exp.role}</Text>
                                <Text style={s.expPeriod}>{exp.period}</Text>
                            </View>
                            <Text style={s.expCompany}>{exp.company} · {exp.location}</Text>
                            <View style={s.bulletList}>
                                {exp.achievements?.contribution?.slice(0, 4).map((item, j) => (
                                    <Bullet key={`c-${j}`} text={item} />
                                ))}
                                {exp.achievements?.impact?.slice(0, 2).map((item, j) => (
                                    <Bullet key={`i-${j}`} text={item} />
                                ))}
                            </View>
                            {exp.technologies?.length > 0 && (
                                <Text style={s.techLine}>
                                    Tools &amp; Stack: {exp.technologies.join(', ')}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>

                {/* ── Notable Projects ─────────────────────────────────────── */}
                {projects.length > 0 && (
                    <View style={s.section}>
                        <SectionTitle title="Notable Projects" />
                        {projects.slice(0, 4).map((proj, i) => (
                            <View key={i} style={s.projectEntry} wrap={false}>
                                <Text style={s.projectTitle}>{proj.title}</Text>
                                <Text style={s.projectDesc}>{proj.description}</Text>
                                {proj.highlights?.length > 0 && (
                                    <View style={s.bulletList}>
                                        {proj.highlights.slice(0, 2).map((h, j) => (
                                            <Bullet key={j} text={h} />
                                        ))}
                                    </View>
                                )}
                                {proj.tags?.length > 0 && (
                                    <Text style={s.projectTags}>Stack: {proj.tags.join(', ')}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* ── Certifications ──────────────────────────────────────── */}
                {certifications.length > 0 && (
                    <View style={s.section}>
                        <SectionTitle title="Certifications &amp; Courses" />
                        {certifications.map((cert, i) => (
                            <View key={i} style={s.certEntry} wrap={false}>
                                <View style={s.certLeft}>
                                    <Text style={s.certName}>{cert.name}</Text>
                                    <Text style={s.certIssuer}>{cert.issuer}</Text>
                                </View>
                                <Text style={s.certYear}>{cert.year}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* ── Education ───────────────────────────────────────────── */}
                {profile.education?.length > 0 && (
                    <View style={s.section}>
                        <SectionTitle title="Education" />
                        {profile.education.map((edu, i) => (
                            <View key={i} style={s.eduEntry} wrap={false}>
                                <View>
                                    <Text style={s.eduDegree}>{edu.degree}</Text>
                                    <Text style={s.eduInstitution}>{edu.institution}</Text>
                                </View>
                                <Text style={s.eduPeriod}>{edu.period}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* ── Diagonal Page Watermark (every page) ──────────────── */}
                <View style={s.pageWatermarkWrapper} fixed>
                    <Text style={[s.pageWatermarkText, { fontSize: watermarkFontSize, letterSpacing: watermarkLetterSpacing }]}>
                        {downloaderEmail}
                    </Text>
                </View>

                {/* ── Footer / Watermark ─────────────────────────────────── */}
                <View style={s.footer} fixed>
                    <Text style={s.footerWatermark}>{watermarkText}</Text>
                    <Text
                        style={s.footerPage}
                        render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`}
                    />
                </View>

            </Page>
        </Document>
    );
}
