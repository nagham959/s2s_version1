import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { useHistory } from '../contexts/HistoryContext';

const HistoryPage = () => {
    const [filter, setFilter] = useState('all'); // 'all', 'sign-to-voice', 'voice-to-avatar'
    const { historyItems, deleteHistoryItem } = useHistory();

    // Handle Delete
    const handleDelete = (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا السجل؟')) {
            deleteHistoryItem(id);
        }
    };
    // Filter Logic
    const filteredItems = historyItems.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    return (
        <ThemeProvider>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white">
                <Navbar
                    variant="dashboard"
                    logo="SignaryAI"
                    userProfile="https://lh3.googleusercontent.com/aida-public/AB6AXuDGZQ2Lpmsf2wWPOWbV1NwlSV8apne6XJ1_XsdsDMPhMvbqdiB66HO7PwhmU_DZTGa6XlUQi5NVf0ujJTsRg4xtUU-6Wpwu1Szn_yfiAymfFaKdYMd8GtdBtqSVa2dEtUo31mAq1yjcN548LRNthF2qQ3SvvYs8XgIPbGqY_6lqeleuYwzMPOEvLLIY7inFcwQ0YfJMkt5hTPtZRHcnrLG52YPO27f3HamgyAdtmNaRMhqerd6BtQXWBQd7qpEIe_cy5RZwIEhYib8"
                />
                <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">سجل الترجمة</h1>
                            <p className="text-slate-500 dark:text-slate-400">تابع جميع نشاطات الترجمة السابقة وقم بإدارتها.</p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                            >
                                الكل
                            </button>
                            <button
                                onClick={() => setFilter('sign-to-voice')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'sign-to-voice' ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                            >
                                إشارة إلى صوت
                            </button>
                            <button
                                onClick={() => setFilter('voice-to-avatar')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'voice-to-avatar' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                            >
                                صوت إلى إشارة
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        <th className="py-4 px-6 font-semibold rounded-tr-2xl">النشاط</th>
                                        <th className="py-4 px-6 font-semibold">التاريخ</th>
                                        <th className="py-4 px-6 font-semibold">المعاينة</th>
                                        <th className="py-4 px-6 font-semibold">الحالة</th>
                                        <th className="py-4 px-6 font-semibold rounded-tl-2xl">الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => (
                                            <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2.5 rounded-xl border ${item.type === 'voice-to-avatar' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                                            <span className="material-symbols-outlined text-xl">{item.type === 'voice-to-avatar' ? 'mic' : 'camera_alt'}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 dark:text-white text-sm">{item.label}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.duration}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.date}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] truncate" title={item.preview}>
                                                        {item.preview}
                                                    </p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${item.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' :
                                                        item.status === 'archived' ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600' :
                                                            'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'completed' ? 'bg-green-500' :
                                                            item.status === 'archived' ? 'bg-slate-500' :
                                                                'bg-red-500'
                                                            }`}></span>
                                                        {item.status === 'completed' ? 'مكتمل' : item.status === 'archived' ? 'مؤرشف' : 'فشل'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-500 shadow-sm" title="عرض التفاصيل">
                                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-500 shadow-sm"
                                                            title="حذف"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-slate-500 dark:text-slate-400">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-full">
                                                        <span className="material-symbols-outlined text-4xl text-slate-400">history</span>
                                                    </div>
                                                    <p>لا توجد سجلات مطابقة للفلتر المحدد.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Mockup */}
                        <div className="border-t border-slate-100 dark:border-slate-700 p-4 flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                عرض {filteredItems.length} من {historyItems.length} سجل
                            </span>
                            <div className="flex gap-2">
                                <button disabled className="px-3 py-1.5 text-sm font-medium text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg cursor-not-allowed opacity-50">السابق</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">التالي</button>
                            </div>
                        </div>
                    </div>
                </main>
                <Sidebar variant="mobile" activeItem="history" />
            </div>
        </ThemeProvider>
    );
};

export default HistoryPage;
