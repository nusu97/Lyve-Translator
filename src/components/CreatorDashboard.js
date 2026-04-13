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
        <article className="dashboard" role="region" aria-label="Creator Dashboard">
            <header className="dash-header">
                <h1 className="dash-title">Creator Dashboard</h1>
                <p className="dash-subtitle">iShowSpeed — Ethiopia Stream (Live)</p>
            </header>

            {/* Stats grid */}
            <section aria-label="Stream statistics">
                <div className="stats-grid">
                    {stats.map((s) => (
                        <div className="stat-card" key={s.label}>
                            <span className="stat-icon" aria-hidden="true">{s.icon}</span>
                            <span className="stat-value" aria-label={`${s.label}: ${s.value}`}>{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Top languages */}
            <section className="dash-section" aria-label="Chat language distribution">
                <h2 className="section-title">Chat Languages</h2>
                <div className="lang-bars" role="list">
                    {topLanguages.map((l) => (
                        <div className="lang-row" key={l.lang} role="listitem">
                            <span className="lang-flag" aria-hidden="true">{l.flag}</span>
                            <span className="lang-name">{l.lang}</span>
                            <div 
                                className="lang-bar-track" 
                                role="progressbar"
                                aria-valuenow={l.pct}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label={`${l.lang}: ${l.pct}%`}
                            >
                                <div
                                    className="lang-bar-fill"
                                    style={{ width: mounted ? `${l.pct}%` : '0%' }}
                                />
                            </div>
                            <span className="lang-pct">{l.pct}%</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sentiment */}
            <section className="dash-section" aria-label="Chat sentiment analysis">
                <h2 className="section-title">Chat Sentiment</h2>
                <div className="sentiment-row">
                    {sentimentData.map((s) => (
                        <div className="sentiment-card" key={s.label}>
                            <span className="sentiment-emoji" aria-hidden="true">{s.emoji}</span>
                            <span className="sentiment-pct">{s.pct}%</span>
                            <span className="sentiment-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Insight callout */}
            <aside className="dash-insight" role="note">
                <span className="insight-icon" aria-hidden="true">💡</span>
                <div>
                    <strong>Insight:</strong> Enabling Lyve Translate increased non-English
                    chat participation by <strong>3.2×</strong> and average watch time by{' '}
                    <strong>40%</strong> for this stream.
                </div>
            </aside>
        </article>
    );
}

export default CreatorDashboard;
