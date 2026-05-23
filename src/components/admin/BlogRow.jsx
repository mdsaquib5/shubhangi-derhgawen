'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BlogRow({ blog, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${blog.title}"?\nThis will remove the blog post and permanently delete all media assets from Cloudinary.`
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete blog');
      }

      onDeleteSuccess();
    } catch (err) {
      alert(err.message || 'Error deleting blog post');
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <tr>
      <td style={{ fontWeight: '600', color: '#1e293b' }}>{blog.title}</td>
      <td>
        <span className={`status-badge ${blog.status}`}>{blog.status}</span>
      </td>
      <td>{blog.author?.name || 'Admin'}</td>
      <td>{formattedDate}</td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href={`/admin/blogs/${blog._id}`}
            className="btn btn-secondary"
            style={{ fontSize: '13px', height: '30px', paddingInline: '12px', textDecoration: 'none', display: 'inline-flex' }}
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn"
            style={{
              fontSize: '13px',
              height: '30px',
              paddingInline: '12px',
              background: '#fee2e2',
              color: '#dc2626',
              border: '1px solid #fca5a5',
              cursor: 'pointer',
              opacity: isDeleting ? 0.7 : 1,
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  );
}
