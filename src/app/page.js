import About from "@/components/ui/About";
import Hero from "@/components/ui/Hero";
import Comments from "@/components/ui/Comments";
import Profiles from "@/components/ui/News";
import Media from "@/components/ui/Media";
import Brands from "@/components/ui/Brands";
import Blogs from "@/components/ui/Blogs";
import Instagram from "@/components/ui/Instagram";

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Comments />
            <Profiles />
            <Media />
            <Instagram />
            <Blogs />
            <Brands />
        </>
    );
}