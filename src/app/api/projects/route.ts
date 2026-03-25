export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
//import projectsData from '@/data/projects.json';

export interface ProjectsItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    image: string;
    githubUrl: string;
    webUrl: string;
    mobileUrl: string;
    highlights: string[];
}

export interface ProjectsData {
    projects: ProjectsItem[];
}

export async function getProjects(): Promise<ProjectsData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/projects` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch projects data');
            return { projects: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return { projects: [] };
    }
}

export async function GET() {
    const data = await getProjects();
    return NextResponse.json(data);
}
