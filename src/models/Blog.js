import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    coverImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    media: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        resourceType: { type: String, enum: ['image', 'video', 'audio', 'raw'], required: true },
        format: { type: String, default: '' },
        label: { type: String, default: '' },
      },
    ],
    author: {
      name: { type: String, default: 'Admin' },
      avatarUrl: { type: String, default: '' },
    },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre('save', async function () {
  if (this.isModified('title') || !this.slug) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!baseSlug) {
      baseSlug = 'post';
    }

    let slug = baseSlug;
    let count = 1;

    const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

    while (true) {
      const existing = await BlogModel.findOne({
        slug,
        _id: { $ne: this._id },
      });

      if (!existing) {
        break;
      }
      count++;
      slug = `${baseSlug}-${count}`;
    }

    this.slug = slug;
  }

  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
