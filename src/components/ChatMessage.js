import React from 'react';
import './ChatMessage.css';

function ChatMessage({ username, message, language, translatedMessage, flag, preferredLang }) {
    const langBadge = language === 'en' ? 'EN' : language === 'am' ? 'AM' : language.toUpperCase();
    const showTranslation = preferredLang !== null && language !== preferredLang && translatedMessage;

    return (
        <div className="chat-message">
            <div className="chat-msg-top">
                <span className="chat-flag">{flag}</span>
                <span className="chat-username">{username}</span>
                <span className="lang-badge">{langBadge}</span>
            </div>
            <p className="chat-text">{message}</p>
            {showTranslation && (
                <p className="chat-translated">↳ {translatedMessage}</p>
            )}
        </div>
    );
}

export default ChatMessage;
