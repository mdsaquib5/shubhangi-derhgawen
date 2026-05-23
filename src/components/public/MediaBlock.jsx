import React from 'react';

export default function MediaBlock({ media }) {
  if (!media || media.length === 0) return null;

  const images = media.filter((m) => m.resourceType === 'image');
  
  const isAudioFormat = (format) => {
    const audioFormats = ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac', 'mpga'];
    return audioFormats.includes(format.toLowerCase());
  };

  const audios = media.filter(
    (m) => m.resourceType === 'video' && isAudioFormat(m.format)
  );

  const videos = media.filter(
    (m) => m.resourceType === 'video' && !isAudioFormat(m.format)
  );

  const pdfs = media.filter(
    (m) => m.resourceType === 'raw' && m.format.toLowerCase() === 'pdf'
  );

  const otherFiles = media.filter(
    (m) => m.resourceType === 'raw' && m.format.toLowerCase() !== 'pdf'
  );

  return (
    <div className="media-section">
      <h2 className="media-section-title">Attached Media & Resources</h2>

      {/* Images Grid */}
      {images.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>Gallery</h3>
          <div className="media-grid">
            {images.map((item, idx) => (
              <div key={idx} className="media-block-item" style={{ background: '#fff' }}>
                <img
                  src={item.url}
                  alt={item.label || 'Gallery Image'}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                />
                {item.label && <div className="media-block-label">{item.label}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos List */}
      {videos.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>Videos</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {videos.map((item, idx) => (
              <div key={idx} className="media-block-item" style={{ maxWidth: '640px', background: '#000' }}>
                <video src={item.url} controls style={{ width: '100%', display: 'block' }} />
                {item.label && (
                  <div className="media-block-label" style={{ background: '#fff', borderTop: '1px solid #f1f5f9' }}>
                    {item.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audios List */}
      {audios.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>Audio Files</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
            {audios.map((item, idx) => (
              <div key={idx} className="media-block-item" style={{ padding: '16px', background: '#fff' }}>
                <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '8px', color: '#334155' }}>
                  {item.label || 'Audio track'}
                </div>
                <audio src={item.url} controls style={{ width: '100%', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Viewers */}
      {pdfs.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>Documents (PDF)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {pdfs.map((item, idx) => (
              <div key={idx} className="media-block-item" style={{ padding: '20px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: '600', color: '#334155' }}>{item.label || 'PDF Document'}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary-btn"
                    style={{ fontSize: '14px', height: '36px', paddingInline: '16px', textDecoration: 'none' }}
                  >
                    Open PDF in New Tab
                  </a>
                </div>
                <div style={{ width: '100%', height: '500px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <iframe
                    src={`${item.url}#toolbar=1`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title={item.label || 'PDF Document'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Files */}
      {otherFiles.length > 0 && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e293b' }}>Downloads</h3>
          <ul style={{ paddingLeft: '20px' }}>
            {otherFiles.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#f820a3', fontWeight: '500' }}
                >
                  {item.label || `Attachment ${idx + 1}`} ({item.format.toUpperCase()})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
