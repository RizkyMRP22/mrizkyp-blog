export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

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
        const response = await fetch(`${process.env.API_BASEURL}/experiences` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch experience data');
            return { experience: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching experience data:', error);
        return { experience: [] };
    }
}
export async function GET() {
    const data = await getExperiences();
    return NextResponse.json(data);
}
