"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
import Image from 'next/image';

const ReelCard = ({ reel }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="reel-card">
            <div className="reel-img">
                <Image
                    src="/images/frame.webp"
                    alt="frame"
                    width={476}
                    height={942}
                    className="frame-img"
                />

                {isPlaying ? (
                    <video
                        src={reel.video}
                        autoPlay
                        controls
                        className="reel-video"
                    />
                ) : (
                    <div className="reel-thumb-container" onClick={() => setIsPlaying(true)}>
                        <Image
                            src={reel.img}
                            alt={`Reel ${reel.id}`}
                            width={640}
                            height={640}
                            className="thumb-img"
                        />
                        <div className="reel-overlay">
                            <div className="play-btn"><FaPlay /></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Instagram = () => {
    const reels = [
        { id: 1, img: "/about/rabish.webp", video: "/reels/video1.mp4" },
        { id: 2, img: "/about/rabish.webp", video: "/reels/video2.mp4" },
        { id: 3, img: "/about/rabish.webp", video: "/reels/video1.mp4" },
        { id: 4, img: "/about/rabish.webp", video: "/reels/video2.mp4" },
        { id: 5, img: "/about/rabish.webp", video: "/reels/video1.mp4" },
        { id: 6, img: "/about/rabish.webp", video: "/reels/video2.mp4" },
    ];

    return (
        <section className="instagram-reels" id="reels">
            <div className="container">
                <div className="reels-header">
                    <div className="reels-nav">
                        <button className="reel-prev"><HiOutlineArrowLongLeft /></button>
                        <button className="reel-next"><HiOutlineArrowLongRight /></button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.reel-prev',
                        nextEl: '.reel-next',
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4.5 },
                    }}
                    className="reels-swiper"
                >
                    {reels.map((reel) => (
                        <SwiperSlide key={reel.id}>
                            <ReelCard reel={reel} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Instagram;