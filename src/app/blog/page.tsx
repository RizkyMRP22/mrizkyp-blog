'use client';
import { useState } from 'react';
import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import BlogCard from '@/components/molecules/BlogCard';
import blogData from '@/data/blogPosts.json';

const categories = ['All', ...new Set(blogData.posts.flatMap(p => Array.isArray(p.category) ? p.category : [p.category]))];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? blogData.posts
        : blogData.posts.filter(p => Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory);

    return (
        <PageLayout>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="Blog" subtitle="Sharing insights, tutorials, and best practices in QA" />

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-surface/60 text-muted hover:text-white hover:bg-surface-light/50 border border-card-border'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((post) => (
                        <div key={post.id} className="animate-scale-in">
                                <BlogCard
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    category={post.category}
                                    date={post.date}
                                    readTime={post.readTime}
                                    tags={post.tags}
                                    link={post.link}
                                />
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
