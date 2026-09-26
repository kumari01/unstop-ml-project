import React from 'react';
import { Upload, FileText, Check, Play, RefreshCw } from 'lucide-react';

export const UploadCard = ({
  files,
  onRunMatching,
  onFileChange,
  isProcessing
}) => {
  return (
    <div className="card">
      <div className="card-header-icon-title">
        <div className="card-icon-badge">
          <Upload size={22} />
        </div>
        <div className="card-title-container">
          <h3>Upload 3 Source Files</h3>
          <p>Upload the .tsv files for Source 1, Source 2 and Source 3.</p>
        </div>
      </div>

      <div className="file-upload-list">
        {/* Source 1 */}
        <div className="file-row">
          <div className="file-info-left">
            <FileText size={18} className="file-type-icon" />
            <span className="file-source-name">Source 1 (Reference)</span>
            <span className="file-name-tag">{files.source1}</span>
          </div>
          <div className="file-actions-right">
            <div className="check-icon-circle" title="File verified & uploaded">
              <Check size={14} strokeWidth={3} />
            </div>
            <button
              type="button"
              className="btn-change-file"
              onClick={() => onFileChange('source1')}
            >
              Change
            </button>
          </div>
        </div>

        {/* Source 2 */}
        <div className="file-row">
          <div className="file-info-left">
            <FileText size={18} className="file-type-icon" />
            <span className="file-source-name">Source 2</span>
            <span className="file-name-tag">{files.source2}</span>
          </div>
          <div className="file-actions-right">
            <div className="check-icon-circle" title="File verified & uploaded">
              <Check size={14} strokeWidth={3} />
            </div>
            <button
              type="button"
              className="btn-change-file"
              onClick={() => onFileChange('source2')}
            >
              Change
            </button>
          </div>
        </div>

        {/* Source 3 */}
        <div className="file-row">
          <div className="file-info-left">
            <FileText size={18} className="file-type-icon" />
            <span className="file-source-name">Source 3</span>
            <span className="file-name-tag">{files.source3}</span>
          </div>
          <div className="file-actions-right">
            <div className="check-icon-circle" title="File verified & uploaded">
              <Check size={14} strokeWidth={3} />
            </div>
            <button
              type="button"
              className="btn-change-file"
              onClick={() => onFileChange('source3')}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn-run-matching"
        onClick={onRunMatching}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <RefreshCw size={18} className="animate-spin" />
            <span>Processing Entity Linkage...</span>
          </>
        ) : (
          <>
            <Play size={18} fill="#ffffff" />
            <span>Run Matching</span>
          </>
        )}
      </button>
    </div>
  );
};
