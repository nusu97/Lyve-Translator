import React from 'react';
import './BusinessCase.css';

function BusinessCase() {
    const problems = [
        {
            icon: '🌍',
            title: '75% of live chat is non-English',
            desc: 'Creators like iShowSpeed pull global audiences, but most viewers can\'t understand each other.',
        },
        {
            icon: '🚪',
            title: 'Viewers leave when they feel excluded',
            desc: 'If chat feels foreign, watch time drops — viewers disengage and churn.',
        },
        {
            icon: '💸',
            title: 'Missed revenue from global fans',
            desc: 'Gifting, tipping, and e-commerce conversions all drop when viewers feel disconnected.',
        },
    ];

    const solutions = [
        {
            icon: '⚡',
            title: 'Real-time AI Translation',
            desc: 'Every chat message translated instantly into the viewer\'s language. No lag, no friction.',
        },
        {
            icon: '🎛',
            title: 'One-toggle activation',
            desc: 'Viewers flip a switch — done. Creators enable it from their dashboard for the whole stream.',
        },
        {
            icon: '📊',
            title: 'Creator Analytics',
            desc: 'See which languages your audience speaks, sentiment breakdown, and engagement lift from translations.',
        },
    ];

    const metrics = [
        { value: '40%', label: 'Longer watch time', icon: '⏱' },
        { value: '3.2×', label: 'More non-EN chat', icon: '💬' },
        { value: '28%', label: 'More gift revenue', icon: '🎁' },
        { value: '60%', label: 'Viewers want this', icon: '📣' },
    ];

    return (
        <div className="business-case">
            <div className="bc-hero">
                <h2 className="bc-title">Why Lyve Translate?</h2>
                <p className="bc-subtitle">
                    The iShowSpeed Ethiopia stream hit <strong>10M views in 24 hours</strong> —
                    with viewers from 50+ countries. <br />
                    But most couldn't understand each other.
                </p>
            </div>

            {/* Problem */}
            <div className="bc-section">
                <h3 className="bc-section-title">
                    <span className="section-marker problem">Problem</span>
                    Language barriers kill engagement
                </h3>
                <div className="bc-cards">
                    {problems.map((p) => (
                        <div className="bc-card" key={p.title}>
                            <span className="bc-card-icon">{p.icon}</span>
                            <h4 className="bc-card-title">{p.title}</h4>
                            <p className="bc-card-desc">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Solution */}
            <div className="bc-section">
                <h3 className="bc-section-title">
                    <span className="section-marker solution">Solution</span>
                    Lyve Translate breaks the barrier
                </h3>
                <div className="bc-cards">
                    {solutions.map((s) => (
                        <div className="bc-card" key={s.title}>
                            <span className="bc-card-icon">{s.icon}</span>
                            <h4 className="bc-card-title">{s.title}</h4>
                            <p className="bc-card-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Metrics */}
            <div className="bc-section">
                <h3 className="bc-section-title">
                    <span className="section-marker metrics">Impact</span>
                    Projected metrics (based on Ethiopia stream data)
                </h3>
                <div className="metrics-grid">
                    {metrics.map((m) => (
                        <div className="metric-card" key={m.label}>
                            <span className="metric-icon">{m.icon}</span>
                            <span className="metric-value">{m.value}</span>
                            <span className="metric-label">{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bc-cta">
                <p>
                    Lyve Translate turns every global stream into a <strong>shared experience</strong>.
                    More engagement. More revenue. One toggle.
                </p>
            </div>
        </div>
    );
}

export default BusinessCase;
