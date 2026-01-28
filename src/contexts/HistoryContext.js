import React, { createContext, useState, useContext, useEffect } from 'react';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const [historyItems, setHistoryItems] = useState(() => {
        try {
            const saved = localStorage.getItem('translationHistory');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load history', e);
        }
        // Default Mock Data for initial state if empty
        return [
            {
                id: 1,
                type: 'voice-to-avatar',
                duration: '02:14 دقيقة',
                date: 'الآن',
                status: 'completed',
                label: 'صوت إلى إشارة',
                preview: 'مرحباً، أنا أقوم باختبار ميزة الترجمة...'
            },
            {
                id: 2,
                type: 'sign-to-voice',
                duration: '05:45 دقيقة',
                date: 'أمس، 4:30 م',
                status: 'archived',
                label: 'إشارة إلى صوت',
                preview: 'محادثة حول حجز تذاكر القطار'
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('translationHistory', JSON.stringify(historyItems));
    }, [historyItems]);

    const addHistoryItem = (item) => {
        const now = new Date();
        const formattedDate = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'م' : 'ص'}`;

        const newItem = {
            id: Date.now(),
            date: formattedDate,
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
