export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface ExperienceItem {
    id: string;
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

export interface ExperienceData {
    experience: ExperienceItem[];
}

export async function getExperiences(): Promise<ExperienceData> {
    try {
        const db = await getDb();
        const experience = await db.collection<ExperienceItem>('experiences').find({}, { projection: { _id: 0 } }).toArray();
        return { experience };
    } catch (error) {
        console.error('Error fetching experiences from MongoDB:', error);
        return { experience: [] };
    }
}

export async function GET() {
    const data = await getExperiences();
    return NextResponse.json(data);
}
