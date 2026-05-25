'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

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
      <td className="blog-row-title">{blog.title}</td>
      <td>
        <span className={`status-badge ${blog.status}`}>{blog.status}</span>
      </td>
      <td>{blog.author?.name || 'Admin'}</td>
      <td>{formattedDate}</td>
      <td>
        <div className="blog-row-actions">
          <Link
            href={`/articles/${blog.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary blog-row-view-btn"
          >
            View <FiExternalLink size={13} />
          </Link>
          <Link
            href={`/admin/blogs/${blog._id}`}
            className="btn btn-secondary blog-row-edit-btn"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn blog-row-delete-btn"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  );
}
