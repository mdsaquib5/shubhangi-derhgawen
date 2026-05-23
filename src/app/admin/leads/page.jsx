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
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
          Collaboration Pitches
        </h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
          Review brand inquiries, assess automated quality scores, and filter collaboration leads.
        </p>
      </div>

      <div className="admin-tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === 'all' ? '/admin/leads' : `/admin/leads?status=${tab.key}`}
            className={`admin-tab ${currentTab === tab.key ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {tab.label} ({leads.filter(l => tab.key === 'all' || l.status === tab.key).length})
          </Link>
        ))}
      </div>

      <div className="cms-card" style={{ padding: '24px' }}>
        {leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            No pitches found matching status: <strong style={{ color: '#f820a3' }}>{currentTab}</strong>
          </div>
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
