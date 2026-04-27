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
                {/* Background Glow Decorations */}
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

                <section data-testid="section-blog" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <SectionTitle title="Blog" subtitle="Sharing insights, tutorials, and best practices in QA" />
                    <BlogClient posts={blogData?.posts || []} />
                </section>
            </div>
        </PageLayout>
    );
}
