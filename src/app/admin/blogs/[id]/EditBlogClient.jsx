'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

export default function EditBlogClient({ blog }) {
  const router = useRouter();

  const handleSave = async (data) => {
    const res = await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.error || 'Failed to update blog post');
    }

    router.push('/admin/blogs');
    router.refresh();
  };

  return (
    <div>
      <BlogEditor initialData={blog} onSave={handleSave} titleText="Edit Blog Post" />
    </div>
  );
}
