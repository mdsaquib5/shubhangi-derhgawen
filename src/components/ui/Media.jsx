'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Media = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { id: 1, src: '/covered-1.webp' },
        { id: 2, src: '/covered-1.webp' },
        { id: 3, src: '/covered-1.webp' },
        { id: 4, src: '/covered-1.webp' },
        { id: 5, src: '/covered-1.webp' },
        { id: 6, src: '/covered-1.webp' },
        { id: 7, src: '/covered-1.webp' },
        { id: 8, src: '/covered-1.webp' },
        { id: 9, src: '/covered-1.webp' },
        { id: 10, src: '/covered-1.webp' },
    ];

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, nextImage, prevImage]);

    return (
        <section className="media-bg">
            <div className='container'>
                <div className="media-main">
                    <div className='gallery-1'>
                        {images.slice(0, 6).map((img, idx) => (
                            <motion.div
                                key={img.id}
                                className="media-item"
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => openLightbox(idx)}
                            >
                                <Image src={img.src} alt={`Media ${img.id}`} width={640} height={360} />
                                <div className="media-overlay">
                                    <span>View Story</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className='signature'>Stories that we cover from ground !</div>
                </div>
                <div className='gallery-2'>
                    {images.slice(6, 10).map((img, idx) => (
                        <motion.div
                            key={img.id}
                            className="media-item"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onClick={() => openLightbox(idx + 6)}
                        >
                            <Image src={img.src} alt={`Media ${img.id}`} width={640} height={360} />
                            <div className="media-overlay">
                                <span>View Story</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.button
                            className="lightbox-close"
                            onClick={closeLightbox}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiX />
                        </motion.button>

                        <button
                            className="lightbox-nav prev"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <FiChevronLeft />
                        </button>

                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className="lightbox-image-container"
                                >
                                    <Image
                                        src={images[currentIndex].src}
                                        alt="Gallery Image"
                                        width={1200}
                                        height={800}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            className="lightbox-nav next"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <FiChevronRight />
                        </button>

                        <div className="lightbox-thumbnails">
                            {images.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={`thumb-item ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                >
                                    <Image src={img.src} alt="thumbnail" width={60} height={60} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Media;