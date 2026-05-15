import Image from "next/image";

const instagramPosts = [
    {
        post: "/post-1.jpg",
        alt: "post-1"
    },
    {
        post: "/post-6.jpg",
        alt: "post-2"
    },
    {
        post: "/post-3.jpg",
        alt: "post-3"
    },
    {
        post: "/post-4.jpg",
        alt: "post-4"
    },
    {
        post: "/post-5.jpg",
        alt: "post-5"
    },
    {
        post: "/post-8.jpg",
        alt: "post-6"
    }
]

const News = () => {
    return (
        <section className="news-bg">
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