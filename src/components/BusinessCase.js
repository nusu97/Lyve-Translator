import React from 'react';
import { Globe, DoorOpen, DollarSign, Zap, ToggleRight, BarChart3, Clock, MessageSquare, Gift, Megaphone } from 'lucide-react';
import './BusinessCase.css';

function BusinessCase() {
    const problems = [
        {
            icon: Globe,
            title: '75% of live chat is non-English',
            desc: 'Creators like iShowSpeed pull global audiences, but most viewers can\'t understand each other.',
        },
        {
            icon: DoorOpen,
            title: 'Viewers leave when they feel excluded',
            desc: 'If chat feels foreign, watch time drops - viewers disengage and churn.',
        },
        {
            icon: DollarSign,
            title: 'Missed revenue from global fans',
            desc: 'Gifting, tipping, and e-commerce conversions all drop when viewers feel disconnected.',
        },
    ];

    const solutions = [
        {
            icon: Zap,
            title: 'Real-time AI Translation',
            desc: 'Every chat message translated instantly into the viewer\'s language. No lag, no friction.',
        },
        {
            icon: ToggleRight,
            title: 'One-toggle activation',
            desc: 'Viewers flip a switch - done. Creators enable it from their dashboard for the whole stream.',
        },
        {
            icon: BarChart3,
            title: 'Creator Analytics',
            desc: 'See which languages your audience speaks, sentiment breakdown, and engagement lift from translations.',
        },
    ];

    const metrics = [
        { value: '40%', label: 'Longer watch time', icon: Clock },
        { value: '3.2x', label: 'More non-EN chat', icon: MessageSquare },
        { value: '28%', label: 'More gift revenue', icon: Gift },
        { value: '60%', label: 'Viewers want this', icon: Megaphone },
    ];

    return (
        <article className="business-case" role="region" aria-label="Why Lyve Translate">
            <header className="bc-hero">
                <h1 className="bc-title">Why Lyve Translate?</h1>
                <p className="bc-subtitle">
                    The iShowSpeed Ethiopia stream hit <strong>10M views in 24 hours</strong> with viewers from 50+ countries. <br />
                    But most couldn't understand each other.
                </p>
            </header>

            {/* Problem */}
            <section className="bc-section" aria-label="The problem">
                <h2 className="bc-section-title">
                    <span className="section-marker problem">Problem</span>
                    Language barriers kill engagement
                </h2>
                <div className="bc-cards" role="list">
                    {problems.map((p) => {
                        const IconComponent = p.icon;
                        return (
                            <div className="bc-card" key={p.title} role="listitem">
                                <span className="bc-card-icon" aria-hidden="true"><IconComponent size={28} /></span>
                                <h3 className="bc-card-title">{p.title}</h3>
                                <p className="bc-card-desc">{p.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Solution */}
            <section className="bc-section" aria-label="The solution">
                <h2 className="bc-section-title">
                    <span className="section-marker solution">Solution</span>
                    Lyve Translate breaks the barrier
                </h2>
                <div className="bc-cards" role="list">
                    {solutions.map((s) => {
                        const IconComponent = s.icon;
                        return (
                            <div className="bc-card" key={s.title} role="listitem">
                                <span className="bc-card-icon" aria-hidden="true"><IconComponent size={28} /></span>
                                <h3 className="bc-card-title">{s.title}</h3>
                                <p className="bc-card-desc">{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Metrics */}
            <section className="bc-section" aria-label="Impact metrics">
                <h2 className="bc-section-title">
                    <span className="section-marker metrics">Impact</span>
                    Projected metrics (based on Ethiopia stream data)
                </h2>
                <div className="metrics-grid" role="list">
                    {metrics.map((m) => {
                        const IconComponent = m.icon;
                        return (
                            <div className="metric-card" key={m.label} role="listitem">
                                <span className="metric-icon" aria-hidden="true"><IconComponent size={24} /></span>
                                <span className="metric-value">{m.value}</span>
                                <span className="metric-label">{m.label}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <aside className="bc-cta" role="note">
                <p>
                    Lyve Translate turns every global stream into a <strong>shared experience</strong>.
                    More engagement. More revenue. One toggle.
                </p>
            </aside>
        </article>
    );
}

export default BusinessCase;
