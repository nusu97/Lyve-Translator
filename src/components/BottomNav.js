import React from 'react';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            <button className="nav-item" aria-label="Home" type="button">
                <span className="nav-icon" aria-hidden="true"><Home size={20} /></span>
                <span className="nav-label">Home</span>
            </button>
            <button className="nav-item" aria-label="Discover content" type="button">
                <span className="nav-icon" aria-hidden="true"><Search size={20} /></span>
                <span className="nav-label">Discover</span>
            </button>
            <button className="nav-item nav-live" aria-label="Go live" type="button">
                <span className="nav-live-btn" aria-hidden="true"><Plus size={24} /></span>
            </button>
            <button className="nav-item" aria-label="Inbox messages" type="button">
                <span className="nav-icon" aria-hidden="true"><MessageSquare size={20} /></span>
                <span className="nav-label">Inbox</span>
            </button>
            <button 
                className="nav-item active" 
                aria-label="Profile" 
                aria-current="page"
                type="button"
            >
                <span className="nav-icon" aria-hidden="true"><User size={20} /></span>
                <span className="nav-label">Profile</span>
            </button>
        </nav>
    );
}

export default BottomNav;
