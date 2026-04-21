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
            <section data-testid="section-blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="Blog" subtitle="Sharing insights, tutorials, and best practices in QA" />
                <BlogClient posts={blogData?.posts || []} />
            </section>
        </PageLayout>
    );
}
