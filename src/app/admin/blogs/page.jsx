import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogTable from '@/components/admin/BlogTable';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export const revalidate = 0;

export default async function AdminBlogsPage() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Blogs Manager
          </h1>
          <p className="admin-page-subtitle">
            Write new articles, manage drafts, publish columns, and manage media.
          </p>
        </div>
        
        <Link
          href="/admin/blogs/new"
          className="btn primary-btn admin-page-new-btn"
        >
          <FiPlus size={16} /> Write New Post
        </Link>
      </div>

      <div className="cms-card admin-dashboard-card">
        {blogs.length === 0 ? (
          <div className="admin-page-empty">
            No blog posts found. Click <strong className="admin-page-empty-strong">+ Write New Post</strong> to write your first article!
          </div>
        ) : (
          <div className="admin-dashboard-table-wrap">
            <BlogTable initialBlogs={JSON.parse(JSON.stringify(blogs))} />
          </div>
        )}
      </div>
    </div>
  );
}
