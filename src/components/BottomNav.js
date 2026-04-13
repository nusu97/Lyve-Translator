import React from 'react';
import { Home, Search, PlusCircle, Wallet, User } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            <button className="nav-item active" aria-label="Home" aria-current="page" type="button">
                <span className="nav-icon" aria-hidden="true"><Home size={22} /></span>
                <span className="nav-label">Home</span>
            </button>
            <button className="nav-item" aria-label="Explore content" type="button">
                <span className="nav-icon" aria-hidden="true"><Search size={22} /></span>
                <span className="nav-label">Explore</span>
            </button>
            <button className="nav-item nav-live" aria-label="Create" type="button">
                <span className="nav-live-btn" aria-hidden="true"><PlusCircle size={28} /></span>
                <span className="nav-label">Create</span>
            </button>
            <button className="nav-item" aria-label="Wallet" type="button">
                <span className="nav-icon" aria-hidden="true"><Wallet size={22} /></span>
                <span className="nav-label">Wallet</span>
            </button>
            <button 
                className="nav-item" 
                aria-label="Profile" 
                type="button"
            >
                <span className="nav-icon" aria-hidden="true"><User size={22} /></span>
                <span className="nav-label">Profile</span>
            </button>
        </nav>
    );
}

export default BottomNav;
