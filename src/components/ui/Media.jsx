import Image from 'next/image';

const Media = () => {
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

    return (
        <section className="media-bg">
            <div className='container'>
                <div className="media-main">
                    <div className='gallery-1'>
                        {images.slice(0, 6).map((img) => (
                            <div key={img.id} className="media-item">
                                <Image src={img.src} alt={`Media ${img.id}`} width={400} height={500} />
                            </div>
                        ))}
                    </div>
                    <div className='signature'>Stories that we cover from ground !</div>
                </div>
                <div className='gallery-2'>
                    {images.slice(6, 10).map((img) => (
                        <div key={img.id} className="media-item">
                            <Image src={img.src} alt={`Media ${img.id}`} width={400} height={500} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Media;
