import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

export const metadata = {
  title: 'Admin Dashboard - Portfolio CMS',
  description: 'Manage collaboration leads and blog articles.',
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
}
