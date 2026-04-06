export const dynamic = 'force-static';
import { NextResponse } from 'next/server';


export interface TestingStrategiesItems {
    id: string;
    title: string;
    tasks: string[];
    tools: string[];
}

export interface TestingStrategiesData {
    phases: TestingStrategiesItems[];
}


export async function getTestingPhases(): Promise<TestingStrategiesData> {
    try {
        const response = await fetch(`${process.env.API_BASEURL}/testing-strategies` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch testing strategies data');
            return { phases: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching testing strategies data:', error);
        return { phases: [] };
    }
}

export async function GET() {
    const data = await getTestingPhases();
    return NextResponse.json(data);
}
