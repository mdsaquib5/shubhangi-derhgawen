import Image from "next/image";
import { SiGooglenews } from "react-icons/si";

const About = () => {

    const storyImages = [
        "/story.jpg",
        "/story-2.jpg",
        "/story-4.jpg",
        "/story-3.jpg",
        "/story-5.jpg",
        "/story-6.jpg"
    ];

    return (
        <section>
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
                                <Image src="/story.jpg" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-2.jpg" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-4.jpg" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-3.jpg" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-5.jpg" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-6.jpg" alt="story" width={640} height={800} priority />
                            </div>
                        </div>
                    </div>
                    <div className="about-img">
                        <Image src="/rabish.jpg" alt="main-story" width={640} height={640} priority />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;