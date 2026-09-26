import React, { useEffect, useState } from 'react';
import { Cpu, Check, Loader2, Sparkles } from 'lucide-react';

export const MatchingProgressModal = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Normalizing & Cleaning Data', desc: 'Removing noise, standardizing address & phone formats' },
    { title: 'Generating Blocking Keys', desc: 'Creating candidate pairs to reduce O(N²) comparison overhead' },
    { title: 'Pairwise Similarity Scoring', desc: 'Applying weighted Jaro-Winkler string distance metrics' },
    { title: 'Graph Linkage & Cluster Assignment', desc: 'Consolidating records & generating final output files' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const timer1 = setTimeout(() => setCurrentStep(1), 600);
    const timer2 = setTimeout(() => setCurrentStep(2), 1400);
    const timer3 = setTimeout(() => setCurrentStep(3), 2200);
    const timer4 = setTimeout(() => {
      setCurrentStep(4);
      setTimeout(onComplete, 600);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px', textAlign: 'center', padding: '36px' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)'
          }}
        >
          <Cpu size={28} className="animate-spin" />
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1e1b4b', marginBottom: '8px' }}>
          Running Entity Resolution
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Processing Source 1, Source 2, and Source 3 through the record linkage engine...
        </p>

        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          {steps.map((step, idx) => {
            let statusClass = 'pending';
            let icon = <span style={{ fontSize: '11px' }}>{idx + 1}</span>;

            if (idx < currentStep) {
              statusClass = 'done';
              icon = <Check size={14} strokeWidth={3} />;
            } else if (idx === currentStep) {
              statusClass = 'active';
              icon = <Loader2 size={14} className="animate-spin" />;
            }

            return (
              <div key={step.title} className="matching-step-item">
                <div className={`step-status-icon ${statusClass}`}>{icon}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b' }}>{step.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#6366f1" />
          <span>BizLink ML Entity Engine v2.4</span>
        </div>
      </div>
    </div>
  );
};
