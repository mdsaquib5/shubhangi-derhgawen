'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  const router = useRouter();

  const handleSave = async (data) => {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.error || 'Failed to create blog post');
    }

    router.push('/admin/blogs');
    router.refresh();
  };

  return (
    <div>
      <BlogEditor onSave={handleSave} titleText="Write New Blog Post" />
    </div>
  );
}
