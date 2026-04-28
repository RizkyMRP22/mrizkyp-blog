export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { withCache, invalidateCache } from '@/lib/redis';
import { getDb } from '@/lib/mongodb';
import { put } from '@vercel/blob';

export interface PostItem {
    id: string; // Changed from number to string for blogId-YYYYMMDDHHmm
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    tags: string[];
    link: string;
    createdAt: string;
}

export interface postsData {
    posts: PostItem[];
}

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
}

async function _getPosts(): Promise<postsData> {

    try {
        const db = await getDb();
        const posts = await db.collection<PostItem>('posts')
            .find({}, { projection: { _id: 0 } })
            .sort({ createdAt: -1 })
            .toArray();
        return { posts };
    } catch (error) {
        console.error('Error fetching posts from MongoDB:', error);
        return { posts: [] };
    }
}

export async function getPosts() {
    return withCache('api:blog', _getPosts, 3600);
}

async function _getPostById(id: string): Promise<PostItem | null> {
    try {
        const db = await getDb();
        const post = await db.collection<PostItem>('posts')
            .findOne({ id }, { projection: { _id: 0 } });
        return post;
    } catch (error) {
        console.error(`Error fetching post ${id} from MongoDB:`, error);
        return null;
    }
}

export async function getPostById(id: string) {
    return withCache(`api:blog:${id}`, () => _getPostById(id), 3600);
}

export async function GET() {
    const data = await getPosts();
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const category = formData.get('category') as string;
        const tagsString = formData.get('tags') as string;
        const file = formData.get('file') as File;

        if (!title || !excerpt || !category || !file) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

        // Upload file to Vercel Blob
        const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
            access: 'public',
        });

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeStampStr = now.toISOString().replace(/[-:T]/g, '').slice(0, 12); // YYYYMMDDHHmm

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const createdAt = `${year}-${month}-${day}: ${hours}:${minutes}`;

        const id = `idBlog-${timeStampStr}`;

        // Estimate read time (approx 200 words per minute)
        const wordCount = excerpt.split(/\s+/).length;
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min`;

        const newPost: PostItem = {
            id,
            title,
            excerpt,
            category,
            date: dateStr,
            readTime,
            tags,
            link: blob.url,
            createdAt,
        };

        const db = await getDb();
        await db.collection('posts').insertOne({ ...newPost });

        // Invalidate cache
        await invalidateCache('api:blog');

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
