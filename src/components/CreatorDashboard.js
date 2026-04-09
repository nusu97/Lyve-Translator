import React, { useState, useEffect } from 'react';
import './CreatorDashboard.css';

function CreatorDashboard() {
    const stats = [
        { label: 'Viewers (Live)', value: '2.4M', icon: '👁' },
        { label: 'Languages Detected', value: '12', icon: '🌍' },
        { label: 'Translations Served', value: '1.8M', icon: '🌐' },
        { label: 'Avg. Watch Time', value: '+40%', icon: '⏱' },
    ];

    const topLanguages = [
        { lang: 'Amharic', pct: 28, flag: '🇪🇹' },
        { lang: 'Portuguese', pct: 18, flag: '🇧🇷' },
        { lang: 'Spanish', pct: 14, flag: '🇲🇽' },
        { lang: 'Japanese', pct: 11, flag: '🇯🇵' },
        { lang: 'Hindi', pct: 9, flag: '🇮🇳' },
        { lang: 'Korean', pct: 7, flag: '🇰🇷' },
        { lang: 'Arabic', pct: 6, flag: '🇪🇬' },
        { lang: 'Other', pct: 7, flag: '🌐' },
    ];

    const sentimentData = [
        { emoji: '🔥', label: 'Hype', pct: 45 },
        { emoji: '😂', label: 'Funny', pct: 30 },
        { emoji: '❤️', label: 'Love', pct: 15 },
        { emoji: '😮', label: 'Shock', pct: 10 },
    ];

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="dashboard">
            <div className="dash-header">
                <h2 className="dash-title">Creator Dashboard</h2>
                <p className="dash-subtitle">iShowSpeed — Ethiopia Stream (Live)</p>
            </div>

            {/* Stats grid */}
            <div className="stats-grid">
                {stats.map((s) => (
                    <div className="stat-card" key={s.label}>
                        <span className="stat-icon">{s.icon}</span>
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Top languages */}
            <div className="dash-section">
                <h3 className="section-title">Chat Languages</h3>
                <div className="lang-bars">
                    {topLanguages.map((l) => (
                        <div className="lang-row" key={l.lang}>
                            <span className="lang-flag">{l.flag}</span>
                            <span className="lang-name">{l.lang}</span>
                            <div className="lang-bar-track">
                                <div
                                    className="lang-bar-fill"
                                    style={{ width: mounted ? `${l.pct}%` : '0%' }}
                                />
                            </div>
                            <span className="lang-pct">{l.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sentiment */}
            <div className="dash-section">
                <h3 className="section-title">Chat Sentiment</h3>
                <div className="sentiment-row">
                    {sentimentData.map((s) => (
                        <div className="sentiment-card" key={s.label}>
                            <span className="sentiment-emoji">{s.emoji}</span>
                            <span className="sentiment-pct">{s.pct}%</span>
                            <span className="sentiment-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insight callout */}
            <div className="dash-insight">
                <span className="insight-icon">💡</span>
                <div>
                    <strong>Insight:</strong> Enabling Lyve Translate increased non-English
                    chat participation by <strong>3.2×</strong> and average watch time by{' '}
                    <strong>40%</strong> for this stream.
                </div>
            </div>
        </div>
    );
}

export default CreatorDashboard;
