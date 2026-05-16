"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import Image from 'next/image';
import { SiGooglenews } from 'react-icons/si';

const brandsData = [
    { alt: "Brand-1", img: "/brand-1.png" },
    { alt: "Brand-2", img: "/brand-2.png" },
    { alt: "Brand-1", img: "/brand-1.png" },
    { alt: "Brand-2", img: "/brand-2.png" },
    { alt: "Brand-1", img: "/brand-1.png" },
    { alt: "Brand-2", img: "/brand-2.png" },
    { alt: "Brand-1", img: "/brand-1.png" },
    { alt: "Brand-2", img: "/brand-2.png" },
    { alt: "Brand-1", img: "/brand-1.png" },
    { alt: "Brand-2", img: "/brand-2.png" },
];

const Brands = () => {
    // Common Configuration
    const commonConfig = {
        allowTouchMove: false,
        simulateTouch: false,
        slidesPerView: 1.5,
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        speed: 8000, // Adjusted speed for better brand visibility
        modules: [Autoplay, FreeMode],
        breakpoints: {
            1200: { slidesPerView: 6 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
        },
    };

    return (
        <section className="brand-bg">
            <div className="container">
                <div className="section-title">
                    <div className="title-icon"><SiGooglenews /> Brands Collaboration</div>
                    <div className="about-heading">Brands I've Worked With</div>
                </div>
                <div className="slider-brands">
                    <Swiper
                        {...commonConfig}
                        autoplay={{ delay: 0, disableOnInteraction: false }}
                        className="brand-swiper"
                    >
                        {[...brandsData, ...brandsData].map((item, index) => (
                            <SwiperSlide key={`row1-${index}`}>
                                <div className="brand-card">
                                    <Image src={item.img} alt={item.alt} width={127} height={140} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        {...commonConfig}
                        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
                        className="brand-swiper"
                    >
                        {[...brandsData, ...brandsData].map((item, index) => (
                            <SwiperSlide key={`row2-${index}`}>
                                <div className="brand-card">
                                    <Image src={item.img} alt={item.alt} width={127} height={140} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Brands;
