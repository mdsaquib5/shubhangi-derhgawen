import About from "@/components/ui/About";
import Hero from "@/components/ui/Hero";
import Comments from "@/components/ui/Comments";
import Profiles from "@/components/ui/News";
import Media from "@/components/ui/Media";

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Comments />
            <Profiles />
            <Media />
        </>
    );
}