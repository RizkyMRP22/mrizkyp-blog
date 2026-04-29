export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { withCache, invalidateCache } from '@/lib/redis';
import { getDb } from '@/lib/mongodb';
import { put } from '@vercel/blob';

export interface PostItem {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    tags: string[];
    link: string;
    createdAt: string;
}

export interface PostsData {
    posts: PostItem[];
}



async function _getPosts(): Promise<PostsData> {
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

/**
 * POST /api/blog
 * Protected by BLOG_ADMIN_SECRET (Authorization: Bearer <token>).
 * If the env var is not set the route is effectively open — set it in production.
 */
export async function POST(request: NextRequest) {
    // ── Auth guard ────────────────────────────────────────────────────────────
    const adminSecret = process.env.BLOG_ADMIN_SECRET;
    if (adminSecret) {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
            return NextResponse.json({ code: 401, message: 'Unauthorized' }, { status: 401 });
        }
    } else {
        console.warn('[Blog API] BLOG_ADMIN_SECRET is not set. POST endpoint is unprotected.');
    }

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

        // Store as ISO string so it's universally parseable
        const createdAt = now.toISOString();

        const id = `idBlog-${timeStampStr}`;

        // Estimate read time based on excerpt (~200 wpm); actual content is a PDF
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

        // Invalidate the list cache so the new post appears immediately
        await invalidateCache('api:blog');

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
