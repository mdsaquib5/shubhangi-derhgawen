"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Cta from "./Cta";
import { IoClose } from "react-icons/io5";
import Logo from "./Logo";

const Nav = ({ isOpen, onClose }) => {
    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                bounce: 0.6,
                duration: 0.8
            }
        }
    };

    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Trending", href: "#trending" },
        { name: "News", href: "#news" },
        { name: "Stories", href: "#stories" },
        { name: "Reels", href: "#reels" },
        { name: "Articles", href: "/blog" },
        { name: "Brand Collaborations", href: "/collaborate" },
    ];

    return (
        <div className="menu">
            <nav className="desktop-nav">
                <ul>
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="mobile-menu-overlay"
                        />
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="mobile-menu-drawer"
                        >
                            <button className="close-btn" onClick={onClose}>
                                <IoClose size={26} />
                            </button>
                            <nav className="mobile-menu-nav">
                                <ul>
                                    {links.map((link, i) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.1, type: "spring", bounce: 0.5 }}
                                        >
                                            <Link href={link.href} onClick={onClose}>
                                                {link.name}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="drawer-cta">
                                    <Cta />
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Nav;