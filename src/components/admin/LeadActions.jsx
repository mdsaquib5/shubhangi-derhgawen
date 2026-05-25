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
    <div className="lead-actions-container">
      {message && (
        <div
          className={`lead-actions-msg ${message.startsWith('Error') ? 'lead-actions-msg-error' : 'lead-actions-msg-success'}`}
        >
          {message}
        </div>
      )}

      <div className="form-group lead-actions-form-group">
        <label className="form-label lead-actions-label">
          Internal Admin Notes
        </label>
        <textarea
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          placeholder="Add correspondence history, follow-up logs, or custom notes..."
          rows={4}
          className="form-input lead-actions-textarea"
        />
        <button
          type="button"
          onClick={() => handleUpdate()}
          disabled={loading}
          className="btn primary-btn lead-actions-save-btn"
        >
          Save Internal Notes
        </button>
      </div>

      <hr className="lead-actions-hr" />

      <div className="lead-actions-controls">
        <div className="lead-actions-decisions">
          <span className="lead-actions-decision-label">Decision:</span>
          
          <button
            type="button"
            onClick={() => handleUpdate('approved')}
            disabled={loading}
            className={`btn lead-actions-decision-btn ${status === 'approved' ? 'primary-btn lead-actions-btn-approved' : 'btn-secondary'}`}
          >
            Approve Pitch
          </button>
          
          <button
            type="button"
            onClick={() => handleUpdate('declined')}
            disabled={loading}
            className={`btn lead-actions-decision-btn ${status === 'declined' ? 'primary-btn lead-actions-btn-declined' : 'btn-secondary'}`}
          >
            Decline Pitch
          </button>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="btn lead-actions-delete-btn"
        >
          Delete Lead
        </button>
      </div>
    </div>
  );
}
