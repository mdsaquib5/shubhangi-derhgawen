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
      <td className="lead-row-ref">
        {lead.referenceId}
      </td>
      <td>
        <div className="lead-row-brand">{lead.brand}</div>
        <div className="lead-row-contact">
          {lead.contactName} ({lead.contactRole})
        </div>
      </td>
      <td className="lead-row-budget">{lead.budget}</td>
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
          className="btn primary-btn lead-row-btn"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
