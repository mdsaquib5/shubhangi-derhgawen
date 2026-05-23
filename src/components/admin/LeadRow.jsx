import React from 'react';
import Link from 'next/link';

export default function LeadRow({ lead }) {
  const formattedDate = new Date(lead.submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  let scoreClass = 'low';
  if (lead.score >= 70) {
    scoreClass = 'high';
  } else if (lead.score >= 45) {
    scoreClass = 'mid';
  }

  return (
    <tr>
      <td style={{ fontWeight: '700', color: '#1e293b', letterSpacing: '0.5px' }}>
        {lead.referenceId}
      </td>
      <td>
        <div style={{ fontWeight: '600' }}>{lead.brand}</div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          {lead.contactName} ({lead.contactRole})
        </div>
      </td>
      <td style={{ fontWeight: '500', color: '#f820a3' }}>{lead.budget}</td>
      <td>
        <div className={`score-badge ${scoreClass}`} title="Calculated lead quality score (0-100)">
          {lead.score}
        </div>
      </td>
      <td>
        <span className={`status-badge ${lead.status}`}>{lead.status}</span>
      </td>
      <td>{formattedDate}</td>
      <td>
        <Link
          href={`/admin/leads/${lead._id}`}
          className="btn primary-btn"
          style={{ fontSize: '13px', height: '30px', paddingInline: '12px', textDecoration: 'none', display: 'inline-flex' }}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
