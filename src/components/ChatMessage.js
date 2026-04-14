import React from 'react';
import './ChatMessage.css';

function ChatMessage({ username, message, language, translatedMessage, flag, preferredLang, isOwn }) {
    const langBadge = language === 'en' ? 'EN' : language === 'am' ? 'AM' : language.toUpperCase();
    const langLabel = language === 'en' ? 'English' : language === 'am' ? 'Amharic' : language;
    const showTranslation = preferredLang !== null && language !== preferredLang && translatedMessage;

    return (
        <article
            className="chat-message"
            aria-label={`Message from ${username}`}
        >
            <div className="chat-msg-top">
                <span className="chat-flag" aria-hidden="true">{flag}</span>
                <span className="chat-username">{username}{isOwn && <span className="you-badge"> (You)</span>}</span>
                <span
                    className={`lang-badge ${language}`}
                    aria-label={`Written in ${langLabel}`}
                >
                    {langBadge}
                </span>
            </div>
            <p className="chat-text">{message}</p>
            {showTranslation && (
                <p
                    className="chat-translated"
                    aria-label={`Translated to ${preferredLang === 'en' ? 'English' : 'Amharic'}`}
                >
                    {translatedMessage}
                </p>
            )}
        </article>
    );
}

export default ChatMessage;
