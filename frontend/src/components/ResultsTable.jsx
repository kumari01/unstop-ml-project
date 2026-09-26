import React, { useState } from 'react';
import { Table, Check, Search, Eye } from 'lucide-react';

export const ResultsTable = ({ results, onSelectRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredResults = (results || []).filter(row => {
    const matchedIds = [...(row.matchedSource2Ids || []), ...(row.matchedSource3Ids || [])].join(' ');
    const matchesSearch =
      row.source1Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.source1Record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matchedIds.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === '2_MATCHES' && row.status === '2 matches') ||
      (statusFilter === '1_MATCH' && row.status === '1 match') ||
      (statusFilter === 'NO_MATCH' && row.status === 'No match');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="card">
      <div className="card-header-icon-title">
        <div className="card-icon-badge light-purple">
          <Table size={22} />
        </div>
        <div className="card-header-with-badge">
          <div className="card-title-container">
            <h3>Matching Results</h3>
          </div>
          <div className="status-badge-completed">
            <Check size={14} strokeWidth={3} />
            <span>Matching Completed</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by ID or business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              outline: 'none',
              backgroundColor: 'var(--bg-row)'
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            fontSize: '13px',
            backgroundColor: 'var(--bg-row)',
            color: 'var(--text-main)',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <option value="ALL">All Statuses</option>
          <option value="2_MATCHES">2 Matches</option>
          <option value="1_MATCH">1 Match</option>
          <option value="NO_MATCH">No Match</option>
        </select>
      </div>

      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Source 1 ID</th>
              <th>Matched Source 2/3 IDs</th>
              <th>Status</th>
              <th style={{ width: '40px', textAlign: 'center' }}>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredResults.map((row) => {
                const matchedList = [...(row.matchedSource2Ids || []), ...(row.matchedSource3Ids || [])];
                const matchedText = matchedList.length > 0 ? matchedList.join(', ') : '-';

                let badgeClass = 'no-match';
                if (row.status === '2 matches') badgeClass = 'two-matches';
                else if (row.status === '1 match') badgeClass = 'one-match';

                return (
                  <tr
                    key={row.source1Id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectRecord(row)}
                    title="Click to view detailed side-by-side comparison"
                  >
                    <td className="source-id">{row.source1Id}</td>
                    <td className="matched-ids">{matchedText}</td>
                    <td>
                      <span className={`badge-status ${badgeClass}`}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRecord(row);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing 1 - {filteredResults.length} of {(results || []).length} records
      </div>
    </div>
  );
};
