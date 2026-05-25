import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import LeadRow from '@/components/admin/LeadRow';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminLeadsPage({ searchParams }) {
  await connectDB();
  const { status } = await searchParams;
  const currentTab = status || 'all';

  const filter = {};
  if (currentTab !== 'all') {
    filter.status = currentTab;
  }

  const leads = await Lead.find(filter).sort({ submittedAt: -1 });

  const tabs = [
    { key: 'all', label: 'All Pitches' },
    { key: 'new', label: 'New' },
    { key: 'approved', label: 'Approved' },
    { key: 'declined', label: 'Declined' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Collaboration Pitches
          </h1>
          <p className="admin-page-subtitle">
            Review brand inquiries, assess automated quality scores, and filter collaboration leads.
          </p>
        </div>
      </div>

      <div className="admin-tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === 'all' ? '/admin/leads' : `/admin/leads?status=${tab.key}`}
            className={`admin-tab admin-tab-link ${currentTab === tab.key ? 'active' : ''}`}
          >
            {tab.label} ({leads.filter(l => tab.key === 'all' || l.status === tab.key).length})
          </Link>
        ))}
      </div>

      <div className="cms-card admin-dashboard-card">
        {leads.length === 0 ? (
          <div className="admin-page-empty">
            No pitches found matching status: <strong className="admin-page-empty-strong">{currentTab}</strong>
          </div>
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
                {leads.map((lead) => (
                  <LeadRow key={lead._id.toString()} lead={JSON.parse(JSON.stringify(lead))} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
