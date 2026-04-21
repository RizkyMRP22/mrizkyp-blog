export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

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
        const db = await getDb();
        const skillCategories = await db.collection<SkillItem>('skills').find({}, { projection: { _id: 0 } }).toArray();
        return { skillCategories };
    } catch (error) {
        console.error('Error fetching skills from MongoDB:', error);
        return { skillCategories: [] };
    }
}

export async function GET() {
    const data = await getSkills();
    return NextResponse.json(data);
}