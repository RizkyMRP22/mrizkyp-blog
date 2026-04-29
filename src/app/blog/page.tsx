export const dynamic = 'force-dynamic';
import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import BlogClient from './BlogClient';
import { getPosts } from '@/app/api/blog/route';

import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: siteConfig.pages.blog.title,
    description: siteConfig.pages.blog.description,
};

export default async function BlogPage() {
    const blogData = await getPosts();

    return (
        <PageLayout>
            <div className="relative w-full overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-float delay-300" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                <section data-testid="section-blog" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <SectionTitle title={siteConfig.pages.blog.title} subtitle={siteConfig.pages.blog.description} />
                    <BlogClient posts={blogData?.posts || []} />
                </section>
            </div>
        </PageLayout>
    );
}
