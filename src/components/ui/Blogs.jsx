import { SiGooglenews } from "react-icons/si";
import BlogCard from "../shared/BlogCard";

const Blogs = () => {
    const blogs = [
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.webp",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.webp",
            authLink: "/",
            blogLink: "/"
        },
    ]
    return (
        <section>
            <div className="container">
                <div className="section-title">
                    <div className="title-icon"><SiGooglenews /> Breaking News & Reports</div>
                    <div className="about-heading">Stories Beyond Headlines</div>
                </div>
                <div className="blogs-grid">
                    {blogs.map((item, index) => (
                        <BlogCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blogs;