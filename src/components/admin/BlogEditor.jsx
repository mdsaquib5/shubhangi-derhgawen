'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TiptapImage from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BlogEditor({ initialData, onSave, titleText }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Shubhangi Derhgawen');
  const [authorAvatar, setAuthorAvatar] = useState('/blogs/ig.webp');
  const [status, setStatus] = useState('draft');

  const [coverImage, setCoverImage] = useState({ url: '', publicId: '' });
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const extensions = React.useMemo(() => [
    StarterKit,
    TiptapLink.configure({
      openOnClick: false,
      autolink: true,
    }),
    Underline,
    TiptapImage,
    Placeholder.configure({
      placeholder: 'Write something premium...',
    }),
  ], []);

  const editor = useEditor({
    extensions,
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setExcerpt(initialData.excerpt || '');
      setContent(initialData.content || '');
      setAuthorName(initialData.author?.name || 'Shubhangi Derhgawen');
      setAuthorAvatar(initialData.author?.avatarUrl || '/blogs/ig.webp');
      setStatus(initialData.status || 'draft');
      setCoverImage(initialData.coverImage || { url: '', publicId: '' });

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSave({
        title,
        excerpt,
        content,
        author: {
          name: authorName,
          avatarUrl: authorAvatar,
        },
        tags: [],
        status,
        coverImage,
      });
    } catch (err) {
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter Link URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const [uploadType, setUploadType] = useState(null);
  const mediaInputRef = React.useRef(null);

  const triggerMediaUpload = (type) => {
    setUploadType(type);
    if (mediaInputRef.current) {
      if (type === 'image') {
        mediaInputRef.current.accept = 'image/*';
      } else if (type === 'pdf') {
        mediaInputRef.current.accept = 'application/pdf';
      }
      mediaInputRef.current.click();
    }
  };

  const handleMediaUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blog-media');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      const url = result.url;

      if (uploadType === 'image') {
        editor.chain().focus().setImage({ src: url }).run();
      } else if (uploadType === 'pdf') {
        editor.chain().focus().insertContent(
          `<p><a href="${url}" target="_blank" rel="noopener noreferrer" class="blog-pdf-download-link" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-weight: 500; text-decoration: underline; margin: 10px 0;">📄 Download PDF (${file.name})</a></p>`
        ).run();
      }
    } catch (err) {
      setError(`Media upload failed: ${err.message}`);
    } finally {
      setLoading(false);
      if (mediaInputRef.current) mediaInputRef.current.value = '';
    }
  };

  return (
    <div className="cms-card">
      <div className="blog-editor-header">
        <h2 className="cms-title-gradient blog-editor-title">
          {titleText}
        </h2>
        <Link href="/admin/blogs" className="btn btn-secondary blog-editor-back-btn">
          <FiArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>

      {error && (
        <div className="blog-editor-error">
          {error}
        </div>
      )}

      {/* Hidden file input for editor uploads */}
      <input
        type="file"
        ref={mediaInputRef}
        onChange={handleMediaUpload}
        style={{ display: 'none' }}
      />

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label" style={{ fontWeight: 600, color: '#1c1917' }}>Blog Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter blog title"
            required
            style={{ borderRadius: '8px', border: '1px solid #eae5e1' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ fontWeight: 600, color: '#1c1917' }}>Description (Max 200 chars) *</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
            className="form-input"
            placeholder="Write a brief, catchy summary for listing cards (1-2 lines)"
            rows={2}
            maxLength={200}
            required
            style={{ borderRadius: '8px', border: '1px solid #eae5e1' }}
          />
          <div className="blog-editor-char-count">
            {excerpt.length}/200 characters
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '28px' }}>
          <label className="form-label" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#78716c', textTransform: 'uppercase' }}>Cover Image</label>
          <div className="cover-image-card">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="blog-editor-hidden"
              id="cover-upload-input"
            />
            {coverImage.url ? (
              <div className="blog-editor-cover-preview" style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                <img
                  src={coverImage.url}
                  alt="Cover preview"
                  className="blog-editor-cover-img"
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => setCoverImage({ url: '', publicId: '' })}
                  className="blog-editor-cover-remove"
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                htmlFor="cover-upload-input"
                className="cover-image-upload-zone"
              >
                <div className="upload-zone-content">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span className="upload-text">
                    {isUploadingCover ? 'Uploading Cover Image...' : 'Upload Cover Image'}
                  </span>
                </div>
              </label>
            )}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '28px' }}>
          <label className="form-label" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', color: '#78716c', textTransform: 'uppercase' }}>Editorial Content</label>

          <div className="editorial-container">
            {editor && (
              <div className="tiptap-toolbar">
                <div className="toolbar-group">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`tiptap-btn font-serif ${editor.isActive('bold') ? 'active' : ''}`}
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`tiptap-btn font-serif ${editor.isActive('italic') ? 'active' : ''}`}
                    style={{ fontStyle: 'italic' }}
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`tiptap-btn font-serif ${editor.isActive('underline') ? 'active' : ''}`}
                    style={{ textDecoration: 'underline' }}
                    title="Underline"
                  >
                    U
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`tiptap-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`tiptap-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`tiptap-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
                    title="Heading 3"
                  >
                    H3
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`tiptap-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                    title="Bullet List"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`tiptap-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
                    title="Numbered List"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`tiptap-btn font-serif ${editor.isActive('blockquote') ? 'active' : ''}`}
                    title="Blockquote"
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                  >
                    ”
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    onClick={setLink}
                    className={`tiptap-btn ${editor.isActive('link') ? 'active' : ''}`}
                    title="Link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerMediaUpload('image')}
                    className={`tiptap-btn ${editor.isActive('image') ? 'active' : ''}`}
                    title="Upload Image"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerMediaUpload('pdf')}
                    className="tiptap-btn"
                    title="Upload PDF"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="tiptap-btn"
                    title="Undo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="tiptap-btn"
                    title="Redo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
                  </button>
                </div>
              </div>
            )}
            <EditorContent editor={editor} className="tiptap-editor" />
          </div>
        </div>

        <div className="form-group blog-editor-margin-top">
          <label className="form-label" style={{ fontWeight: 600, color: '#1c1917' }}>Author Name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="form-input"
            placeholder="e.g. Shubhangi"
            style={{ borderRadius: '8px', border: '1px solid #eae5e1' }}
          />
        </div>

        <div className="blog-editor-footer">
          <div className="blog-editor-status-wrap">
            <span className="form-label blog-editor-status-label" style={{ margin: 0, fontWeight: 600 }}>Status:</span>
            <button
              type="button"
              onClick={() => setStatus('draft')}
              className={`btn blog-editor-status-btn ${status === 'draft' ? 'primary-btn' : 'btn-secondary'}`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus('published')}
              className={`btn blog-editor-status-btn ${status === 'published' ? 'primary-btn' : 'btn-secondary'}`}
            >
              Publish
            </button>
          </div>

          <button
            type="submit"
            className="btn primary-btn blog-editor-submit-btn"
            disabled={loading}
          >
            {loading ? 'Saving Post...' : 'Save Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
