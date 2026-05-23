import React from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import MediaBlock from '@/components/public/MediaBlock';
import '@/app/cms-styles.css';

async function getBlog(slug, host) {
  try {
    const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';
    const res = await fetch(`${protocol}://${host}/api/blogs/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error('Error fetching single blog in server helper:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const blog = await getBlog(slug, host);

  if (!blog) {
    return {
      title: 'Blog Post Not Found - Shubhangi Portfolio',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} - Shubhangi Portfolio`,
    description: blog.excerpt || 'Read the full blog post.',
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage?.url ? [{ url: blog.coverImage.url }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const blog = await getBlog(slug, host);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isHtml = /<[a-z][\s\S]*>/i.test(blog.content || '');

  return (
    <main className="cms-container">
      <article className="cms-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
        <div className="blog-detail-header">
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags" style={{ justifyContent: 'center' }}>
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="blog-tag" style={{ fontSize: '12px', padding: '4px 12px' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0' }}>
                <img
                  src={blog.author?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'}
                  alt={blog.author?.name || 'Admin'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontWeight: '500' }}>{blog.author?.name || 'Admin'}</span>
            </div>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {blog.coverImage?.url && (
          <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px', border: '1px solid #f1f5f9' }}>
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {isHtml ? (
          <div
            className="blog-detail-content tiptap"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <div className="blog-detail-content">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        )}

        {blog.media && blog.media.length > 0 && (
          <MediaBlock media={blog.media} />
        )}
      </article>
    </main>
  );
}
