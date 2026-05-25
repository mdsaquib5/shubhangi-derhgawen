import React from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
    <section className='blog-detail-page'>
      <div className="container">
        <article className="cms-card blog-detail-article">
          <div className="blog-detail-header">
            {blog.tags && blog.tags.length > 0 && (
              <div className="blog-tags blog-detail-tags-center">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="blog-tag blog-detail-tag-small">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="blog-detail-title">{blog.title}</h1>
            <div className="blog-detail-meta">
              <div className="blog-detail-author-wrapper">
                <div className="blog-detail-author-avatar-wrap">
                  <img
                    src={blog.author?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'}
                    alt={blog.author?.name || 'Admin'}
                    className="blog-detail-author-avatar-img"
                  />
                </div>
                <span className="blog-detail-author-name">{blog.author?.name || 'Admin'}</span>
              </div>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {blog.coverImage?.url && (
            <div className="blog-detail-cover-wrap">
              <img
                src={blog.coverImage.url}
                alt={blog.title}
                className="blog-detail-cover-img"
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

        </article>
      </div>
    </section>
  );
}
