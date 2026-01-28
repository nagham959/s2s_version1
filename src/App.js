import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Import all pages
import { ThemeProvider } from './contexts/ThemeContext';
import { HistoryProvider } from './contexts/HistoryContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile-settings" element={<ProfileSettingsPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Routes>
        </Router>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;
