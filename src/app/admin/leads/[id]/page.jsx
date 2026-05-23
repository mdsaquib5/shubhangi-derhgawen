import React from 'react';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import LeadActions from '@/components/admin/LeadActions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  const hasNicheMatch = (lead.niches || []).some((n) =>
    ['Education', 'Tech', 'Journalism', 'Productivity'].some(
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
            Pitch Details: {lead.referenceId}
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
            Received on {submittedDate}
          </p>
        </div>
        <Link href="/admin/leads" className="btn btn-secondary" style={{ textDecoration: 'none', fontSize: '14px', height: '36px' }}>
          ← Back to Leads
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div className="cms-card">
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Brand Inquiry Details</span>
            <span className={`status-badge ${lead.status}`}>{lead.status}</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Brand Name</strong>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{lead.brand}</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Website URL</strong>
              <a href={lead.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#f820a3', fontWeight: '500', textDecoration: 'none' }}>
                {lead.website}
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Contact Name</strong>
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#0f172a' }}>{lead.contactName}</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Role / Title</strong>
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#0f172a' }}>{lead.contactRole}</span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Campaign Budget</strong>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#f820a3' }}>{lead.budget}</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Target Timeline</strong>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#ffa945' }}>{lead.timeline}</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Collaboration Formats</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {lead.collabTypes.map((type) => (
                <span key={type} className="chip selected" style={{ fontSize: '12px', padding: '6px 14px' }}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Niches & Industries</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {lead.niches.map((niche) => (
                <span key={niche} className="chip" style={{ fontSize: '12px', padding: '6px 14px', background: '#e0f2fe', color: '#0369a1', borderColor: 'transparent', cursor: 'default' }}>
                  {niche}
                </span>
              ))}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

          <div style={{ marginBottom: '10px' }}>
            <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Pitch & Campaign Goals</strong>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {lead.goals}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

          <LeadActions lead={JSON.parse(JSON.stringify(lead))} />
        </div>

        <div>
          <div className="cms-card" style={{ position: 'sticky', top: '120px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px', textAlign: 'center' }}>
              Priority Score Breakdown
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: lead.score >= 70 ? '#d1fae5' : lead.score >= 45 ? '#fef3c7' : '#fee2e2',
                  color: lead.score >= 70 ? '#065f46' : lead.score >= 45 ? '#92400e' : '#991b1b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: '800',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                  marginBottom: '10px',
                }}
              >
                {lead.score}
              </div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                Priority Score
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#334155' }}>Budget Fit</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Value: "{lead.budget}"</span>
                </div>
                <span style={{ fontWeight: '700', color: budgetPoints >= 28 ? '#16a34a' : '#64748b' }}>
                  +{budgetPoints}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#334155' }}>Timeline Fit</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Value: "{lead.timeline}"</span>
                </div>
                <span style={{ fontWeight: '700', color: timelinePoints >= 22 ? '#16a34a' : '#64748b' }}>
                  +{timelinePoints}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#334155' }}>Niche Match</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Matches premium list?</span>
                </div>
                <span style={{ fontWeight: '700', color: nichePoints === 20 ? '#16a34a' : '#64748b' }}>
                  +{nichePoints}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#334155' }}>Goals Description</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{goalsLength} characters</span>
                </div>
                <span style={{ fontWeight: '700', color: goalsPoints >= 15 ? '#16a34a' : '#64748b' }}>
                  +{goalsPoints}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '30px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
              <strong>Priority calculation rule:</strong> Scores range from 0 to 100 based on budget sizing, timeline speed, niche alignment, and campaign pitch length. Higher scores indicate premium priority.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
