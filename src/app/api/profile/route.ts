export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { withCache } from '@/lib/redis';
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

import { getProjects } from '@/app/api/projects/route';

async function _getProfiles(): Promise<ProfileItem> {
    try {
        const db = await getDb();
        const profile = await db.collection<ProfileItem>('profiles').findOne({}, { projection: { _id: 0 } });
        if (!profile) {
            throw new Error('Profile document not found in MongoDB');
        }

        // Calculate dynamic stats
        const startDate = new Date('2018-12-01');
        const currentDate = new Date();
        const yearsExperience = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

        // Get project count
        const projectsData = await getProjects();
        const projectsCompleted = projectsData.projects.length;

        return {
            ...profile,
            stats: {
                ...profile.stats,
                yearsExperience,
                projectsCompleted
            }
        };
    } catch (error) {
        console.error('Error fetching profile from MongoDB:', error);
        throw error;
    }
}

export async function getProfiles() {
    return withCache('api:profile', _getProfiles, 3600);
}

export async function GET() {
    const data = await getProfiles();
    return NextResponse.json(data);
}
