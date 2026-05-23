'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadActions({ lead }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [adminNote, setAdminNote] = useState(lead.adminNote || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (newStatus) => {
    setLoading(true);
    setMessage('');

    try {
      const payload = { adminNote };
      if (newStatus) {
        payload.status = newStatus;
      }

      const res = await fetch(`/api/leads/${lead._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update lead');
      }

      if (newStatus) {
        setStatus(newStatus);
      }
      setMessage('Pitch details updated successfully!');
      router.refresh();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Are you sure you want to permanently delete this lead inquiry?\nThis action is irreversible.'
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`/api/leads/${lead._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete lead');
      }

      router.push('/admin/leads');
      router.refresh();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {message && (
        <div
          style={{
            background: message.startsWith('Error') ? '#fef2f2' : '#f0fdf4',
            border: message.startsWith('Error') ? '1px solid #fca5a5' : '1px solid #bbf7d0',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            color: message.startsWith('Error') ? '#991b1b' : '#16a34a',
            fontWeight: '500',
          }}
        >
          {message}
        </div>
      )}

      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" style={{ fontWeight: '600', color: '#1e293b' }}>
          Internal Admin Notes
        </label>
        <textarea
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          className="form-input"
          placeholder="Add correspondence history, follow-up logs, or custom notes..."
          rows={4}
          style={{ resize: 'vertical', fontFamily: 'inherit' }}
        />
        <button
          type="button"
          onClick={() => handleUpdate()}
          disabled={loading}
          className="btn primary-btn"
          style={{ fontSize: '13px', height: '36px', paddingInline: '16px', marginTop: '10px' }}
        >
          Save Internal Notes
        </button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: 0 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Decision:</span>
          
          <button
            type="button"
            onClick={() => handleUpdate('approved')}
            disabled={loading}
            className={`btn ${status === 'approved' ? 'primary-btn' : 'btn-secondary'}`}
            style={{
              fontSize: '13px',
              height: '36px',
              paddingInline: '16px',
              background: status === 'approved' ? '#16a34a' : undefined,
              borderColor: status === 'approved' ? '#16a34a' : undefined,
              color: status === 'approved' ? '#fff' : undefined,
            }}
          >
            Approve Pitch
          </button>
          
          <button
            type="button"
            onClick={() => handleUpdate('declined')}
            disabled={loading}
            className={`btn ${status === 'declined' ? 'primary-btn' : 'btn-secondary'}`}
            style={{
              fontSize: '13px',
              height: '36px',
              paddingInline: '16px',
              background: status === 'declined' ? '#dc2626' : undefined,
              borderColor: status === 'declined' ? '#dc2626' : undefined,
              color: status === 'declined' ? '#fff' : undefined,
            }}
          >
            Decline Pitch
          </button>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="btn"
          style={{
            fontSize: '13px',
            height: '36px',
            paddingInline: '16px',
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Delete Lead
        </button>
      </div>
    </div>
  );
}
