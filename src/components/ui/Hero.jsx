"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const roles = [
    "Journalist",
    "TEDx Speaker",
    "Ground Reporter"
];

const Hero = () => {

    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const target = 173;
        const duration = 3000;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const currentCount = Math.min(Math.floor((progress / duration) * target), target);

            setCount(currentCount);

            if (currentCount < target) {
                requestAnimationFrame(animate);
            }
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    useEffect(() => {
        if (isDeleting && subIndex === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        if (!isDeleting && subIndex === roles[index].length) {
            const timeout = setTimeout(() => setIsDeleting(true), 1500);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, index, roles]);

    return (
        <div className="hero-bg">
            <div className="container">
                <div className="hero-main">
                    <div className="hero-content">
                        <div className="hero-heading">Hey, I'm <span>Shubhangi </span>!</div>
                        <div className="profile">I am a <span className="highlight-text">{roles[index].substring(0, subIndex)}<span className="typing-cursor"></span></span></div>
                        <p>Reporting Beyond The Headlines</p>
                        <Link href="#news" className="btn primary-btn">See my Journalism</Link>
                    </div>
                    <div className="hero-img">
                        <Image src="/girl.png" alt="hero-img" width={204} height={489} priority />
                        <div className="followers">{count}k<span>Followers</span></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Hero;