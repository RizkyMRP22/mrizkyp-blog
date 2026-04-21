export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface ProfileItem {
    photo: string;
    name: string;
    nickName: string;
    title: string;
    titles: string[];
    tagline: string;
    bio: string;
    philosophy: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    avatar: string;
    resumeUrl: string;
    stats: {
        yearsExperience: number;
        projectsCompleted: number;
        bugsFound: number;
        testCasesWritten: number;
    };
    education: {
        degree: string;
        institution: string;
        period: string;
    }[];
    openFor: string[];
}

export async function getProfiles(): Promise<ProfileItem> {
    try {
        const db = await getDb();
        const profile = await db.collection<ProfileItem>('profiles').findOne({}, { projection: { _id: 0 } });
        if (!profile) {
            throw new Error('Profile document not found in MongoDB');
        }
        return profile;
    } catch (error) {
        console.error('Error fetching profile from MongoDB:', error);
        throw error;
    }
}

export async function GET() {
    const data = await getProfiles();
    return NextResponse.json(data);
}
