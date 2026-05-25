import React from 'react';
import { headers } from 'next/headers';
import BlogCard from '@/components/shared/BlogCard';

export const metadata = {
    title: 'Blog - Shubhangi Portfolio',
    description: 'Read the latest stories, guides, and thoughts on technology, productivity, and lifestyle.',
};

export default async function BlogListingPage() {
    let blogs = [];
    let errorMsg = '';

    try {
        const headersList = await headers();
        const host = headersList.get('host') || 'localhost:3000';
        const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';

        const res = await fetch(`${protocol}://${host}/api/blogs?status=published`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch blogs');
        }

        const json = await res.json();
        blogs = json.data || [];
    } catch (err) {
        console.error('Error fetching blogs in Server Component:', err);
        errorMsg = 'Could not load blog posts. Please try again later.';
    }

    return (
        <section className='articles-page'>
            <div className="container">
                <div className="blog-listing-header">
                    <h1 className="cms-title-gradient blog-listing-title">
                        My Blog
                    </h1>
                </div>

                {errorMsg ? (
                    <div className="blog-listing-error">
                        {errorMsg}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="blog-listing-empty-state">
                        <h2 className="blog-listing-empty-title">No blogs published yet</h2>
                        <p className="blog-listing-empty-desc">Check back soon for new articles!</p>
                    </div>
                ) : (
                    <div className="blog-grid">
                        {blogs.map((blog) => {
                            const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            });

                            const item = {
                                img: blog.coverImage?.url || '/about/rabish.webp',
                                blogLink: `/articles/${blog.slug}`,
                                title: blog.title,
                                desc: blog.excerpt && blog.excerpt.length > 120
                                    ? `${blog.excerpt.slice(0, 120)}...`
                                    : blog.excerpt || '',
                                authLink: '#',
                                authorImg: blog.author?.avatarUrl || '/about/story-5.webp',
                                author: blog.author?.name || 'Admin',
                                date: formattedDate,
                            };

                            return <BlogCard key={blog._id} item={item} />;
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}