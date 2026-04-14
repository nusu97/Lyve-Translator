import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext(null);

const RANDOM_NAMES = [
    'viewer', 'chatter', 'watcher', 'fan', 'guest', 'lurker', 'homie', 'fam',
];

const FLAGS = ['🇺🇸', '🇧🇷', '🇪🇹', '🇯🇵', '🇰🇷', '🇫🇷', '🇩🇪', '🇪🇬', '🇲🇽', '🇬🇧', '🇮🇳', '🇨🇳'];

function generateUsername() {
    const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    const num = Math.floor(Math.random() * 9999);
    return `${name}_${num}`;
}

function generateFlag() {
    return FLAGS[Math.floor(Math.random() * FLAGS.length)];
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // Check localStorage for persisted profile
                const storedProfile = localStorage.getItem(`profile_${firebaseUser.uid}`);
                if (storedProfile) {
                    setUser({ uid: firebaseUser.uid, ...JSON.parse(storedProfile) });
                } else {
                    const profile = { username: generateUsername(), flag: generateFlag() };
                    localStorage.setItem(`profile_${firebaseUser.uid}`, JSON.stringify(profile));
                    setUser({ uid: firebaseUser.uid, ...profile });
                }
            } else {
                // Not signed in — trigger anonymous auth
                signInAnonymously(auth).catch(console.error);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
