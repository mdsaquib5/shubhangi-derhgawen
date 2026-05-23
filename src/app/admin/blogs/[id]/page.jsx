import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import EditBlogClient from './EditBlogClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function AdminEditBlogPage({ params }) {
  await connectDB();
  const { id } = await params;

  let blog = null;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return notFound();
  }

  if (!blog) {
    return notFound();
  }

  return <EditBlogClient blog={JSON.parse(JSON.stringify(blog))} />;
}
