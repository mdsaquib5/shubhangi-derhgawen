import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cloudinary } from '@/lib/cloudinary';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id);
    }

    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ data: blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    blog.title = body.title;
    blog.excerpt = body.excerpt;
    blog.content = body.content;
    blog.coverImage = body.coverImage;
    blog.media = body.media;
    blog.author = body.author;
    blog.tags = body.tags;
    blog.status = body.status;

    await blog.save();

    return NextResponse.json({ data: blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // 1. Cover Image delete
    if (blog.coverImage && blog.coverImage.publicId) {
      try {
        await cloudinary.uploader.destroy(blog.coverImage.publicId);
      } catch (err) {
        console.error('Failed to delete cover image from Cloudinary:', err);
      }
    }

    // 2. Media attachments delete
    if (blog.media && blog.media.length > 0) {
      for (const item of blog.media) {
        if (item.publicId) {
          try {
            let resourceType = 'image';
            if (item.resourceType === 'video' || item.resourceType === 'audio') {
              resourceType = 'video';
            } else if (item.resourceType === 'raw') {
              resourceType = 'raw';
            }
            await cloudinary.uploader.destroy(item.publicId, { resource_type: resourceType });
          } catch (err) {
            console.error(`Failed to delete media ${item.publicId} from Cloudinary:`, err);
          }
        }
      }
    }

    await blog.deleteOne();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
