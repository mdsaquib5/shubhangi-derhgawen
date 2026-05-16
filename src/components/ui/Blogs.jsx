import { SiGooglenews } from "react-icons/si";
import BlogCard from "../shared/BlogCard";

const Blogs = () => {
    const blogs = [
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
            authLink: "/",
            blogLink: "/"
        },
        {
            img: "/rabish.jpg",
            title: "How to choose the laptop",
            desc: "Choosing the right laptop for programming can be a tough process.",
            author: "Shubhangi Derhgawen",
            date: "October 16, 2023",
            authorImg: "/ig.jpg",
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