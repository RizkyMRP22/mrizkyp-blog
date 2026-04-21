export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

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
        const db = await getDb();
        const quickLink = await db.collection<QuickLinkItems>('quicklinks').find({}, { projection: { _id: 0 } }).toArray();
        return { quickLink };
    } catch (error) {
        console.error('Error fetching quicklinks from MongoDB:', error);
        return { quickLink: [] };
    }
}

export async function GET() {
    const data = await getQuickLinks();
    return NextResponse.json(data);
}
