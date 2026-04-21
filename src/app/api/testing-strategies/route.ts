export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

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
        const db = await getDb();
        const phases = await db.collection<TestingStrategiesItems>('testing-strategies').find({}, { projection: { _id: 0 } }).toArray();
        return { phases };
    } catch (error) {
        console.error('Error fetching testing strategies from MongoDB:', error);
        return { phases: [] };
    }
}

export async function GET() {
    const data = await getTestingPhases();
    return NextResponse.json(data);
}
