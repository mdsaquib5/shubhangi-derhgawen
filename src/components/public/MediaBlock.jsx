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
        <div className="media-block-section">
          <h3 className="media-block-heading">Gallery</h3>
          <div className="media-grid">
            {images.map((item, idx) => (
              <div key={idx} className="media-block-item media-block-item-gallery">
                <img
                  src={item.url}
                  alt={item.label || 'Gallery Image'}
                  className="media-block-image"
                />
                {item.label && <div className="media-block-label">{item.label}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos List */}
      {videos.length > 0 && (
        <div className="media-block-section">
          <h3 className="media-block-heading">Videos</h3>
          <div className="media-block-list">
            {videos.map((item, idx) => (
              <div key={idx} className="media-block-item media-block-item-video">
                <video src={item.url} controls className="media-block-video" />
                {item.label && (
                  <div className="media-block-label media-block-label-video">
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
        <div className="media-block-section">
          <h3 className="media-block-heading">Audio Files</h3>
          <div className="media-block-audio-list">
            {audios.map((item, idx) => (
              <div key={idx} className="media-block-item media-block-item-audio">
                <div className="media-block-audio-title">
                  {item.label || 'Audio track'}
                </div>
                <audio src={item.url} controls className="media-block-video" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Viewers */}
      {pdfs.length > 0 && (
        <div className="media-block-section">
          <h3 className="media-block-heading">Documents (PDF)</h3>
          <div className="media-block-list">
            {pdfs.map((item, idx) => (
              <div key={idx} className="media-block-item media-block-item-pdf">
                <div className="media-block-pdf-header">
                  <span className="media-block-pdf-title">{item.label || 'PDF Document'}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary-btn media-block-pdf-btn"
                  >
                    Open PDF in New Tab
                  </a>
                </div>
                <div className="media-block-pdf-frame-container">
                  <iframe
                    src={`${item.url}#toolbar=1`}
                    className="media-block-pdf-frame"
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
          <h3 className="media-block-heading">Downloads</h3>
          <ul className="media-block-downloads">
            {otherFiles.map((item, idx) => (
              <li key={idx} className="media-block-download-item">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-block-download-link"
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
