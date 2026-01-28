import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear errors when user types
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;

        // Basic Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('يرجى ملء جميع الحقول.');
            return;
        }

        if (newPassword.length < 8) {
            setError('يجب أن تتكون كلمة المرور الجديدة من 8 أحرف على الأقل.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('كلمة المرور الجديدة غير متطابقة.');
            return;
        }

        // Simulate API Call
        setError('');
        setSuccess('تم تغيير كلمة المرور بنجاح.');

        // Reset form after success (optional)
        setTimeout(() => {
            setSuccess('');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        }, 3000);
    };

    return (
        <ThemeProvider>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white">
                <Navbar
                    variant="dashboard"
                    logo="مترجم الإشارة"
                    userProfile="https://lh3.googleusercontent.com/aida-public/AB6AXuDGZQ2Lpmsf2wWPOWbV1NwlSV8apne6XJ1_XsdsDMPhMvbqdiB66HO7PwhmU_DZTGa6XlUQi5NVf0ujJTsRg4xtUU-6Wpwu1Szn_yfiAymfFaKdYMd8GtdBtqSVa2dEtUo31mAq1yjcN548LRNthF2qQ3SvvYs8XgIPbGqY_6lqeleuYwzMPOEvLLIY7inFcwQ0YfJMkt5hTPtZRHcnrLG52YPO27f3HamgyAdtmNaRMhqerd6BtQXWBQd7qpEIe_cy5RZwIEhYib8"
                />
                <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                    <div className="max-w-xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">تغيير كلمة المرور</h1>

                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-2 border border-red-100 dark:border-red-800">
                                    <span className="material-symbols-outlined">error</span>
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-sm font-medium flex items-center gap-2 border border-green-100 dark:border-green-800">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        كلمة المرور الحالية
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="أدخل كلمة المرور الحالية"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        كلمة المرور الجديدة
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="أدخل كلمة المرور الجديدة (8 أحرف على الأقل)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        تأكيد كلمة المرور
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="أعد إدخال كلمة المرور الجديدة"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:translate-y-0.5 mt-2"
                                >
                                    حفظ التغييرات
                                </button>
                            </form>
                        </div>
                    </div>

                </main>
                <Sidebar variant="mobile" activeItem="settings" />
            </div>
        </ThemeProvider>
    );
};

export default ChangePasswordPage;
