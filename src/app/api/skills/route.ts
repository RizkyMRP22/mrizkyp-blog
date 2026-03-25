export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
// import skillsData from '@/data/skills.json';

export interface SkillItem {
    name: string;
    icon: string;
    skills: {
        name: string;
        level: number;
    }[];
}

export interface SkillData {
    skillCategories: SkillItem[];
}

export async function getSkills(): Promise<SkillData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/skills` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch profile data');
            return { skillCategories: [] }
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return { skillCategories: [] }
    }
}

export async function GET() {
    const data = await getSkills();
    return NextResponse.json(data);
}