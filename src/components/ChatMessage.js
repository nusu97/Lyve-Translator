import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message, translateOn }) {
    const isEnglish = message.lang === 'en';
    const showTranslation = translateOn && !isEnglish;

    return (
        <div className="chat-message">
            <span className="chat-avatar">{message.avatar}</span>
            <div className="chat-body">
                <div className="chat-header">
                    <span className="chat-username">{message.username}</span>
                    <span className="chat-time">{message.timestamp}</span>
                </div>
                <div className="chat-text-wrapper">
                    {showTranslation ? (
                        <>
                            <p className="chat-text translated">{message.translated}</p>
                            <p className="chat-original">
                                <span className="lang-badge">{message.langLabel}</span>
                                {message.original}
                            </p>
                        </>
                    ) : (
                        <p className="chat-text">{message.original}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;
