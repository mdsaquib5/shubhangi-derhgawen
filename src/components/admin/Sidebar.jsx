'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/leads', label: 'Leads & Pitches' },
    { href: '/admin/blogs', label: 'Blogs Manager' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Link href="/" style={{ textDecoration: 'none', color: '#fff' }}>
          Portfolio <span style={{ color: '#ffa945' }}>CMS</span>
        </Link>
      </div>
      
      <nav className="admin-sidebar-menu">
        {links.map((link) => {
          const isActive =
            link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #334155' }}>
        <Link
          href="/"
          className="admin-sidebar-link"
          style={{ fontSize: '13px' }}
        >
          ← Return to Public Site
        </Link>
      </div>
    </aside>
  );
}
