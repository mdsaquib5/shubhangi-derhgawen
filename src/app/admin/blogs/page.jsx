import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogTable from '@/components/admin/BlogTable';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminBlogsPage() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
            Blogs Manager
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
            Write new articles, manage drafts, publish columns, and manage media.
          </p>
        </div>
        
        <Link
          href="/admin/blogs/new"
          className="btn primary-btn"
          style={{ textDecoration: 'none', height: '40px', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}
        >
          + Write New Post
        </Link>
      </div>

      <div className="cms-card" style={{ padding: '24px' }}>
        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            No blog posts found. Click <strong style={{ color: '#f820a3' }}>+ Write New Post</strong> to write your first article!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <BlogTable initialBlogs={JSON.parse(JSON.stringify(blogs))} />
          </div>
        )}
      </div>
    </div>
  );
}
