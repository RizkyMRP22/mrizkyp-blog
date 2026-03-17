export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import blogData from '@/data/blogPosts.json';

export async function GET() {
    return NextResponse.json(blogData);
}
