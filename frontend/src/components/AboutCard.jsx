import React from 'react';
import { Lightbulb } from 'lucide-react';

export const AboutCard = () => {
  return (
    <div className="card">
      <div className="card-header-icon-title">
        <div className="card-icon-badge light-blue">
          <Lightbulb size={22} />
        </div>
        <div className="card-title-container">
          <h3>About the Problem</h3>
        </div>
      </div>
      <p className="about-card-text">
        Find matching business records across 3 independent data sources with noisy
        and inconsistent information. Source 1 is the reference source. For each Source 1
        entity, find all matching records from Source 2 and Source 3.
      </p>
    </div>
  );
};
