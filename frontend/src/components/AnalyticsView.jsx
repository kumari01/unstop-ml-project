import React from 'react';
import { BarChart2, CheckCircle, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';

export const AnalyticsView = ({
  results,
  onDownloadMatchingResults,
  onDownloadCandidatePairs
}) => {
  const total = (results || []).length;
  const twoMatchesCount = (results || []).filter(r => r.status === '2 matches').length;
  const oneMatchCount = (results || []).filter(r => r.status === '1 match').length;
  const noMatchCount = (results || []).filter(r => r.status === 'No match').length;
  const matchedTotal = twoMatchesCount + oneMatchCount;
  const matchRate = total > 0 ? Math.round((matchedTotal / total) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Total Reference Entities</span>
            <FileSpreadsheet size={18} color="#6366f1" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#1e1b4b' }}>{total}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>Source 1 Reference Records</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Resolution Rate</span>
            <Award size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981' }}>{matchRate}%</div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{matchedTotal} of {total} entities linked</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Triple Matches (Source 2 & 3)</span>
            <CheckCircle size={18} color="#047857" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#047857' }}>{twoMatchesCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>Full 3-source consolidation</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Unmatched Entities</span>
            <ShieldAlert size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#64748b' }}>{noMatchCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>Unique to Source 1</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header-icon-title">
          <div className="card-icon-badge">
            <BarChart2 size={22} />
          </div>
          <div className="card-title-container">
            <h3>Match Status Distribution</h3>
            <p>Breakdown of matched records across Source 2 and Source 3</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              <span>Matched in Both Source 2 & 3 (2 matches)</span>
              <span>{twoMatchesCount} ({total > 0 ? Math.round((twoMatchesCount / total) * 100) : 0}%)</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--bg-row)', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${total > 0 ? (twoMatchesCount / total) * 100 : 0}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              <span>Matched in Single Source (1 match)</span>
              <span>{oneMatchCount} ({total > 0 ? Math.round((oneMatchCount / total) * 100) : 0}%)</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--bg-row)', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${total > 0 ? (oneMatchCount / total) * 100 : 0}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              <span>No Matches Found</span>
              <span>{noMatchCount} ({total > 0 ? Math.round((noMatchCount / total) * 100) : 0}%)</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--bg-row)', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${total > 0 ? (noMatchCount / total) * 100 : 0}%`,
                  height: '100%',
                  background: '#cbd5e1',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn-change-file"
            style={{ padding: '10px 18px', background: 'var(--bg-row)', borderRadius: '8px' }}
            onClick={onDownloadCandidatePairs}
          >
            Download Candidate Pairs TSV
          </button>
          <button
            type="button"
            className="btn-run-matching"
            style={{ width: 'auto', padding: '0 20px', height: '40px', fontSize: '13px' }}
            onClick={onDownloadMatchingResults}
          >
            Export Final Results TSV
          </button>
        </div>
      </div>
    </div>
  );
};
