import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const sortField = status === 'published' ? { publishedAt: -1 } : { createdAt: -1 };

    const blogs = await Blog.find(filter).sort(sortField);
    return NextResponse.json({ data: blogs, total: blogs.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newBlog = new Blog({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      media: body.media,
      author: body.author,
      tags: body.tags,
      status: body.status,
    });

    await newBlog.save();
    return NextResponse.json({ data: newBlog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
