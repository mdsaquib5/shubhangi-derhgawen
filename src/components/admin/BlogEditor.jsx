'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from 'next/link';

export default function BlogEditor({ initialData, onSave, titleText }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Admin');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');

  const [coverImage, setCoverImage] = useState({ url: '', publicId: '' });
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [mediaList, setMediaList] = useState([]);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setExcerpt(initialData.excerpt || '');
      setContent(initialData.content || '');
      setAuthorName(initialData.author?.name || 'Admin');
      setAuthorAvatar(initialData.author?.avatarUrl || '');
      setTags(initialData.tags ? initialData.tags.join(', ') : '');
      setStatus(initialData.status || 'draft');
      setCoverImage(initialData.coverImage || { url: '', publicId: '' });
      setMediaList(initialData.media || []);

      if (editor && initialData.content) {
        editor.commands.setContent(initialData.content);
      }
    }
  }, [initialData, editor]);

  const handleCoverUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploadingCover(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'covers');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setCoverImage({
        url: result.url,
        publicId: result.publicId,
      });
    } catch (err) {
      setError(`Cover upload failed: ${err.message}`);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleMediaUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    setIsUploadingMedia(true);
    setError('');

    try {
      const uploadedItems = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'blog-media');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || `Upload failed for ${file.name}`);
        }

        uploadedItems.push({
          url: result.url,
          publicId: result.publicId,
          resourceType: result.resourceType,
          format: result.format,
          label: file.name.split('.')[0],
        });
      }

      setMediaList((prev) => [...prev, ...uploadedItems]);
    } catch (err) {
      setError(`Media upload failed: ${err.message}`);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleMediaLabelChange = (index, label) => {
    setMediaList((prev) => {
      const copy = [...prev];
      copy[index].label = label;
      return copy;
    });
  };

  const handleRemoveMedia = (index) => {
    setMediaList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      await onSave({
        title,
        excerpt,
        content,
        author: {
          name: authorName,
          avatarUrl: authorAvatar,
        },
        tags: parsedTags,
        status,
        coverImage,
        media: mediaList,
      });
    } catch (err) {
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const renderToolbarBtn = (action, label, activeCheck) => (
    <button
      type="button"
      onClick={action}
      className={`tiptap-btn ${activeCheck ? 'active' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className="cms-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 className="cms-title-gradient" style={{ fontSize: '28px', margin: 0 }}>
          {titleText}
        </h2>
        <Link href="/admin/blogs" className="btn btn-secondary" style={{ textDecoration: 'none', fontSize: '14px', height: '36px' }}>
          ← Back to Blogs
        </Link>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '12px 16px', borderRadius: '6px', color: '#991b1b', marginBottom: '20px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label">Blog Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Excerpt (Max 200 chars) *</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
            className="form-input"
            placeholder="Write a brief, catchy summary for listing cards (1-2 lines)"
            rows={2}
            maxLength={200}
            required
          />
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            {excerpt.length}/200 characters
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Cover Image</label>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                style={{ display: 'none' }}
                id="cover-upload-input"
              />
              <label
                htmlFor="cover-upload-input"
                className="btn btn-secondary"
                style={{ width: 'fit-content', cursor: 'pointer', height: '40px' }}
              >
                {isUploadingCover ? 'Uploading...' : 'Choose Cover Image'}
              </label>
            </div>
            
            {coverImage.url && (
              <div style={{ width: '160px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd', position: 'relative' }}>
                <img
                  src={coverImage.url}
                  alt="Cover preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => setCoverImage({ url: '', publicId: '' })}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255, 0, 0, 0.8)', border: 'none', borderRadius: '50%', width: '22px', height: '22px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px' }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Blog Content *</label>
          
          {editor && (
            <div className="tiptap-toolbar">
              {renderToolbarBtn(
                () => editor.chain().focus().toggleBold().run(),
                'Bold',
                editor.isActive('bold')
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleItalic().run(),
                'Italic',
                editor.isActive('italic')
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleStrike().run(),
                'Strike',
                editor.isActive('strike')
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().setParagraph().run(),
                'Paragraph',
                editor.isActive('paragraph')
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                'H2',
                editor.isActive('heading', { level: 2 })
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                'H3',
                editor.isActive('heading', { level: 3 })
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleBulletList().run(),
                'Bullet List',
                editor.isActive('bulletList')
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleOrderedList().run(),
                'Numbered List',
                editor.isActive('orderedList')
              )}
              {renderToolbarBtn(
                () => editor.chain().focus().toggleBlockquote().run(),
                'Quote',
                editor.isActive('blockquote')
              )}
              {renderToolbarBtn(() => editor.chain().focus().undo().run(), 'Undo')}
              {renderToolbarBtn(() => editor.chain().focus().redo().run(), 'Redo')}
            </div>
          )}
          
          <EditorContent editor={editor} className="tiptap-editor" />
        </div>

        <div className="form-group" style={{ marginTop: '30px' }}>
          <label className="form-label">Media Attachments (Images, Video, Audio, PDFs)</label>
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*,application/pdf"
            onChange={handleMediaUpload}
            style={{ display: 'none' }}
            id="media-upload-input"
          />
          <label
            htmlFor="media-upload-input"
            className="btn btn-secondary"
            style={{ width: 'fit-content', cursor: 'pointer', height: '40px', marginBottom: '15px' }}
          >
            {isUploadingMedia ? 'Uploading Attachments...' : 'Upload Media Files'}
          </label>

          {mediaList.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mediaList.map((item, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f8fafc', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  <div style={{ width: '40px', height: '40px', background: '#cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#475569', overflow: 'hidden' }}>
                    {item.resourceType === 'image' ? (
                      <img src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Attachment" />
                    ) : item.resourceType === 'video' ? (
                      'VIDEO'
                    ) : item.format.toLowerCase() === 'pdf' ? (
                      'PDF'
                    ) : (
                      'FILE'
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleMediaLabelChange(index, e.target.value)}
                      className="form-input"
                      placeholder="Add label (e.g. Behind the scenes)"
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {item.format.toUpperCase()} | {item.resourceType.toUpperCase()}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(index)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          <div className="form-group">
            <label className="form-label">Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="form-input"
              placeholder="e.g. Shubhangi"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="form-input"
              placeholder="e.g. education, review, tech"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="form-label" style={{ margin: 0 }}>Status:</span>
            <button
              type="button"
              onClick={() => setStatus('draft')}
              className={`btn ${status === 'draft' ? 'primary-btn' : 'btn-secondary'}`}
              style={{ fontSize: '14px', height: '36px', paddingInline: '16px' }}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus('published')}
              className={`btn ${status === 'published' ? 'primary-btn' : 'btn-secondary'}`}
              style={{ fontSize: '14px', height: '36px', paddingInline: '16px' }}
            >
              Publish
            </button>
          </div>

          <button
            type="submit"
            className="btn primary-btn"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Saving Post...' : 'Save Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
