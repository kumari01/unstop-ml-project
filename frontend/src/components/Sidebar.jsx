import React from 'react';
import { Home, CloudUpload, Play, FileSpreadsheet, Info } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload Data', icon: CloudUpload },
    { id: 'matching', label: 'Run Matching', icon: Play },
    { id: 'results', label: 'Results', icon: FileSpreadsheet },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="brand-header">
          <div className="brand-logo-icon">
            <div className="logo-circle-1"></div>
            <div className="logo-circle-2"></div>
          </div>
          <div className="brand-text">
            <h1>BizLink</h1>
            <p>Entity Resolution</p>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <IconComponent className="nav-icon" size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <p>
          Same Business.<br />
          Different Records.<br />
          One Identity.
        </p>
        <div className="sidebar-footer-line"></div>
      </div>
    </aside>
  );
};
