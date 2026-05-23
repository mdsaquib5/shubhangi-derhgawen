"use client";

import { useState } from "react";
import Nav from "../shared/Nav";
import Cta from "../shared/Cta";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from "../shared/Logo";
import { usePathname } from "next/navigation";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <header>
            <div className="container">
                <div className="header-main">
                    <Logo />

                    <Nav isOpen={isOpen} onClose={() => setIsOpen(false)} />

                    <div className="header-cta-wrapper">
                        <Cta />
                    </div>

                    <button
                        className={`menu-toggle ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        <HiMenuAlt3 />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;