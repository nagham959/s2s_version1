import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import VerifyEmailPage from "./pages/verifyEmailPage";
import HistoryPage from "./pages/HistoryPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import GlobalAvatarAssistant from "./components/GlobalAvatarAssistant";
import PrivateRoute from "./routes/PrivateRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HistoryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/verifyEmail" element={<VerifyEmailPage />} />

              <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              <Route path="/resetPassword" element={<ResetPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                  path="/profile-settings"
                  element={<ProfileSettingsPage />}
                />
                <Route
                  path="/change-password"
                  element={<ChangePasswordPage />}
                />
                <Route path="/history" element={<HistoryPage />} />
              </Route>
            </Routes>
            <GlobalAvatarAssistant />
          </Router>
        </HistoryProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
