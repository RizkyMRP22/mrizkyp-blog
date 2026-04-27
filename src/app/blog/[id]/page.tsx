import { getPostById, getPosts } from '@/app/api/blog/route';
import PageLayout from '@/components/templates/PageLayout';
import Badge from '@/components/atoms/Badge';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import BlogDetailClient from './BlogDetailClient';
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

                        <Heading level={1} gradient className="mb-8 leading-[1.2] tracking-tight">
                            {post.title}
                        </Heading>

                        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light mb-12 w-full border-l-4 border-primary pl-8 py-4 italic bg-white/5 backdrop-blur-sm rounded-r-3xl pr-10 shadow-inner group-hover:bg-white/10 transition-all duration-500">
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

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <section className="bg-white/5 border-y border-white/5 py-24">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <Heading level={2} className="mb-4">Related Posts</Heading>
                                    <p className="text-slate-400">Continue reading more articles from our blog.</p>
                                </div>
                                <Link
                                    href="/blog"
                                    className="text-primary-light hover:text-white transition-colors flex items-center gap-2 font-medium"
                                >
                                    View all posts
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((rPost) => (
                                    <div key={rPost.id} className="animate-scale-in">
                                        <BlogCard
                                            id={rPost.id}
                                            title={rPost.title}
                                            excerpt={rPost.excerpt}
                                            category={rPost.category}
                                            date={rPost.date}
                                            readTime={rPost.readTime}
                                            tags={rPost.tags || []}
                                            link={rPost.link}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Bottom Back Link */}
                <div className="py-16 text-center">
                    <Link href="/blog">
                        <Button variant="ghost" className="gap-3 group">
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog
                        </Button>
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
