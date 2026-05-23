import React from 'react';
import { headers } from 'next/headers';
import BlogCard from '@/components/public/BlogCard';
import '@/app/cms-styles.css';

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
    <main className="cms-container">
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="cms-title-gradient" style={{ fontSize: '48px', marginBottom: '15px' }}>
          My Blog
        </h1>
        <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Explore articles, event coverage, and creative projects I've worked on.
        </p>
      </div>

      {errorMsg ? (
        <div style={{ textAlign: 'center', color: '#dc2626', padding: '40px' }}>
          {errorMsg}
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
          <h2 style={{ fontSize: '24px', color: '#64748b', marginBottom: '10px' }}>No blogs published yet</h2>
          <p style={{ color: '#94a3b8' }}>Check back soon for new articles!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </main>
  );
}
