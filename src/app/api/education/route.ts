export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

export interface EducationItem {
    degree: string;
    institution: string;
    period: string;
}

export interface EducationData {
    education: EducationItem[];
}

export async function getEducation(): Promise<EducationData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/education` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch education data');
            return { education: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching education data:', error);
        return { education: [] };
    }
}

export async function GET() {
    const data = await getEducation();
    return NextResponse.json(data);
}
