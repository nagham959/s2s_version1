import React, { createContext, useState, useContext, useEffect } from 'react';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const [historyItems, setHistoryItems] = useState(() => {
        try {
            const version = localStorage.getItem('translationHistoryVersion');
            // If version is old or missing, clear old mock data
            if (version !== '2') {
                localStorage.removeItem('translationHistory');
                localStorage.setItem('translationHistoryVersion', '2');
                return [];
            }
            const saved = localStorage.getItem('translationHistory');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load history', e);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('translationHistory', JSON.stringify(historyItems));
    }, [historyItems]);

    const formatDate = (date) => {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        const timeStr = date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });

        if (diffMins < 1) return 'الآن';
        if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
        if (diffHours < 24) return `اليوم، ${timeStr}`;

        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) return `أمس، ${timeStr}`;

        return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) + `، ${timeStr}`;
    };

    const addHistoryItem = (item) => {
        const now = new Date();
        const newItem = {
            id: Date.now(),
            timestamp: now.toISOString(),
            date: formatDate(now),
            status: 'completed',
            ...item
        };
        setHistoryItems(prev => [newItem, ...prev]);
    };

    const deleteHistoryItem = (id) => {
        setHistoryItems(prev => prev.filter(item => item.id !== id));
    };

    const clearHistory = () => {
        setHistoryItems([]);
    };

    return (
        <HistoryContext.Provider value={{ historyItems, addHistoryItem, deleteHistoryItem, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
