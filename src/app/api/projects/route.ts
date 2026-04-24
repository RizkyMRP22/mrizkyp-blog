export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { withCache } from '@/lib/redis';
import { getDb } from '@/lib/mongodb';

export interface ProjectsItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    image: string | string[];
    githubUrl: string;
    webUrl: string;
    mobileUrl: string;
    highlights: string[];
}

export interface ProjectsData {
    projects: ProjectsItem[];
}

async function _getProjects(): Promise<ProjectsData> {

    try {
        const db = await getDb();
        const projects = await db.collection<ProjectsItem>('projects').find({}, { projection: { _id: 0 } }).toArray();
        return { projects };
    } catch (error) {
        console.error('Error fetching projects from MongoDB:', error);
        return { projects: [] };
    }
}

export async function getProjects() {
    return withCache('api:projects', _getProjects, 3600);
}

export async function GET() {
    const data = await getProjects();
    return NextResponse.json(data);
}
