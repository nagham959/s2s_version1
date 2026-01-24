import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Import all pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import SignToVoicePage from './pages/SignToVoicePage';
import VoiceToAvatarPage from './pages/VoiceToAvatarPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile-settings" element={<ProfileSettingsPage />} />
        <Route path="/sign-to-voice" element={<SignToVoicePage />} />
        <Route path="/voice-to-avatar" element={<VoiceToAvatarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
