import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useHistory } from '../contexts/HistoryContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('sign-to-voice'); // 'sign-to-voice' or 'voice-to-avatar'

  // Interactivity States
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { historyItems, addHistoryItem } = useHistory();
  const startTimeRef = useRef(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ar-SA';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Append new final results to existing text, or show interim
        if (finalTranscript) {
          setOutputText(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          // Restart if it stopped but shouldn't have (optional, usually manual stop is better for control)
          // recognitionRef.current.start(); 
          // For now, let's treat end as stop
          setIsRecording(false);
        }
      };
    } else {
      console.log('Speech Recognition Not Supported');
    }
  }, []);

  // Camera Handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        startTimeRef.current = Date.now();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);

      // Add to history
      const duration = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0;
      if (duration > 1) { // Only record sessions longer than 1 second
        addHistoryItem({
          type: 'sign-to-voice',
          duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')} دقيقة`,
          label: 'إشارة إلى صوت',
          preview: outputText || 'ترجمة لغة إشارة'
        });
      }
    }
  };

  // Recording Logic
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      setIsTranslating(false);

      // Add to history
      const duration = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0;
      addHistoryItem({
        type: mode,
        duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')} دقيقة`,
        label: mode === 'sign-to-voice' ? 'إشارة إلى صوت' : 'صوت إلى إشارة',
        preview: outputText || 'ترجمة صوتية'
      });
    } else {
      setOutputText(''); // Reset text on new recording
      startTimeRef.current = Date.now();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
          setIsTranslating(true);
        } catch (e) {
          console.error("Error starting recognition:", e);
        }
      } else {
        alert("المتصفح لا يدعم التعرف على الصوت.");
      }
    }
  };

  // Clean up on unmount or mode change
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const toggleMode = () => {
    setMode(prev => prev === 'sign-to-voice' ? 'voice-to-avatar' : 'sign-to-voice');
    setIsRecording(false);
    setIsTranslating(false);
    setOutputText('');
    stopCamera(); // Ensure camera stops when switching modes manually
  };

  return (
    <ThemeProvider>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white">
        <Navbar
          variant="dashboard"
          logo="SignaryAI"
          userProfile="https://lh3.googleusercontent.com/aida-public/AB6AXuDGZQ2Lpmsf2wWPOWbV1NwlSV8apne6XJ1_XsdsDMPhMvbqdiB66HO7PwhmU_DZTGa6XlUQi5NVf0ujJTsRg4xtUU-6Wpwu1Szn_yfiAymfFaKdYMd8GtdBtqSVa2dEtUo31mAq1yjcN548LRNthF2qQ3SvvYs8XgIPbGqY_6lqeleuYwzMPOEvLLIY7inFcwQ0YfJMkt5hTPtZRHcnrLG52YPO27f3HamgyAdtmNaRMhqerd6BtQXWBQd7qpEIe_cy5RZwIEhYib8"
        />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* Translation Mode Toggle Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 text-center">
                <button
                  onClick={() => setMode('sign-to-voice')}
                  className={`text-lg font-bold px-6 py-2 rounded-xl transition-colors ${mode === 'sign-to-voice' ? 'text-primary bg-primary/10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                >
                  لغة الإشارة
                </button>
              </div>

              <button
                onClick={toggleMode}
                className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mx-4 group relative"
                title="تبديل الاتجاه"
              >
                <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors text-2xl transform duration-500 ${mode === 'voice-to-avatar' ? 'rotate-180' : ''}`}>swap_horiz</span>
              </button>

              <div className="flex-1 text-center">
                <button
                  onClick={() => setMode('voice-to-avatar')}
                  className={`text-lg font-bold px-6 py-2 rounded-xl transition-colors ${mode === 'voice-to-avatar' ? 'text-primary bg-primary/10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                >
                  صوت / إشارة
                </button>
              </div>
            </div>
            {/* Progress Bar/Indicator */}
            <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
              <div className={`absolute top-0 h-full bg-primary w-1/2 transition-all duration-300 ease-in-out ${mode === 'voice-to-avatar' ? 'left-0' : 'left-1/2'}`}></div>
            </div>
          </div>

          {/* Main Translation Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 min-h-[600px]">

            {/* SIGN TO VOICE MODE UI */}
            {mode === 'sign-to-voice' && (
              <>
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Camera Component */}
                  <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 group">
                    {/* Live Video Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Fallback Image if Camera Not Active */}
                    {!isCameraActive && (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-90"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCveAY_GA5lNGzRGPoVE3DMEfwA07o8nviCXHP8JnCCBKnqiFIdn4TMD3ywlWCGuSTtI_kyNMvOi3q4LQ2r8OaoYYEmyJBJ4jPkUAuD63n_nPPoflZhmKOK7Jswv0eDjoi9ngPojI4ywwYYJgtArXg_aJ55Qbmyj9QR8E9fSGccsuJFwjfbQSqPFOvSqU_yCFKuafipOzufmk5YwPCesCfRf1X4HSHSd165r6gDjs0dknceZqMr7Jz-WA8rmM0TosXgpwI6ri2CBnY')", transform: 'scaleX(-1)' }}
                        alt="Live camera feed showing a person using sign language"
                      ></div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="absolute w-32 h-32 border-2 border-primary/60 rounded-xl top-1/4 right-1/3 opacity-40 shadow-[0_0_15px_rgba(242,89,61,0.3)]"></div>
                      <div className="absolute w-32 h-32 border-2 border-primary/60 rounded-xl bottom-1/3 left-1/3 opacity-40 shadow-[0_0_15px_rgba(242,89,61,0.3)]"></div>
                    </div>
                    <div className="absolute top-6 right-6 flex gap-3">
                      <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm transition-opacity ${isCameraActive ? 'opacity-100' : 'opacity-50'}`}>
                        <span className={`material-symbols-outlined text-green-500 text-sm filled ${isCameraActive ? 'animate-pulse' : ''}`}>radio_button_checked</span>
                        {isCameraActive ? 'تتبع نشط' : 'الكاميرا متوقفة'}
                      </div>
                      {isRecording && (
                        <div className="bg-red-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-red-600 shadow-sm animate-pulse">
                          <span className="material-symbols-outlined text-white text-sm">fiber_manual_record</span>
                          جاري التسجيل
                        </div>
                      )}
                    </div>
                    <div className="absolute top-6 left-6 flex gap-2">
                      <button
                        onClick={() => {
                          if (document.fullscreenElement) {
                            document.exitFullscreen();
                          } else {
                            videoRef.current?.requestFullscreen();
                          }
                        }}
                        className="bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md text-slate-700 dark:text-white size-10 rounded-full flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">fullscreen</span>
                      </button>
                    </div>

                    {/* Subtitle Overlay */}
                    {outputText && (
                      <div className="absolute bottom-6 w-full flex justify-center pointer-events-none">
                        <div className="bg-black/70 backdrop-blur-md px-6 py-2 rounded-xl border border-white/5 text-white/90 text-lg font-medium shadow-xl transition-all duration-300 transform translate-y-0">
                          {outputText.split(' ').slice(-5).join(' ')}...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <button
                      onClick={isCameraActive ? stopCamera : startCamera}
                      className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${isCameraActive ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-primary text-white border border-primary hover:bg-primary-hover'}`}
                    >
                      <span className="material-symbols-outlined text-2xl">{isCameraActive ? 'videocam_off' : 'videocam'}</span>
                      <span>{isCameraActive ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}</span>
                    </button>
                  </div>
                </div>

                {/* Output Panel (Live Text) */}
                <div className="lg:col-span-4 flex flex-col h-[600px] lg:h-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">translate</span>
                      <h3 className="font-bold text-slate-800 dark:text-white">النص المباشر</h3>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => navigator.clipboard.writeText(outputText)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" title="نسخ النص"
                      >
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                      <button
                        onClick={() => setOutputText('')}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors" title="مسح"
                      >
                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto space-y-6 font-display scrollbar-hide bg-white dark:bg-slate-800">
                    {outputText ? (
                      <div className="relative pr-4 border-r-4 border-primary bg-slate-50 dark:bg-slate-700 p-3 rounded-l-lg animate-fade-in">
                        <p className="text-xl font-semibold leading-relaxed text-slate-900 dark:text-white">
                          {outputText}
                          {isTranslating && <span className="inline-block w-2 h-5 mr-1 bg-primary animate-pulse align-middle rounded-full"></span>}
                        </p>
                        {isTranslating && (
                          <div className="mt-3 flex gap-2 items-center">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-75"></div>
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-150"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">جاري الترجمة</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-50">
                        <span className="material-symbols-outlined text-4xl mb-2">subtitles</span>
                        <p>سيظهر النص المترجم هنا...</p>
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-700/80">
                    <button className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-[#d93d20] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                      <span className="material-symbols-outlined">volume_up</span>
                      تشغيل الصوت
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* VOICE TO AVATAR MODE UI */}
            {mode === 'voice-to-avatar' && (
              <>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Mic / Input */}
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg flex flex-col items-center gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary to-primary-light"></div>
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="flex flex-col items-center gap-4 mt-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{isRecording ? 'جاري الاستماع...' : 'جاهز للتسجيل'}</span>
                      <div className="relative group cursor-pointer" onClick={toggleRecording}>
                        <button className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full text-white shadow-[0_0_30px_rgba(242,89,61,0.3)] transition-all duration-300 border-4 ${isRecording ? 'bg-red-500 border-red-200 scale-110' : 'bg-primary border-white dark:border-slate-800 hover:bg-primary-light hover:scale-105'}`}>
                          <span className="material-symbols-outlined text-5xl">{isRecording ? 'stop' : 'mic'}</span>
                        </button>
                        {isRecording && (
                          <div className="absolute top-0 left-0 h-full w-full rounded-full bg-primary/30 animate-[ping_1.5s_ease-in-out_infinite] opacity-75"></div>
                        )}
                        {!isRecording && (
                          <div className="absolute top-0 left-0 h-full w-full rounded-full bg-primary/10 group-hover:animate-ping opacity-50 delay-75"></div>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{isRecording ? 'تحدث الآن' : 'اضغط للبدء في التحدث'}</p>
                    </div>

                    {/* Audio Visualizer Mockup */}
                    <div className={`flex items-end justify-center gap-1.5 h-16 w-full px-8 transition-opacity duration-300 ${isRecording ? 'opacity-100' : 'opacity-30'}`}>
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 bg-primary/80 rounded-full ${isRecording ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : ''}`}
                          style={{ height: `${isRecording ? Math.random() * 3 + 1 : 1}rem`, animationDelay: `${i * 100}ms` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Live Text Output for Voice */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">النص المباشر</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors ${isRecording ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                        {isRecording ? 'نشط' : 'خامل'}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm min-h-[220px] relative bg-slate-50/50 dark:bg-slate-700/50">
                      {outputText ? (
                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-light text-right animate-fade-in">
                          "{outputText}"
                          {isRecording && <span className="inline-block w-1 h-5 mr-1 align-middle bg-primary animate-pulse"></span>}
                        </p>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-50 text-sm">
                          تحدث ليظهر النص هنا...
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <button
                          onClick={() => setOutputText('')}
                          className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-sm">restart_alt</span> إعادة تعيين
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(outputText)}
                          className="text-xs font-medium text-primary hover:text-primary-dark flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span> نسخ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Avatar Preview */}
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-700">
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600" title="ملء الشاشة">
                          <span className="material-symbols-outlined">fullscreen</span>
                        </button>
                      </div>
                    </div>
                    <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-700 group overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply dark:mix-blend-normal"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4LUVr1snRfxJz_VuBODhdrn6FEtaOsajNvOommZgpmQxaJcDEdyX1pvfU8FN2pO_jSlT2jEow_ETBX6Dsm9ZFHGDuITFon-NAwl7yzDPtL2BS_npngEaSmChDT68K-U0nUEDLFsQH8-sIZWl_xkPEhNo2h__-mBPUYzV57Of7Te34P5T63yXHM4p8hwXxDjPJ1pxaTyIECccwxoFnLbNAvRL-UWPKU9QAoel7GwxTzPrebhvxApXfYhyKL8GICXyvhADNZwXd6bQ')" }}
                        alt="Background gradient"
                      ></div>
                      <div className="absolute inset-0 flex items-end justify-center z-10">
                        <div
                          className="h-[95%] w-auto aspect-[3/4] bg-contain bg-bottom bg-no-repeat drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform duration-500"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzxzL9Xm4G71Z5QYK21bhY7iWJ772VkrpxzNlXPa-0ZcXAVPOvAODyIuv5WRrJpBwHGeA1JptyPf_kQIxvp0CwjqK07_pQinAOEG8mxG8GFHI7OS2L0mwIPflseYMkx7fVCxymxSkXbRsf0wjI5IxfS3MEXgcTPN0g-blyysZMewIb2DaEA2JWtNxzSP93aaFd5hBU7y6LbV-ce-wPbrNNRdKqnaD-3LJbimcN-AAAKbdgpH5x_tMTuHY2MuScYybp1Lh0_dr8CnU')" }}
                          alt="3D animated avatar"
                        ></div>
                      </div>
                      <div className={`absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 transition-opacity duration-300 z-20 pointer-events-none ${isTranslating ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full p-5 shadow-2xl border border-white/50 dark:border-slate-700 transform rotate-180">
                          <span className={`material-symbols-outlined text-5xl text-primary ${isTranslating ? 'animate-pulse' : ''}`}>play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 flex flex-col md:flex-row items-center justify-center gap-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:translate-y-0.5 border border-primary">
                          <span className="material-symbols-outlined transform rotate-180">play_circle</span>
                          <span>تشغيل</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">النشاط الأخير</h3>
              <Link to="/history" className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1">
                عرض السجل الكامل <span className="material-symbols-outlined text-sm">chevron_left</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">النوع</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">المدة/الحجم</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">التاريخ</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-left">الحالة</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {historyItems.slice(0, 5).map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-t border-slate-100 dark:border-slate-700">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg border ${item.type === 'voice-to-avatar' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800' : 'bg-primary/10 text-primary border-primary/20'}`}>
                            <span className="material-symbols-outlined text-lg">{item.type === 'voice-to-avatar' ? 'mic' : 'camera_alt'}</span>
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">{item.label}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-slate-500 dark:text-slate-400">{item.duration}</td>
                      <td className="py-4 px-2 text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="py-4 px-2 text-left">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'}`}>
                          {item.status === 'completed' ? 'مكتمل' : 'مؤرشف'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">لا يوجد نشاط أخير</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <Sidebar variant="mobile" activeItem="dashboard" />
      </div>
    </ThemeProvider>
  );
};

export default DashboardPage;
