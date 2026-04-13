import React, { useState } from 'react';
import StreamView from './components/StreamView';
import CreatorDashboard from './components/CreatorDashboard';
import BusinessCase from './components/BusinessCase';
import BottomNav from './components/BottomNav';
import './App.css';

const TABS = [
    { id: 'stream', label: 'Stream View', icon: '🎬' },
    { id: 'dashboard', label: 'Creator Dashboard', icon: '📊' },
    { id: 'business', label: 'Why This Matters', icon: '💡' },
];

function App() {
    const [activeTab, setActiveTab] = useState('stream');

    return (
        <div className="app-shell">
            {/* Skip link for keyboard accessibility */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            {/* Decorative gradient bar */}
            <div className="gradient-bar" aria-hidden="true" />

            {/* Top tab bar */}
            <nav className="tab-bar" role="tablist" aria-label="Main views">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        id={`tab-${tab.id}`}
                        aria-selected={activeTab === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        type="button"
                    >
                        <span aria-hidden="true">{tab.icon}</span> {tab.label}
                    </button>
                ))}
            </nav>

            {/* Tab content */}
            <main 
                id="main-content"
                className="app-content" 
                key={activeTab}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
            >
                {activeTab === 'stream' && <StreamView />}
                {activeTab === 'dashboard' && <CreatorDashboard />}
                {activeTab === 'business' && <BusinessCase />}
            </main>

            {/* Bottom navigation */}
            <BottomNav />
        </div>
    );
}

export default App;
