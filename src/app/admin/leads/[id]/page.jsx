import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import LeadActions from '@/components/admin/LeadActions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export const revalidate = 0;

export default async function AdminLeadDetailPage({ params }) {
  await connectDB();
  const { id } = await params;

  let lead;
  try {
    lead = await Lead.findById(id);
  } catch (err) {
    return notFound();
  }

  if (!lead) {
    return notFound();
  }

  const b = lead.budget || '';
  let budgetPoints = 15;
  if (b.includes('Under ₹10K')) budgetPoints = 5;
  else if (b.includes('10K') && b.includes('50K')) budgetPoints = 12;
  else if (b.includes('50K') && b.includes('1.5L')) budgetPoints = 28;
  else if (b.includes('1.5L')) budgetPoints = 35;
  else if (b.includes('Negotiable')) budgetPoints = 20;

  const t = lead.timeline || '';
  let timelinePoints = 15;
  if (t.includes('< 1 week') || t.includes('<1week') || t.includes('1 week')) timelinePoints = 8;
  else if (t.includes('2–4 weeks') || t.includes('2-4 weeks') || t.includes('4 weeks')) timelinePoints = 15;
  else if (t.includes('1–2 months') || t.includes('1-2 months') || t.includes('months')) timelinePoints = 25;
  else if (t.includes('Flexible')) timelinePoints = 22;

  const goalsLength = lead.goals ? lead.goals.length : 0;
  let goalsPoints = 10;
  if (goalsLength > 100) goalsPoints = 20;
  else if (goalsLength > 50) goalsPoints = 15;

  const premiumNiches = [
    'Politics & Governance',
    'Social Issues & Human Rights',
    'Science & Environment',
    'Business & Economics',
    'Journalism & Media',
    'Education & Tech',
  ];
  const hasNicheMatch = (lead.niches || []).some((n) =>
    premiumNiches.some(
      (match) => n.toLowerCase().includes(match.toLowerCase())
    )
  );
  const nichePoints = hasNicheMatch ? 20 : 10;

  const submittedDate = new Date(lead.submittedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div>
      <div className="admin-lead-header">
        <div>
          <h1 className="admin-lead-title">
            Pitch Details: {lead.referenceId}
          </h1>
          <p className="admin-lead-subtitle">
            Received on {submittedDate}
          </p>
        </div>
        <Link href="/admin/leads" className="btn btn-secondary admin-lead-back-btn">
          <FiArrowLeft size={16} /> Back to Leads
        </Link>
      </div>

      <div className="admin-lead-grid">
        <div className="cms-card">
          <h2 className="admin-lead-card-title">
            <span>Brand Inquiry Details</span>
            <span className={`status-badge ${lead.status}`}>{lead.status}</span>
          </h2>

          <div className="admin-lead-info-grid">
            <div>
              <strong className="admin-lead-label">Brand Name</strong>
              <span className="admin-lead-value-strong">{lead.brand}</span>
            </div>
            <div>
              <strong className="admin-lead-label">Website URL</strong>
              <a href={lead.website} target="_blank" rel="noopener noreferrer" className="admin-lead-link">
                {lead.website}
              </a>
            </div>
          </div>

          <div className="admin-lead-info-grid">
            <div>
              <strong className="admin-lead-label">Contact Name</strong>
              <span className="admin-lead-value">{lead.contactName}</span>
            </div>
            <div>
              <strong className="admin-lead-label">Role / Title</strong>
              <span className="admin-lead-value">{lead.contactRole}</span>
            </div>
            <div>
              <strong className="admin-lead-label">Phone Number</strong>
              <span className="admin-lead-value">{lead.contactPhone || 'N/A'}</span>
            </div>
          </div>

          <hr className="admin-lead-hr" />

          <div className="admin-lead-info-grid">
            <div>
              <strong className="admin-lead-label">Campaign Budget</strong>
              <span className="admin-lead-budget">{lead.budget}</span>
            </div>
            <div>
              <strong className="admin-lead-label">Target Timeline</strong>
              <span className="admin-lead-timeline">{lead.timeline}</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <strong className="admin-lead-label-mb8">Collaboration Formats</strong>
            <div className="admin-lead-chip-container">
              {lead.collabTypes.map((type) => (
                <span key={type} className="chip selected admin-lead-chip">
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <strong className="admin-lead-label-mb8">Niches & Industries</strong>
            <div className="admin-lead-chip-container">
              {lead.niches.map((niche) => (
                <span key={niche} className="chip admin-lead-chip-niche">
                  {niche}
                </span>
              ))}
            </div>
          </div>

          <hr className="admin-lead-hr" />

          <div style={{ marginBottom: '10px' }}>
            <strong className="admin-lead-label-mb8">Pitch & Campaign Goals</strong>
            <div className="admin-lead-goals">
              {lead.goals}
            </div>
          </div>

          <hr className="admin-lead-hr" />

          <LeadActions lead={JSON.parse(JSON.stringify(lead))} />
        </div>

        <div>
          <div className="cms-card admin-lead-sticky-card">
            <h2 className="admin-lead-score-title">
              Priority Score Breakdown
            </h2>

            <div className="admin-lead-score-wrap">
              <div
                className="admin-lead-score-circle"
                style={{
                  background: lead.score >= 70 ? '#d1fae5' : lead.score >= 45 ? '#fef3c7' : '#fee2e2',
                  color: lead.score >= 70 ? '#065f46' : lead.score >= 45 ? '#92400e' : '#991b1b',
                }}
              >
                {lead.score}
              </div>
              <span className="admin-lead-score-label">
                Priority Score
              </span>
            </div>

            <div className="admin-lead-points-list">
              <div className="admin-lead-points-item">
                <div>
                  <strong className="admin-lead-points-label">Budget Fit</strong>
                  <span className="admin-lead-points-desc">Value: "{lead.budget}"</span>
                </div>
                <span className="admin-lead-points-value" style={{ color: budgetPoints >= 28 ? '#16a34a' : '#64748b' }}>
                  +{budgetPoints}
                </span>
              </div>

              <div className="admin-lead-points-item">
                <div>
                  <strong className="admin-lead-points-label">Timeline Fit</strong>
                  <span className="admin-lead-points-desc">Value: "{lead.timeline}"</span>
                </div>
                <span className="admin-lead-points-value" style={{ color: timelinePoints >= 22 ? '#16a34a' : '#64748b' }}>
                  +{timelinePoints}
                </span>
              </div>

              <div className="admin-lead-points-item">
                <div>
                  <strong className="admin-lead-points-label">Niche Match</strong>
                  <span className="admin-lead-points-desc">Matches premium list?</span>
                </div>
                <span className="admin-lead-points-value" style={{ color: nichePoints === 20 ? '#16a34a' : '#64748b' }}>
                  +{nichePoints}
                </span>
              </div>

              <div className="admin-lead-points-item">
                <div>
                  <strong className="admin-lead-points-label">Goals Description</strong>
                  <span className="admin-lead-points-desc">{goalsLength} characters</span>
                </div>
                <span className="admin-lead-points-value" style={{ color: goalsPoints >= 15 ? '#16a34a' : '#64748b' }}>
                  +{goalsPoints}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}