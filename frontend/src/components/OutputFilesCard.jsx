import React from 'react';
import { FileText, Download } from 'lucide-react';

export const OutputFilesCard = ({
  onDownloadMatchingResults,
  onDownloadCandidatePairs,
}) => {
  return (
    <div className="card">
      <div className="card-header-icon-title">
        <div className="card-icon-badge light-purple">
          <FileText size={22} />
        </div>
        <div className="card-title-container">
          <h3>Output Files</h3>
        </div>
      </div>

      <div className="output-files-list">
        <div className="output-file-item">
          <div className="file-item-left">
            <h4>matching_results.tsv</h4>
            <p>Final entity matches (scored)</p>
          </div>
          <button
            type="button"
            className="btn-download-icon"
            onClick={onDownloadMatchingResults}
            title="Download matching_results.tsv"
          >
            <Download size={20} />
          </button>
        </div>

        <div className="output-file-item">
          <div className="file-item-left">
            <h4>candidate_pairs.tsv</h4>
            <p>Candidate pairs from blocking stage</p>
          </div>
          <button
            type="button"
            className="btn-download-icon"
            onClick={onDownloadCandidatePairs}
            title="Download candidate_pairs.tsv"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
