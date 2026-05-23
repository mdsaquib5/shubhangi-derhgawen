import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Blog from '@/models/Blog';
import StatsCard from '@/components/admin/StatsCard';
import LeadRow from '@/components/admin/LeadRow';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  await connectDB();

  const [
    totalLeads,
    newLeads,
    approvedLeads,
    totalBlogs,
    publishedBlogs,
    recentLeads,
    recentBlogs,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'new' }),
    Lead.countDocuments({ status: 'approved' }),
    Blog.countDocuments(),
    Blog.countDocuments({ status: 'published' }),
    Lead.find().sort({ submittedAt: -1 }).limit(5),
    Blog.find().sort({ createdAt: -1 }).limit(3),
  ]);

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
          Welcome back, Admin
        </h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
          Here is what's happening with your portfolio website today.
        </p>
      </div>

      <div className="stats-grid">
        <StatsCard label="Total Leads/Pitches" value={totalLeads} />
        <StatsCard label="New Pitches" value={newLeads} />
        <StatsCard label="Approved Pitches" value={approvedLeads} />
        <StatsCard label="Total Blogs" value={totalBlogs} />
        <StatsCard label="Published Blogs" value={publishedBlogs} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '30px' }}>
        {/* Recent Pitches */}
        <div className="cms-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
              Recent Collaboration Pitches
            </h2>
            <Link
              href="/admin/leads"
              style={{ color: '#f820a3', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}
            >
              View All →
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
              No pitches received yet.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Brand & Contact</th>
                    <th>Budget</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <LeadRow key={lead._id.toString()} lead={JSON.parse(JSON.stringify(lead))} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Blogs */}
        <div className="cms-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
              Recent Blog Posts
            </h2>
            <Link
              href="/admin/blogs"
              style={{ color: '#f820a3', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}
            >
              Manage →
            </Link>
          </div>

          {recentBlogs.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
              No blog posts created yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentBlogs.map((blog) => {
                const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                return (
                  <div
                    key={blog._id.toString()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '6px',
                        background: blog.coverImage?.url ? `url(${blog.coverImage.url}) center/cover no-repeat` : 'linear-gradient(135deg, #ffa945 0%, #f820a3 100%)',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <h3
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: '0 0 4px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: '#1e293b',
                        }}
                      >
                        {blog.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#64748b' }}>
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span className={`status-badge ${blog.status}`} style={{ padding: '0px 6px', fontSize: '10px' }}>
                          {blog.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
