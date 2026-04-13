import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Globe, X, BadgeCheck, Gift } from 'lucide-react';
import ChatMessage from './ChatMessage';
import messages from '../data/messages';
import { translateText } from '../services/translateService';
import './StreamView.css';

function StreamView() {
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [preferredLang, setPreferredLang] = useState(null);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [translations, setTranslations] = useState({});
    const chatEndRef = useRef(null);
    const dropdownRef = useRef(null);

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

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLangDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowLangDropdown(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Live translate messages when preferred language changes or new messages arrive
    useEffect(() => {
        if (!preferredLang) {
            setTranslations({});
            return;
        }

        let cancelled = false;

        async function translateAll() {
            const newTranslations = {};
            await Promise.all(
                visibleMessages.map(async (msg) => {
                    if (msg.lang === preferredLang) return;
                    try {
                        const result = await translateText(msg.original, msg.lang, preferredLang);
                        if (!cancelled) {
                            newTranslations[msg.id] = result;
                        }
                    } catch {
                        // keep original on failure
                    }
                })
            );
            if (!cancelled) {
                setTranslations((prev) => ({ ...prev, ...newTranslations }));
            }
        }

        translateAll();
        return () => { cancelled = true; };
    }, [preferredLang, visibleMessages]);

    const handleLangSelect = (lang) => {
        setPreferredLang(lang);
        setShowLangDropdown(false);
    };

    return (
        <div className="stream-view" role="main">
            {/* Stream header */}
            <header className="stream-header">
                <button 
                    className="back-btn" 
                    aria-label="Go back to previous page"
                    type="button"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="stream-title">Speed Does Africa</h1>
                <div ref={dropdownRef} style={{ position: 'relative' }}>
                    <button
                        className="globe-btn"
                        aria-label={preferredLang ? `Translation: ${preferredLang === 'en' ? 'English' : 'Amharic'}` : 'Toggle translation language'}
                        aria-expanded={showLangDropdown}
                        aria-haspopup="listbox"
                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                        type="button"
                    >
                        <Globe size={20} />
                    </button>
                    {showLangDropdown && (
                        <div 
                            className="lang-dropdown" 
                            role="listbox"
                            aria-label="Select translation language"
                        >
                            <div
                                className={`lang-option ${preferredLang === 'en' ? 'selected' : ''}`}
                                role="option"
                                aria-selected={preferredLang === 'en'}
                                onClick={() => handleLangSelect('en')}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleLangSelect('en')}
                            >
                                EN - English
                            </div>
                            <div
                                className={`lang-option ${preferredLang === 'am' ? 'selected' : ''}`}
                                role="option"
                                aria-selected={preferredLang === 'am'}
                                onClick={() => handleLangSelect('am')}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleLangSelect('am')}
                            >
                                AM - Amharic
                            </div>
                            {preferredLang && (
                                <div
                                    className="lang-option"
                                    role="option"
                                    aria-selected={false}
                                    onClick={() => handleLangSelect(null)}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handleLangSelect(null)}
                                    style={{ color: 'var(--error)' }}
                                >
                                    <X size={14} style={{ marginRight: '4px' }} /> Turn off translation
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Video area */}
            <div className="video-area" aria-label="Live stream video player">
                <video
                    className="stream-video"
                    src={`${process.env.PUBLIC_URL}/speed-ethio-live.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="video-overlay">
                    <div className="demo-badge" aria-hidden="true">DEMO</div>
                    <div className="video-center">
                        <span className="live-badge" aria-label="Live broadcast">LIVE</span>
                        <span className="viewer-count">287,432 watching</span>
                    </div>
                    <div className="video-streamer">
                        <div className="streamer-avatar" aria-hidden="true">iS</div>
                        <span className="streamer-name-label">iShowSpeed</span>
                        <BadgeCheck size={16} className="verified-badge" aria-label="Verified creator" />
                    </div>
                </div>
            </div>

            {/* Translation active banner */}
            {preferredLang !== null && (
                <div 
                    className="translate-banner" 
                    role="status" 
                    aria-live="polite"
                >
                    <span><Globe size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Translating to {preferredLang === 'en' ? 'English' : 'Amharic'}</span>
                    <button
                        className="translate-close-btn"
                        onClick={() => setPreferredLang(null)}
                        aria-label="Turn off translation"
                        type="button"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Chat messages */}
            <section 
                className="chat-container" 
                aria-label="Live chat messages"
                role="log"
                aria-live="polite"
            >
                <h2 className="chat-panel-header">Live Chat</h2>
                {visibleMessages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        username={msg.username}
                        message={msg.original}
                        language={msg.lang}
                        translatedMessage={translations[msg.id] || null}
                        flag={msg.avatar}
                        preferredLang={preferredLang}
                    />
                ))}
                <div ref={chatEndRef} aria-hidden="true" />
            </section>

            {/* Chat input bar */}
            <div className="chat-input-bar">
                <label htmlFor="chat-input" className="visually-hidden">
                    Type a chat message
                </label>
                <input
                    id="chat-input"
                    className="chat-input"
                    type="text"
                    placeholder="Say something..."
                    readOnly
                    aria-label="Chat message input (demo mode)"
                />
                <button 
                    className="send-btn" 
                    aria-label="Send gift"
                    type="button"
                >
                    <Gift size={18} />
                </button>
            </div>

            {/* Visually hidden styles for accessibility */}
            <style>{`
                .visually-hidden {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
            `}</style>
        </div>
    );
}

export default StreamView;
