import React, { useState } from 'react';
import StreamView from './components/StreamView';
import CreatorDashboard from './components/CreatorDashboard';
import BusinessCase from './components/BusinessCase';
import './App.css';

const TABS = [
    { id: 'viewer', label: '📺 Viewer', icon: '📺' },
    { id: 'creator', label: '📊 Creator', icon: '📊' },
    { id: 'business', label: '💼 Business', icon: '💼' },
];

function App() {
    const [activeTab, setActiveTab] = useState('viewer');

    return (
        <div className="app-shell">
            {/* Top tab bar */}
            <header className="app-header">
                <div className="app-logo">
                    <span className="logo-icon">🌐</span>
                    <span className="logo-text">Lyve Translate</span>
                </div>
                <nav className="tab-bar">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Tab content */}
            <main className="app-content">
                {activeTab === 'viewer' && <StreamView />}
                {activeTab === 'creator' && <CreatorDashboard />}
                {activeTab === 'business' && <BusinessCase />}
            </main>
        </div>
    );
}

export default App;
