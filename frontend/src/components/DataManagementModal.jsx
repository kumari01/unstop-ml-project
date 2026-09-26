import React, { useState } from 'react';
import { X, Upload, FileCode, Check } from 'lucide-react';

export const DataManagementModal = ({
  sourceKey,
  records,
  onClose,
  onSaveRecords
}) => {
  if (!sourceKey) return null;

  const sourceLabels = {
    source1: 'Source 1 (Reference File - train_source1.tsv)',
    source2: 'Source 2 (train_source2.tsv)',
    source3: 'Source 3 (train_source3.tsv)'
  };

  const [jsonText, setJsonText] = useState(JSON.stringify(records, null, 2));
  const [errorMsg, setErrorMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setErrorMsg('Data must be a JSON array of records');
        return;
      }
      onSaveRecords(parsed);
      setErrorMsg('');
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 800);
    } catch (e) {
      setErrorMsg('Invalid JSON syntax: ' + e.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={22} color="#4f46e5" />
            <div>
              <h3>Manage {sourceLabels[sourceKey]}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Inspect or edit records in memory</p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
            {errorMsg}
          </div>
        )}

        {savedSuccess && (
          <div style={{ padding: '10px 14px', background: '#d1fae5', color: '#047857', borderRadius: '8px', fontSize: '13px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={16} /> Saved changes successfully!
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            Records Data (JSON Format):
          </label>
          <textarea
            rows={12}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              backgroundColor: '#0f172a',
              color: '#38bdf8',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ cursor: 'pointer', fontSize: '13px', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Upload size={16} /> Upload custom .tsv / .csv
            <input
              type="file"
              accept=".tsv,.csv,.json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const content = event.target?.result;
                    try {
                      if (content.trim().startsWith('[')) {
                        setJsonText(content);
                      } else {
                        const lines = content.trim().split('\n');
                        const parsedRecords = lines.slice(1).map((line, idx) => {
                          const cols = line.split(/\t|,/).map(c => c.trim());
                          return {
                            id: cols[0] || `${sourceKey.toUpperCase()}-${idx + 1}`,
                            name: cols[1] || 'Unknown Business',
                            address: cols[2] || '',
                            phone: cols[3] || '',
                            taxId: cols[4] || ''
                          };
                        });
                        setJsonText(JSON.stringify(parsedRecords, null, 2));
                      }
                    } catch (err) {
                      setErrorMsg('Failed to parse uploaded file');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </label>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-row)',
                color: 'var(--text-main)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--primary)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Save Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
