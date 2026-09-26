import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import { HeaderIllustration } from './HeaderIllustration';

export const Header = ({ onProfileClick }) => {
  return (
    <header>
      <div className="top-bar">
        <div className="user-profile" onClick={onProfileClick} title="User Profile Settings">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <span>Kumari</span>
          <ChevronDown size={16} color="#64748b" />
        </div>
      </div>

      <div className="page-header">
        <div className="page-header-text">
          <h2>Business Entity Resolution</h2>
          <p>
            Upload the 3 source files, run the matching process and find which records
            belong to the same business entity.
          </p>
        </div>
        <div className="header-illustration">
          <HeaderIllustration />
        </div>
      </div>
    </header>
  );
};
