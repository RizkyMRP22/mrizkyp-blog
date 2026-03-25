export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

export interface certificationItem {
    name: string;
    year: string;
    issuer: string;
    link: string;
}

export interface certificationData {
    certifications: certificationItem[];
}

export async function getCertifications(): Promise<certificationData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/certifications` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch certification data');
            return { certifications: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching certification data:', error);
        return { certifications: [] };
    }
}

export async function GET() {
    const data = await getCertifications();
    return NextResponse.json(data);
}
