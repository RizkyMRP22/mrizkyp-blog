export const dynamic = 'force-static';
import { NextResponse } from 'next/server';


export interface QuickLinkItems {
    href: string;
    label: string;
    icon: string;
    desc: string;
}

export interface QuickLinksData {
    quickLink: QuickLinkItems[];
}


export async function getQuickLinks(): Promise<QuickLinksData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/quicklinks` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch education data');
            return { quickLink: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching education data:', error);
        return { quickLink: [] };
    }
}

export async function GET() {
    const data = await getQuickLinks();
    return NextResponse.json(data);
}
