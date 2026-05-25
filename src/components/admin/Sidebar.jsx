'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../shared/Logo';
import { FiLayout, FiInbox, FiFileText, FiArrowLeft } from 'react-icons/fi';
import { IoChevronBackOutline, IoChevronForward } from 'react-icons/io5';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        { href: '/admin', label: 'Dashboard', icon: FiLayout },
        { href: '/admin/leads', label: 'Leads & Pitches', icon: FiInbox },
        { href: '/admin/blogs', label: 'Blogs Manager', icon: FiFileText },
    ];

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? <IoChevronForward size={24} /> : <IoChevronBackOutline size={24} />}
                </button>
                <div className="admin-sidebar-logo">
                    <Logo />
                </div>

                <nav className="admin-sidebar-menu">
                    {links.map((link) => {
                        const isActive =
                            link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                            >
                                {Icon && <Icon size={18} />}
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <Link
                        href="/"
                        className="admin-sidebar-link sidebar-footer-link"
                    >
                        <FiArrowLeft size={18} />
                        <span>Return to Public Site</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
