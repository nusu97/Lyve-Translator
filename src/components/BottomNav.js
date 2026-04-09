import React from 'react';
import './BottomNav.css';

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <div className="nav-item">
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
            </div>
            <div className="nav-item">
                <span className="nav-icon">🔍</span>
                <span className="nav-label">Discover</span>
            </div>
            <div className="nav-item nav-live">
                <span className="nav-live-btn">+</span>
            </div>
            <div className="nav-item">
                <span className="nav-icon">💬</span>
                <span className="nav-label">Inbox</span>
            </div>
            <div className="nav-item active">
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
            </div>
        </nav>
    );
}

export default BottomNav;
