import React from 'react';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="blog-card">
      <div className="blog-card-image">
        {blog.coverImage?.url ? (
          <img src={blog.coverImage.url} alt={blog.title} />
        ) : (
          <div style={{ height: '100%', background: 'linear-gradient(135deg, #ffa945 0%, #f820a3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
            <span>Portfolio Blog</span>
          </div>
        )}
        <span className="blog-card-badge">{blog.status}</span>
      </div>
      <div className="blog-card-content">
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            {blog.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="blog-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="blog-card-title">
          <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {blog.title}
          </Link>
        </h3>
        <p className="blog-card-excerpt">
          {blog.excerpt && blog.excerpt.length > 120
            ? `${blog.excerpt.slice(0, 120)}...`
            : blog.excerpt}
        </p>
        <div className="blog-card-footer">
          <div className="blog-card-author">
            <div className="blog-card-author-avatar">
              <img src={blog.author?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'} alt={blog.author?.name || 'Admin'} />
            </div>
            <span className="blog-card-author-name">{blog.author?.name || 'Admin'}</span>
          </div>
          <span className="blog-card-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
