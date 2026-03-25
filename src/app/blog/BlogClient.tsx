'use client';

import { useState } from 'react';
import BlogCard from '@/components/molecules/BlogCard';
import { PostItem } from '@/app/api/blog/route';

interface BlogClientProps {
    posts: PostItem[];
}

export default function BlogClient({ posts }: BlogClientProps) {
    const categories = ['All', ...Array.from(new Set(posts.flatMap(p => Array.isArray(p.category) ? p.category : [p.category])))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? posts
        : posts.filter(p => Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory);

    if (!posts || posts.length === 0) {
        return <div className="text-center text-muted col-span-full py-10">No blog posts found.</div>;
    }

    return (
        <>
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
                            tags={post.tags || []}
                            link={post.link}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
