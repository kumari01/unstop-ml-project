import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadCard } from './components/UploadCard';
import { ResultsTable } from './components/ResultsTable';
import { AboutCard } from './components/AboutCard';
import { OutputFilesCard } from './components/OutputFilesCard';
import { RecordDetailModal } from './components/RecordDetailModal';
import { MatchingProgressModal } from './components/MatchingProgressModal';
import { DataManagementModal } from './components/DataManagementModal';
import { AnalyticsView } from './components/AnalyticsView';
import { AboutView } from './components/AboutView';

import {
  INITIAL_SOURCE_1,
  INITIAL_SOURCE_2,
  INITIAL_SOURCE_3
} from './data/sampleData';

import {
  performEntityResolution,
  generateMatchingResultsTSV,
  generateCandidatePairsTSV
} from './utils/entityResolution';

export function App() {
  const [activeTab, setActiveTab] = useState('home');

  const [files] = useState({
    source1: 'train_source1.tsv',
    source2: 'train_source2.tsv',
    source3: 'train_source3.tsv'
  });

  const [source1, setSource1] = useState(INITIAL_SOURCE_1);
  const [source2, setSource2] = useState(INITIAL_SOURCE_2);
  const [source3, setSource3] = useState(INITIAL_SOURCE_3);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingSourceKey, setEditingSourceKey] = useState(null);
  const [isProcessingMatching, setIsProcessingMatching] = useState(false);

  const results = useMemo(() => {
    return performEntityResolution(source1, source2, source3);
  }, [source1, source2, source3]);

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMatchingResults = () => {
    const content = generateMatchingResultsTSV(results);
    downloadFile('matching_results.tsv', content);
  };

  const handleDownloadCandidatePairs = () => {
    const content = generateCandidatePairsTSV(source1, source2, source3);
    downloadFile('candidate_pairs.tsv', content);
  };

  const handleRunMatching = () => {
    setIsProcessingMatching(true);
  };

  const handleMatchingCompleted = () => {
    setIsProcessingMatching(false);
  };

  const getCurrentRecordsForEditing = () => {
    if (editingSourceKey === 'source1') return source1;
    if (editingSourceKey === 'source2') return source2;
    if (editingSourceKey === 'source3') return source3;
    return [];
  };

  const handleSaveRecords = (updated) => {
    if (editingSourceKey === 'source1') setSource1(updated);
    if (editingSourceKey === 'source2') setSource2(updated);
    if (editingSourceKey === 'source3') setSource3(updated);
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-area">
        <Header onProfileClick={() => alert('Profile options: Lalitha (Data Engineer)')} />

        <main className="content-wrapper">
          {activeTab === 'home' && (
            <div className="dashboard-grid">
              <div className="left-stack">
                <UploadCard
                  files={files}
                  onRunMatching={handleRunMatching}
                  onFileChange={(key) => setEditingSourceKey(key)}
                  isProcessing={isProcessingMatching}
                />

                <ResultsTable
                  results={results}
                  onSelectRecord={(rec) => setSelectedRecord(rec)}
                />
              </div>

              <div className="right-stack">
                <AboutCard />

                <OutputFilesCard
                  onDownloadMatchingResults={handleDownloadMatchingResults}
                  onDownloadCandidatePairs={handleDownloadCandidatePairs}
                />
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <UploadCard
                files={files}
                onRunMatching={() => {
                  handleRunMatching();
                  setActiveTab('home');
                }}
                onFileChange={(key) => setEditingSourceKey(key)}
                isProcessing={isProcessingMatching}
              />
            </div>
          )}

          {activeTab === 'matching' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card">
                <h3>Entity Resolution Algorithm Configuration</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '8px 0 20px 0' }}>
                  Adjust weights and fuzzy similarity parameters
                </p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Similarity Threshold:</label>
                  <input type="range" min="0.5" max="0.95" step="0.05" defaultValue="0.68" style={{ width: '200px' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>0.68 (Recommended)</span>
                </div>
                <button
                  type="button"
                  className="btn-run-matching"
                  style={{ width: '240px' }}
                  onClick={() => {
                    handleRunMatching();
                    setActiveTab('home');
                  }}
                >
                  Start Resolution
                </button>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <AnalyticsView
              results={results}
              onDownloadMatchingResults={handleDownloadMatchingResults}
              onDownloadCandidatePairs={handleDownloadCandidatePairs}
            />
          )}

          {activeTab === 'about' && <AboutView />}
        </main>
      </div>

      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />

      <DataManagementModal
        sourceKey={editingSourceKey}
        records={getCurrentRecordsForEditing()}
        onClose={() => setEditingSourceKey(null)}
        onSaveRecords={handleSaveRecords}
      />

      <MatchingProgressModal
        isOpen={isProcessingMatching}
        onComplete={handleMatchingCompleted}
      />
    </div>
  );
}

export default App;
