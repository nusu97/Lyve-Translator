import React, { useState } from 'react';
import StreamView from './components/StreamView';
import CreatorDashboard from './components/CreatorDashboard';
import BusinessCase from './components/BusinessCase';
import BottomNav from './components/BottomNav';
import './App.css';

const TABS = [
    { id: 'stream', label: '🎬 Stream View' },
    { id: 'dashboard', label: '📊 Creator Dashboard' },
    { id: 'business', label: '💡 Why This Matters' },
];

function App() {
    const [activeTab, setActiveTab] = useState('stream');

    return (
        <div className="app-shell">
            {/* Decorative gradient bar */}
            <div className="gradient-bar" />

            {/* Top tab bar */}
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

            {/* Tab content */}
            <main className="app-content">
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
