export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

export interface ShowcaseItem {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
}

export interface ShowcaseData {
    showcases: ShowcaseItem[];
}

export async function getShowcases(): Promise<ShowcaseData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/project-showcases` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch showcases data');
            return { showcases: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching showcases data:', error);
        return { showcases: [] };
    }
}

export async function GET() {
    const data = await getShowcases();
    return NextResponse.json(data);
}
