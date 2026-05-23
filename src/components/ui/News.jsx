import Image from "next/image";

const instagramPosts = [
    {
        post: "/posts/post-1.webp",
        alt: "post-1"
    },
    {
        post: "/posts/post-6.webp",
        alt: "post-2"
    },
    {
        post: "/posts/post-3.webp",
        alt: "post-3"
    },
    {
        post: "/posts/post-4.webp",
        alt: "post-4"
    },
    {
        post: "/posts/post-5.webp",
        alt: "post-5"
    },
    {
        post: "/posts/post-8.webp",
        alt: "post-6"
    }
]

const News = () => {
    return (
        <section className="news-bg" id="news">
            <div className="container">
                <div className="news-title-bg">Instagram News</div>
                <div className="instagram-posts-wrapper">
                    {instagramPosts.map((instagramPost, index) => (
                        <div className="instagram-post" key={index}>
                            <Image src={instagramPost.post} alt={instagramPost.alt} width={640} height={1014} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default News;