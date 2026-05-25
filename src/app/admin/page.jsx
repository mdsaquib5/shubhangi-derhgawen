import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Blog from '@/models/Blog';
import StatsCard from '@/components/admin/StatsCard';
import LeadRow from '@/components/admin/LeadRow';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

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
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">
          Welcome back, Shubhangi !
        </h1>
      </div>

      <div className="stats-grid">
        <StatsCard label="Total Leads/Pitches" value={totalLeads} />
        <StatsCard label="New Pitches" value={newLeads} />
        <StatsCard label="Approved Pitches" value={approvedLeads} />
        <StatsCard label="Total Blogs" value={totalBlogs} />
        <StatsCard label="Published Blogs" value={publishedBlogs} />
      </div>

      <div className="admin-dashboard-grid">
        <div className="cms-card">
          <div className="admin-dashboard-card-header">
            <h2 className="admin-dashboard-card-title">
              Recent Collaboration Pitches
            </h2>
            <Link
              href="/admin/leads"
              className="admin-dashboard-card-link"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="admin-dashboard-empty">
              No pitches received yet.
            </p>
          ) : (
            <div className="admin-dashboard-table-wrap">
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
        <div className="cms-card">
          <div className="admin-dashboard-card-header">
            <h2 className="admin-dashboard-card-title">
              Recent Blog Posts
            </h2>
            <Link
              href="/admin/blogs"
              className="admin-dashboard-card-link"
            >
              Manage <FiArrowRight size={14} />
            </Link>
          </div>

          {recentBlogs.length === 0 ? (
            <p className="admin-dashboard-empty">
              No blog posts created yet.
            </p>
          ) : (
            <div className="admin-dashboard-blog-list">
              {recentBlogs.map((blog) => {
                const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                return (
                  <div
                    key={blog._id.toString()}
                    className="admin-dashboard-blog-item"
                  >
                    <div
                      className="admin-dashboard-blog-img"
                      style={{
                        background: blog.coverImage?.url ? `url(${blog.coverImage.url}) center/cover no-repeat` : 'linear-gradient(135deg, #ffa945 0%, #f820a3 100%)',
                      }}
                    />
                    <div className="admin-dashboard-blog-info">
                      <h3 className="admin-dashboard-blog-title">
                        {blog.title}
                      </h3>
                      <div className="admin-dashboard-blog-meta">
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span className={`status-badge ${blog.status} admin-dashboard-blog-status`}>
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
