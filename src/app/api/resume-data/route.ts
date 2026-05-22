export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface ResumeProfile {
    name: string;
    nickName: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    education: {
        degree: string;
        institution: string;
        period: string;
    }[];
}

export interface ResumeExperience {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    achievements: {
        contribution: string[];
        impact: string[];
    };
    technologies: string[];
}

export interface ResumeSkillCategory {
    name: string;
    skills: {
        name: string;
        level: 'expert' | 'proficient' | 'familiar';
    }[];
}

export interface ResumeCertification {
    name: string;
    issuer: string;
    year: string;
    link?: string;
}

export interface ResumeProject {
    title: string;
    description: string;
    tags: string[];
    highlights: string[];
}

export interface ResumeData {
    profile: ResumeProfile;
    experiences: ResumeExperience[];
    skillCategories: ResumeSkillCategory[];
    certifications: ResumeCertification[];
    projects: ResumeProject[];
}

export async function getResumeData(): Promise<ResumeData> {
    const db = await getDb();

    const [profile, experiences, skillCategories, certifications, projects] = await Promise.all([
        db.collection('profiles').findOne({}, { projection: { _id: 0 } }),
        db.collection('experiences').find({}, { projection: { _id: 0 } }).toArray(),
        db.collection('skills').find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray(),
        db.collection('certifications').find({}, { projection: { _id: 0 } }).sort({ year: -1 }).toArray(),
        db.collection('projects').find({}, { projection: { _id: 0 } }).sort({ id: 1 }).limit(5).toArray(),
    ]);

    if (!profile) {
        throw new Error('Profile not found');
    }

    return {
        profile: profile as unknown as ResumeProfile,
        experiences: (experiences as unknown as ResumeExperience[]),
        skillCategories: (skillCategories as unknown as ResumeSkillCategory[]),
        certifications: (certifications as unknown as ResumeCertification[]),
        projects: (projects as unknown as ResumeProject[]),
    };
}

export async function GET() {
    try {
        const data = await getResumeData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching resume data:', error);
        return NextResponse.json({ error: 'Failed to fetch resume data' }, { status: 500 });
    }
}
