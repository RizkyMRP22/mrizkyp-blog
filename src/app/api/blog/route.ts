export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export interface PostItem {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    tags: string[];
    link: string;
}

export interface postsData {
    posts: PostItem[];
}

export async function getPosts(): Promise<postsData> {
    try {
        const db = await getDb();
        const posts = await db.collection<PostItem>('posts').find({}, { projection: { _id: 0 } }).toArray();
        return { posts };
    } catch (error) {
        console.error('Error fetching posts from MongoDB:', error);
        return { posts: [] };
    }
}

export async function GET() {
    const data = await getPosts();
    return NextResponse.json(data);
}
