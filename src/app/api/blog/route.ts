export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import blogData from '@/data/blogPosts.json';

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
        const response = await fetch(`${process.env.API_BASEURL}/posts` as string, {
            headers: {
                'x-api-key': process.env.API_KEY as string
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error('Failed to fetch case study data');
            return { posts: [] };
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching case study data:', error);
        return { posts: [] };
    }
}


export async function GET() {
    const data = await getPosts();
    return NextResponse.json(data);
}
