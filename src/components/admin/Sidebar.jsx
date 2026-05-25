'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../shared/Logo';
import { FiLayout, FiInbox, FiFileText, FiArrowLeft } from 'react-icons/fi';

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/admin', label: 'Dashboard', icon: FiLayout },
        { href: '/admin/leads', label: 'Leads & Pitches', icon: FiInbox },
        { href: '/admin/blogs', label: 'Blogs Manager', icon: FiFileText },
    ];

    return (
        <aside className="admin-sidebar">
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
    );
}
