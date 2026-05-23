'use client';

import React, { useState } from 'react';
import BlogRow from '@/components/admin/BlogRow';

export default function BlogTable({ initialBlogs }) {
  const [blogs, setBlogs] = useState(initialBlogs);

  const handleDeleteSuccess = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== id));
  };

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Author</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <BlogRow
            key={blog._id}
            blog={blog}
            onDeleteSuccess={() => handleDeleteSuccess(blog._id)}
          />
        ))}
      </tbody>
    </table>
  );
}
