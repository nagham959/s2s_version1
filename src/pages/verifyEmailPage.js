// VerifyEmailPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://s2s-1d5c94958ff6.herokuapp.com';

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';

  // جيب الإيميل من الـ state (من صفحة Register) أو من query param
  const email = location.state?.email || new URLSearchParams(location.search).get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate('/signup'); // لو مفيش إيميل → رجّعه للتسجيل
    }
  }, [email, navigate]);

  // Countdown لإعادة الإرسال
  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
  }, [resendDisabled, countdown]);

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== '') return; // أرقام بس

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const code = otp.join('');
    if (code.length !== 6) return setErrorMessage(t('verifyEmail.errorLength'));

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/Auth/VerifyEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || t('verifyEmail.errorInvalid'));
      }

      setSuccessMessage(t('verifyEmail.success'));
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setErrorMessage(err.message || t('common.error'));
    }
  };

  const handleResend = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setErrorMessage('');
    setSuccessMessage(t('verifyEmail.resendSending'));

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/Auth/ResendOtp?email=${encodeURIComponent(email)}`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error(t('verifyEmail.resendFailed'));

      setSuccessMessage(t('verifyEmail.resendSuccess'));
    } catch (err) {
      setErrorMessage(err.message || t('common.error'));
      setResendDisabled(false);
    }
  };

  return (
    <ThemeProvider>
      <div
        dir={dir}
        className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased transition-colors duration-300"
      >
        <Navbar variant="auth" logo="SignaryAI" />

        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
          {/* نفس الخلفية الجمالية */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-[#F2593D]/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative w-full max-w-[440px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark z-10 overflow-hidden flex flex-col transition-colors">
            <div className="pt-8 px-8 pb-2 text-center">
              <h2 className={`text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 ${textStart}`}>
                {t('verifyEmail.title')}
              </h2>
              <p className={`text-slate-500 dark:text-text-secondary text-sm ${textStart}`}>
                {t('verifyEmail.subtitle')}
                <br />
                <strong>{email || t('verifyEmail.emailPlaceholder')}</strong>
              </p>
            </div>

            <form className="p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 md:gap-4" dir="ltr" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-14 text-center text-2xl font-bold border border-border-light dark:border-border-dark rounded-xl bg-background-light dark:bg-input-bg-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Errors & Success */}
              {errorMessage && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-600">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-[#F2593D]/20 hover:shadow-[#F2593D]/40 transition-all active:scale-[0.98] focus-visible-ring flex items-center justify-center gap-2 disabled:opacity-60"
                disabled={otp.join('').length !== 6}
              >
                {t('verifyEmail.submit')}
              </button>

              <div className={`text-center text-sm text-slate-500 dark:text-text-secondary ${textStart}`}>
                {t('verifyEmail.noCode')}{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendDisabled}
                  className={`font-bold text-primary hover:text-primary-hover focus-visible-ring ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {resendDisabled ? t('verifyEmail.resendCountdown', { countdown }) : t('verifyEmail.resend')}
                </button>
              </div>
            </form>

            <div className={`bg-slate-50 dark:bg-black/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center text-sm text-slate-500 dark:text-text-secondary ${textStart}`}>
              {t('verifyEmail.backTo')}{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-bold text-primary hover:text-primary-hover hover:underline focus-visible-ring"
              >
                {t('verifyEmail.login')}
              </button>
            </div>
          </div>
        </main>

        <Footer variant="auth" />
      </div>
    </ThemeProvider>
  );
};

export default VerifyEmailPage;