import React from 'react';
import { X, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const RecordDetailModal = ({ record, onClose }) => {
  if (!record) return null;

  const { source1Record, details, status } = record;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#e0e7ff',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3>Entity Record Comparison</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Reference ID: <strong style={{ color: 'var(--primary)' }}>{source1Record.id}</strong> ({source1Record.name})
              </p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: status === 'No match' ? '#f1f5f9' : '#d1fae5',
            color: status === 'No match' ? '#475569' : '#047857',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {status === 'No match' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span>Match Status: <strong>{status}</strong></span>
          </div>
          <span style={{ fontSize: '12px', opacity: 0.85 }}>Algorithm: Weighted Jaro-Winkler + Blocking</span>
        </div>

        <div className="record-compare-grid">
          {/* Source 1 Reference Card */}
          <div className="compare-card reference">
            <h4>
              <span>Source 1 (Reference)</span>
              <span style={{ fontSize: '11px', background: '#4f46e5', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>Base</span>
            </h4>
            <div className="compare-field">
              <label>Record ID</label>
              <span>{source1Record.id}</span>
            </div>
            <div className="compare-field">
              <label>Business Name</label>
              <span style={{ color: '#1e1b4b', fontWeight: 700 }}>{source1Record.name}</span>
            </div>
            <div className="compare-field">
              <label>Address</label>
              <span>{source1Record.address}</span>
            </div>
            <div className="compare-field">
              <label>Phone</label>
              <span>{source1Record.phone}</span>
            </div>
            <div className="compare-field">
              <label>Tax ID</label>
              <span>{source1Record.taxId}</span>
            </div>
          </div>

          {/* Source 2 Match Card */}
          <div className="compare-card">
            <h4>
              <span>Source 2</span>
              {details.s2Matches.length > 0 ? (
                <span style={{ fontSize: '11px', color: '#047857', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                  Score: {(details.s2Matches[0].score * 100).toFixed(0)}%
                </span>
              ) : (
                <span style={{ fontSize: '11px', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                  No match
                </span>
              )}
            </h4>
            {details.s2Matches.length > 0 ? (
              <>
                <div className="compare-field">
                  <label>Record ID</label>
                  <span>{details.s2Matches[0].record.id}</span>
                </div>
                <div className="compare-field">
                  <label>Business Name</label>
                  <span>{details.s2Matches[0].record.name}</span>
                </div>
                <div className="compare-field">
                  <label>Address</label>
                  <span>{details.s2Matches[0].record.address}</span>
                </div>
                <div className="compare-field">
                  <label>Phone</label>
                  <span>{details.s2Matches[0].record.phone}</span>
                </div>
                <div className="compare-field">
                  <label>Tax ID</label>
                  <span>{details.s2Matches[0].record.taxId}</span>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                No candidate record met the similarity threshold (&gt; 0.68).
              </div>
            )}
          </div>

          {/* Source 3 Match Card */}
          <div className="compare-card">
            <h4>
              <span>Source 3</span>
              {details.s3Matches.length > 0 ? (
                <span style={{ fontSize: '11px', color: '#047857', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                  Score: {(details.s3Matches[0].score * 100).toFixed(0)}%
                </span>
              ) : (
                <span style={{ fontSize: '11px', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                  No match
                </span>
              )}
            </h4>
            {details.s3Matches.length > 0 ? (
              <>
                <div className="compare-field">
                  <label>Record ID</label>
                  <span>{details.s3Matches[0].record.id}</span>
                </div>
                <div className="compare-field">
                  <label>Business Name</label>
                  <span>{details.s3Matches[0].record.name}</span>
                </div>
                <div className="compare-field">
                  <label>Address</label>
                  <span>{details.s3Matches[0].record.address}</span>
                </div>
                <div className="compare-field">
                  <label>Phone</label>
                  <span>{details.s3Matches[0].record.phone}</span>
                </div>
                <div className="compare-field">
                  <label>Tax ID</label>
                  <span>{details.s3Matches[0].record.taxId}</span>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                No candidate record met the similarity threshold (&gt; 0.68).
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn-run-matching"
            style={{ width: 'auto', padding: '0 24px', height: '42px', fontSize: '13px' }}
            onClick={onClose}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
