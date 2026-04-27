import { getPostById, getPosts } from '@/app/api/blog/route';
import PageLayout from '@/components/templates/PageLayout';
import Badge from '@/components/atoms/Badge';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import BlogDetailClient from './BlogDetailClient';
import BlogBackButton from './BlogBackButton';
import PdfViewer from './PdfViewer';
import Link from 'next/link';
import BlogCard from '@/components/molecules/BlogCard';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | ${siteConfig.name}`,
        description: post.excerpt,
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { id } = await params;
    const [post, { posts: allPosts }] = await Promise.all([
        getPostById(id),
        getPosts()
    ]);

    if (!post) {
        notFound();
    }

    // Filter related posts (same category or just latest)
    const relatedPosts = allPosts
        .filter(p => p.id !== id)
        .slice(0, 3);

    return (
        <PageLayout>
            {/* BlogDetailClient handles interactive elements like progress bar and floating actions */}
            <BlogDetailClient title={post.title} pdfUrl={post.link} />

            <div className="relative">
                {/* Cinematic Hero Background */}
                <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background z-10" />
                    <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full animate-pulse-glow" />
                </div>

                <article className="relative z-20 max-w-7xl mx-auto px-4 pt-20 pb-24">
                    {/* Top Back Button */}
                    <div className="mb-12 animate-fade-in">
                        <BlogBackButton variant="ghost" size="sm" />
                    </div>

                    {/* Header Section */}
                    <header className="mb-16 animate-fade-in">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {Array.isArray(post.category) ? (
                                post.category.map((cat, idx) => <Badge key={idx} label={cat} variant="info" size="md" />)
                            ) : (
                                <Badge label={post.category} variant="info" size="md" />
                            )}
                            <span className="text-slate-500">•</span>
                            <span className="text-sm font-medium text-slate-400">{post.readTime} read</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-sm font-medium text-slate-400">
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <Heading level={3} gradient className="text-2xl md:text-4xl lg:text-5xl mb-8 leading-[1.2] tracking-tight">
                            {post.title}
                        </Heading>

                        <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light mb-12 w-full border-l-4 border-primary pl-8 py-4 italic bg-white/5 backdrop-blur-sm rounded-r-3xl pr-10 shadow-inner group-hover:bg-white/10 transition-all duration-500">
                            {post.excerpt}
                        </p>
                    </header>

                    {/* PDF Preview Section */}
                    <div className="w-full">
                        <PdfViewer pdfUrl={post.link} title={post.title} />
                    </div>

                    {/* Tags Section */}
                    <footer className="mt-16 pt-10 border-t border-white/10">
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-5 py-2 bg-white/5 hover:bg-primary/10 text-slate-300 hover:text-primary-light text-sm font-medium rounded-full border border-white/10 hover:border-primary/40 transition-all duration-300 cursor-default"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </footer>
                </article>
            </div>
        </PageLayout>
    );
}
