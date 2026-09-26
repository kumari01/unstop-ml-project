import React from 'react';
import { Info, Layers, Database, Cpu, ShieldCheck } from 'lucide-react';

export const AboutView = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card">
        <div className="card-header-icon-title">
          <div className="card-icon-badge light-blue">
            <Info size={22} />
          </div>
          <div className="card-title-container">
            <h3>About Business Entity Resolution</h3>
            <p>De-duplication and Record Linkage across heterogeneous data sources</p>
          </div>
        </div>

        <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-main)' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong>Entity Resolution (ER)</strong> is the computational process of identifying and linking records
            across multiple databases that refer to the same real-world entity (such as a business, person, or product).
            In commercial datasets, business names, addresses, phone numbers, and tax identifiers are frequently noisy,
            abbreviated, or missing due to manual data entry variations.
          </p>

          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1e1b4b', marginTop: '20px', marginBottom: '10px' }}>
            Pipeline Architecture
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '16px 0' }}>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-row)', border: '1px solid var(--border-light)' }}>
              <Database size={20} color="#4f46e5" style={{ marginBottom: '8px' }} />
              <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>1. Data Preprocessing</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Normalizing text, removing punctuation, lowercasing, and extracting numeric digits from phone numbers.
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-row)', border: '1px solid var(--border-light)' }}>
              <Layers size={20} color="#6366f1" style={{ marginBottom: '8px' }} />
              <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>2. Blocking Stage</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Grouping records by n-grams or prefixes to generate candidate pairs (`candidate_pairs.tsv`) without inspecting every pair.
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-row)', border: '1px solid var(--border-light)' }}>
              <Cpu size={20} color="#10b981" style={{ marginBottom: '8px' }} />
              <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>3. Field Similarity</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Applying Jaro-Winkler string distance on company names, Levenshtein distance on addresses, and exact token matching.
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-row)', border: '1px solid var(--border-light)' }}>
              <ShieldCheck size={20} color="#059669" style={{ marginBottom: '8px' }} />
              <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>4. Clustering & Output</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Aggregating scores into confidence levels to output `matching_results.tsv` containing entity clusters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
