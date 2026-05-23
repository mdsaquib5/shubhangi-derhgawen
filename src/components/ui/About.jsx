import Image from "next/image";
import { SiGooglenews } from "react-icons/si";

const About = () => {
    return (
        <section id="about">
            <div className="container">
                <div className="about-main">
                    <div className="about-content">
                        <div className="section-title">
                            <div className="title-icon"><SiGooglenews /> About Me</div>
                            <div className="about-heading">Voice Behind The Stories</div>
                        </div>
                        <p>Bringing clarity to current events through honest reporting and engaging media storytelling.
                            Dedicated to informing audiences with authenticity, passion, and purpose.</p>
                        <div className="story-slider">
                            <div className="story-img">
                                <Image src="/about/story.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/about/story-2.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/about/story-4.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/about/story-3.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/about/story-5.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/about/story-6.webp" alt="story" width={640} height={800} priority />
                            </div>
                        </div>
                    </div>
                    <div className="about-img">
                        <Image src="/about/rabish.webp" alt="main-story" width={640} height={640} priority />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;