import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import BottomNav from './BottomNav';
import messages from '../data/messages';
import './StreamView.css';

function StreamView() {
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [preferredLang, setPreferredLang] = useState(null);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [viewerCount] = useState('2.4M');
    const chatEndRef = useRef(null);

    // Simulate messages arriving one by one
    useEffect(() => {
        let index = 0;
        setVisibleMessages([messages[0]]);
        const interval = setInterval(() => {
            index++;
            if (index < messages.length) {
                setVisibleMessages((prev) => [...prev, messages[index]]);
            } else {
                clearInterval(interval);
            }
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleMessages]);

    return (
        <div className="stream-view">
            {/* Stream header */}
            <div className="stream-header">
                <button className="back-btn" aria-label="Go back">←</button>
                <span className="stream-title">Speed Does Africa 🇪🇹</span>
                <button
                    className="globe-btn"
                    aria-label="Toggle translation"
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                >
                    🌐
                </button>
                {showLangDropdown && (
                    <div className="lang-dropdown">
                        <div
                            className="lang-option"
                            onClick={() => { setPreferredLang('en'); setShowLangDropdown(false); }}
                        >
                            English 🇬🇧
                        </div>
                        <div
                            className="lang-option"
                            onClick={() => { setPreferredLang('am'); setShowLangDropdown(false); }}
                        >
                            Amharic 🇪🇹
                        </div>
                    </div>
                )}
            </div>

            {/* Stream video placeholder */}
            <div className="stream-video">
                <div className="stream-overlay-top">
                    <div className="stream-info">
                        <div className="streamer-name">
                            <span className="live-dot" />
                            iShowSpeed
                        </div>
                        <div className="stream-meta">
                            <span className="viewer-count">👁 {viewerCount}</span>
                            <span className="stream-tag">Ethiopia 🇪🇹</span>
                        </div>
                    </div>
                </div>
                <div className="stream-placeholder-text">
                    <span className="placeholder-emoji">🇪🇹</span>
                    <span>iShowSpeed — Ethiopia Stream</span>
                    <span className="placeholder-sub">10M views in 24hrs</span>
                </div>
            </div>

            {/* Chat messages */}
            <div className="chat-container">
                {visibleMessages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} translateOn={preferredLang !== null} />
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Chat input bar */}
            <div className="chat-input-bar">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Say something..."
                    readOnly
                />
                <button className="send-btn" aria-label="Send">🎁</button>
            </div>

            <BottomNav />
        </div>
    );
}

export default StreamView;
