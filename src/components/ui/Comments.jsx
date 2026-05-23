const comments = [
    "Honestly, your voice and screen presence are next level 🔥📺 Keep shining with such impactful journalism ✨👏",
    "The way you covered the story was so engaging 📰💫 Truly felt like watching a professional news channel 🎙️🔥",
    "Loved your storytelling and live coverage 🔥🖤 You bring real energy and authenticity to journalism 🎙️💯",
    "Your communication style is so clear and professional 📺✨ Really impressed with your reporting confidence 👏🔥",
    "Outstanding work on the latest coverage 📰❤️ Your media presence and delivery are truly inspiring 💫🎤",
    "Every report you present feels meaningful and impactful 💯🖤 Keep growing and shining in journalism 🚀✨",
    "Such a confident and elegant news presentation 🎙️🔥 Your reporting style keeps the audience connected 📺❤️",
    "Your journalism content always feels professional and authentic 📰✨ Truly one of the best reporting styles 💫👏",
    "Brilliant coverage and amazing camera confidence 📸🔥 You were looking like a prime-time news anchor 🎤🖤",
    "Loved the way you explained everything so smoothly 💯✨ Your reporting skills are improving beautifully 🎙️❤️"
]

const Comments = () => {
    return (
        <section className="comments-bg" id="trending">
            <div className="container">
                <div className="comments">
                    {comments.map((comment, index) => (
                        <div className="comment-box" key={index}>
                            <p>{comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Comments;