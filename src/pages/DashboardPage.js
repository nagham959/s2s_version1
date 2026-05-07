import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CWASAAvatarPlayer from '../components/CWASAAvatarPlayer';
import { useHistory } from '../contexts/HistoryContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/authContext';

const DashboardPage = () => {
  const { api } = useAuth();
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';
  const iconDir = isRtl ? 'flex-row-reverse' : 'flex-row';
  const [mode, setMode] = useState('sign-to-voice'); // 'sign-to-voice' or 'voice-to-avatar'
  const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text' (for voice-to-avatar)
  const [textInput, setTextInput] = useState(''); // typed text for text-to-avatar
  const [textInputError, setTextInputError] = useState('');

  // Interactivity States
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { historyItems, addHistoryItem } = useHistory();
  const startTimeRef = useRef(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [translationError, setTranslationError] = useState('');
  const [avatarSigml, setAvatarSigml] = useState('');
  const [avatarPlayNonce, setAvatarPlayNonce] = useState(0);

  // Video Upload Review Modal States
  const [pendingVideo, setPendingVideo] = useState(null);
  const [showVideoReviewModal, setShowVideoReviewModal] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const uploadAbortControllerRef = useRef(null);

  const keepArabicCharactersOnly = (value) => {
    // Keep Arabic script, Arabic/Latin digits, spaces, and common punctuation.
    return (value || '').replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s0-9٠-٩.,!?؟،؛:\-()\n]/g, '');
  };

  const isLikelySigml = (value) => {
    const xml = (value || '').trim().toLowerCase();
    return xml.startsWith('<sigml') || xml.includes('<sigml');
  };

  const formatDurationWithUnit = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs} ${t('dashboard.history.durationUnit')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const parseApiBody = (rawBody) => {
    if (!rawBody) return {};
    if (typeof rawBody === 'object') return rawBody;
    if (typeof rawBody === 'string') {
      try {
        return JSON.parse(rawBody);
      } catch (_error) {
        return {};
      }
    }
    return {};
  };

  const firstFilledValue = (obj, keys) => {
    for (const key of keys) {
      const value = obj?.[key];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
    return '';
  };

  const extractTranscript = (translation) => {
    const direct = firstFilledValue(translation, ['text', 'transcript', 'original_text', language]);
    if (direct) return direct;

    if (!translation || typeof translation !== 'object') return '';
    for (const value of Object.values(translation)) {
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
    return '';
  };

  const extractAudioUrl = (translation) => {
    return firstFilledValue(translation, ['audio_url', 'audioUrl']);
  };

  const extractApiErrorMessage = (error, fallback = 'Translation failed. Please try again.') => {
    const data = error?.response?.data;
    const body = parseApiBody(data);
    const message = body?.detail || body?.message || body?.title || error?.message || fallback;
    const text = String(message || '').trim();

    if (!text || /<!doctype|<html|<body|<pre/i.test(text)) {
      return fallback;
    }
    return text;
  };

  const resetAudioPlayer = () => {
    if (!audioPlayerRef.current) return;
    audioPlayerRef.current.pause();
    audioPlayerRef.current.src = '';
    audioPlayerRef.current.onended = null;
    audioPlayerRef.current.onplaying = null;
    audioPlayerRef.current.onpause = null;
    audioPlayerRef.current = null;
    setIsAudioPlaying(false);
    setIsAudioLoading(false);
  };

  const translateSignVideo = async (videoFile) => {
    if (!videoFile) return;

    const languageCode = language === 'ar' ? 'ar' : 'en';
    setIsTranslating(true);
    setTranslationError('');
    resetAudioPlayer();
    setAudioUrl('');

    try {
      const signToTextForm = new FormData();
      signToTextForm.append('video_file', videoFile, videoFile.name || `video-${Date.now()}.webm`);
      signToTextForm.append('language', languageCode);
      signToTextForm.append('include_audio', 'true');

      const signToTextResponse = await api.post('/api/v1/Translate/sign-to-text', signToTextForm, {
        headers: { Accept: 'text/plain' },
      });
      const signToTextBody = parseApiBody(signToTextResponse.data);
      const signToTextTranslation = signToTextBody?.translation || {};

      const transcript = extractTranscript(signToTextTranslation);
      let nextAudioUrl = extractAudioUrl(signToTextTranslation);

      if (!nextAudioUrl) {
        const signToAudioForm = new FormData();
        signToAudioForm.append('video_file', videoFile, videoFile.name || `video-${Date.now()}.webm`);
        signToAudioForm.append('language', languageCode);
        signToAudioForm.append('include_audio', 'true');

        const signToAudioResponse = await api.post('/api/v1/Translate/audio-to-sign', signToAudioForm, {
          headers: { Accept: 'text/plain' },
        });
        const signToAudioBody = parseApiBody(signToAudioResponse.data);
        nextAudioUrl = extractAudioUrl(signToAudioBody?.translation || {});
      }

      if (!transcript) {
        throw new Error('No transcript returned from API.');
      }

      setOutputText(transcript);
      setAudioUrl(nextAudioUrl || '');
    } catch (error) {
      const message = extractApiErrorMessage(error);
      setTranslationError(message);
      setOutputText('');
      setAudioUrl('');
      console.error('Sign-to-voice translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const stopRecorder = (processRecordedVideo = true) => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === 'inactive') {
      recordedChunksRef.current = [];
      mediaRecorderRef.current = null;
      return;
    }

    recorder.onstop = () => {
      const chunks = [...recordedChunksRef.current];
      recordedChunksRef.current = [];
      mediaRecorderRef.current = null;

      if (!processRecordedVideo || chunks.length === 0) return;

      const blob = new Blob(chunks, { type: recorder.mimeType || 'video/webm' });
      if (!blob.size) return;

      const fileName = `camera-${Date.now()}.webm`;
      const recordedFile = new File([blob], fileName, { type: blob.type || 'video/webm' });
      void translateSignVideo(recordedFile);
    };

    try {
      recorder.requestData();
    } catch (_error) {
      // Some browsers do not support forcing a data flush.
    }
    recorder.stop();
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL and extract metadata
    const url = URL.createObjectURL(file);
    
    // Extract file metadata
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    };

    // Try to get video duration
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      metadata.duration = video.duration;
      setVideoMetadata(metadata);
    };
    video.onerror = () => {
      metadata.duration = null;
      setVideoMetadata(metadata);
    };
    video.src = url;

    // Store pending file and show review modal
    setPendingVideo({ file, url });
    setShowVideoReviewModal(true);
    e.target.value = '';
  };

  const handleConfirmVideoUpload = async () => {
    if (!pendingVideo) return;

    const { file, url } = pendingVideo;
    
    // Stop camera and reset states
    stopCamera({ processRecordedVideo: false, addSessionToHistory: false });
    setOutputText('');
    setTranslationError('');
    resetAudioPlayer();
    setAudioUrl('');
    
    // Set uploaded video and close modal
    setUploadedVideo(url);
    setShowVideoReviewModal(false);
    setPendingVideo(null);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = url;
      videoRef.current.play();
    }

    // Create AbortController for this upload
    uploadAbortControllerRef.current = new AbortController();
    setIsUploadingFile(true);
    setUploadProgress(0);

    try {
      await translateSignVideoWithProgress(file);
    } finally {
      setIsUploadingFile(false);
      setUploadProgress(0);
    }
  };

  const handleCancelVideoUpload = () => {
    if (pendingVideo) {
      URL.revokeObjectURL(pendingVideo.url);
    }
    setPendingVideo(null);
    setVideoMetadata(null);
    setShowVideoReviewModal(false);
  };

  const handleStopVideoUpload = () => {
    if (uploadAbortControllerRef.current) {
      uploadAbortControllerRef.current.abort();
      uploadAbortControllerRef.current = null;
    }
    setIsUploadingFile(false);
    setUploadProgress(0);
    setTranslationError(t('dashboard.upload.cancelled'));
  };

  const translateSignVideoWithProgress = async (videoFile) => {
    if (!videoFile) return;

    const languageCode = language === 'ar' ? 'ar' : 'en';
    setIsTranslating(true);
    setTranslationError('');
    resetAudioPlayer();
    setAudioUrl('');

    try {
      const signToTextForm = new FormData();
      signToTextForm.append('video_file', videoFile, videoFile.name || `video-${Date.now()}.webm`);
      signToTextForm.append('language', languageCode);
      signToTextForm.append('include_audio', 'true');

      const signToTextResponse = await api.post('/api/v1/Translate/sign-to-text', signToTextForm, {
        headers: { Accept: 'text/plain' },
        signal: uploadAbortControllerRef.current?.signal,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });
      const signToTextBody = parseApiBody(signToTextResponse.data);
      const signToTextTranslation = signToTextBody?.translation || {};

      const transcript = extractTranscript(signToTextTranslation);
      let nextAudioUrl = extractAudioUrl(signToTextTranslation);

      if (!nextAudioUrl) {
        const signToAudioForm = new FormData();
        signToAudioForm.append('video_file', videoFile, videoFile.name || `video-${Date.now()}.webm`);
        signToAudioForm.append('language', languageCode);
        signToAudioForm.append('include_audio', 'true');

        const signToAudioResponse = await api.post('/api/v1/Translate/audio-to-sign', signToAudioForm, {
          headers: { Accept: 'text/plain' },
          signal: uploadAbortControllerRef.current?.signal,
        });
        const signToAudioBody = parseApiBody(signToAudioResponse.data);
        nextAudioUrl = extractAudioUrl(signToAudioBody?.translation || {});
      }

      if (!transcript) {
        throw new Error('No transcript returned from API.');
      }

      setUploadProgress(100);
      setOutputText(transcript);
      setAudioUrl(nextAudioUrl || '');
    } catch (error) {
      if (error.name === 'AbortError') {
        setTranslationError(t('dashboard.upload.cancelled'));
      } else {
        const message = extractApiErrorMessage(error);
        setTranslationError(message);
        setOutputText('');
        setAudioUrl('');
      }
      console.error('Sign-to-voice translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePlayAvatarFromInput = () => {
    const xml = textInput.trim();
    if (!xml) {
      setTranslationError('Please paste SiGML XML before playing the avatar.');
      return;
    }

    if (!isLikelySigml(xml)) {
      setTranslationError('Input must be a valid SiGML XML containing a <sigml> root.');
      return;
    }

    setTranslationError('');
    setAvatarSigml(xml);
    setAvatarPlayNonce((prev) => prev + 1);
  };

  // Initialize Speech Recognition
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ar-SA';

      recognitionRef.current.onresult = (event) => {
        let allFinal = '';
        let interimTranscript = '';

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            allFinal += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        // Show all finalized text + current interim in textarea in real-time
        setTextInput((allFinal + interimTranscript).trim());
        setTextInputError('');
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Camera Handling
  const startCamera = async () => {
    try {
      if (uploadedVideo) {
        URL.revokeObjectURL(uploadedVideo);
        setUploadedVideo(null);
        if (videoRef.current) videoRef.current.src = '';
      }
      setOutputText('');
      setTranslationError('');
      resetAudioPlayer();
      setAudioUrl('');

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setIsRecording(true);
        startTimeRef.current = Date.now();
      }

      if (typeof MediaRecorder !== 'undefined') {
        try {
          const preferredMimeTypes = [
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/webm',
          ];
          const supportedMimeType = preferredMimeTypes.find((type) => MediaRecorder.isTypeSupported?.(type));
          const recorder = supportedMimeType
            ? new MediaRecorder(stream, { mimeType: supportedMimeType })
            : new MediaRecorder(stream);

          recordedChunksRef.current = [];
          recorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              recordedChunksRef.current.push(event.data);
            }
          };
          recorder.start(300);
          mediaRecorderRef.current = recorder;
        } catch (recordError) {
          console.error('Error starting video recorder:', recordError);
          setIsRecording(false);
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsRecording(false);
      setTranslationError('Unable to access camera.');
    }
  };

  const stopCamera = ({ processRecordedVideo = true, addSessionToHistory = true } = {}) => {
    stopRecorder(processRecordedVideo);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo);
      setUploadedVideo(null);
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    }
    setIsCameraActive(false);
    setIsRecording(false);

    if (addSessionToHistory) {
      const duration = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0;
      if (duration > 1) {
        addHistoryItem({
          type: 'sign-to-voice',
          duration: formatDurationWithUnit(duration),
          label: t('dashboard.history.label.signToVoice'),
          preview: outputText || t('dashboard.history.preview.sign')
        });
      }
    }
  };

  const toggleAudioPlayback = async () => {
    if (!audioUrl) return;

    try {
      if (audioPlayerRef.current && audioPlayerRef.current.src === audioUrl) {
        if (isAudioPlaying) {
          audioPlayerRef.current.pause();
          return;
        }

        setIsAudioLoading(true);
        await audioPlayerRef.current.play();
        return;
      }

      resetAudioPlayer();
      const player = new Audio(audioUrl);
      player.onplaying = () => {
        setIsAudioLoading(false);
        setIsAudioPlaying(true);
      };
      player.onpause = () => setIsAudioPlaying(false);
      player.onended = () => setIsAudioPlaying(false);

      audioPlayerRef.current = player;
      setIsAudioLoading(true);
      await player.play();
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsAudioLoading(false);
      setIsAudioPlaying(false);
      setTranslationError('Unable to play audio output.');
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
        duration: formatDurationWithUnit(duration),
        label: mode === 'sign-to-voice' ? t('dashboard.history.label.signToVoice') : t('dashboard.history.label.voiceToAvatar'),
        preview: outputText || (mode === 'sign-to-voice' ? t('dashboard.history.preview.voice') : t('dashboard.history.preview.sign'))
      });
    } else {
      setOutputText('');
      setTextInput(''); // Reset textarea on new recording
      setTextInputError('');
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
        alert(t('dashboard.errors.speechUnsupported'));
      }
    }
  };

  // Clean up on unmount or mode change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return () => {
      stopCamera({ addSessionToHistory: false });
      resetAudioPlayer();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMode = () => {
    setMode(prev => prev === 'sign-to-voice' ? 'voice-to-avatar' : 'sign-to-voice');
    setIsRecording(false);
    setIsTranslating(false);
    setOutputText('');
    setInputMode('voice');
    setTextInput('');
    setTextInputError('');
    setTranslationError('');
    setAvatarSigml('');
    setAvatarPlayNonce(0);
    resetAudioPlayer();
    setAudioUrl('');
    stopCamera({ addSessionToHistory: false });
  };

  return (
    <ThemeProvider>
      <div
        dir={dir}
        className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white"
      >
        <Navbar
          variant="dashboard"
          logo="SignaryAI"
          userProfile="https://lh3.googleusercontent.com/aida-public/AB6AXuDGZQ2Lpmsf2wWPOWbV1NwlSV8apne6XJ1_XsdsDMPhMvbqdiB66HO7PwhmU_DZTGa6XlUQi5NVf0ujJTsRg4xtUU-6Wpwu1Szn_yfiAymfFaKdYMd8GtdBtqSVa2dEtUo31mAq1yjcN548LRNthF2qQ3SvvYs8XgIPbGqY_6lqeleuYwzMPOEvLLIY7inFcwQ0YfJMkt5hTPtZRHcnrLG52YPO27f3HamgyAdtmNaRMhqerd6BtQXWBQd7qpEIe_cy5RZwIEhYib8"
        />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* Translation Mode Toggle Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <div className=" flex items-center justify-between p-4">
              <div className="flex-1 text-center">
                <button
                  onClick={() => setMode('sign-to-voice')}
                  className={`text-lg font-bold px-6 py-2 rounded-xl transition-colors ${mode === 'sign-to-voice' ? 'text-primary bg-primary/10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                >
                  {t('dashboard.mode.signToVoice')}
                </button>
              </div>

              <button
                onClick={toggleMode}
                className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mx-4 group relative"
                title={t('dashboard.mode.swap')}
              >
                <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors text-2xl transform duration-500 ${mode === 'voice-to-avatar' ? 'rotate-180' : ''}`}>swap_horiz</span>
              </button>

              <div className="flex-1 text-center">
                <button
                  onClick={() => setMode('voice-to-avatar')}
                  className={`text-lg font-bold px-6 py-2 rounded-xl transition-colors ${mode === 'voice-to-avatar' ? 'text-primary bg-primary/10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                >
                  {t('dashboard.mode.voiceToAvatar')}
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
                  <div className="relative w-full aspect-video max-h-[260px] sm:max-h-[360px] md:max-h-none bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 group">
                    {/* Live Video Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      controls={!!uploadedVideo}
                      className={`absolute inset-0 w-full h-full object-cover ${uploadedVideo ? '' : 'transform scale-x-[-1]'} ${(isCameraActive || uploadedVideo) ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Fallback Placeholder if Camera Not Active */}
                    {!isCameraActive && !uploadedVideo && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                        <div className="flex flex-col items-center gap-4">
                          <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" className="w-24 h-20 sm:w-32 sm:h-28 md:w-40 md:h-32 opacity-80">
                            {/* Camera body */}
                            <rect x="5" y="20" width="90" height="55" rx="10" ry="10" fill="#E8624A" />
                            {/* Viewfinder hump */}
                            <rect x="30" y="10" width="25" height="14" rx="5" ry="5" fill="#E8624A" />
                            {/* Flash dot */}
                            <circle cx="18" cy="30" r="5" fill="white" />
                            {/* Lens outer ring */}
                            <circle cx="55" cy="47" r="20" fill="#D4503A" />
                            {/* Lens middle ring */}
                            <circle cx="55" cy="47" r="14" fill="#E8624A" />
                            {/* Lens inner */}
                            <circle cx="55" cy="47" r="9" fill="#D4503A" />
                            {/* Lens center */}
                            <circle cx="55" cy="47" r="5" fill="#E8624A" />
                            {/* White ring highlight */}
                            <circle cx="55" cy="47" r="20" fill="none" stroke="white" strokeWidth="3" />
                            <circle cx="55" cy="47" r="9" fill="none" stroke="white" strokeWidth="2.5" />
                          </svg>
                          <div className="text-center">
                            <p className="text-slate-600 dark:text-slate-300 font-semibold text-sm sm:text-base">{t('dashboard.camera.placeholderTitle')}</p>
                            <p className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm mt-1">{t('dashboard.camera.placeholderSubtitle')}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-6 right-6 flex gap-3">
                      <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm transition-opacity ${(isCameraActive || uploadedVideo) ? 'opacity-100' : 'opacity-50'}`}>
                        <span className={`material-symbols-outlined text-green-500 text-sm filled ${isCameraActive ? 'animate-pulse' : ''}`}>radio_button_checked</span>
                        {isCameraActive ? t('dashboard.camera.tracking') : uploadedVideo ? t('dashboard.camera.upload') : t('dashboard.camera.off')}
                      </div>
                      {isRecording && (
                        <div className="bg-red-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-red-600 shadow-sm animate-pulse">
                          <span className="material-symbols-outlined text-white text-sm">fiber_manual_record</span>
                          {t('dashboard.recording.active')}
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
                  <div className="w-full mx-auto bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={isCameraActive ? stopCamera : startCamera}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg ${iconDir} ${isCameraActive ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-primary text-white border border-primary hover:bg-primary-hover'}`}
                    >
                      <span className="material-symbols-outlined text-2xl">{isCameraActive ? 'videocam_off' : 'videocam'}</span>
                      <span>{isCameraActive ? t('dashboard.controls.stopCamera') : t('dashboard.controls.startCamera')}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 ${iconDir}`}
                    >
                      <span className="material-symbols-outlined text-2xl">upload_file</span>
                      <span>{t('dashboard.controls.upload')}</span>
                    </button>
                  </div>
                </div>

                {/* Output Panel (Live Text) */}
                <div className="lg:col-span-4 flex flex-col h-[260px] sm:h-[360px] lg:h-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">translate</span>
                        <h3 className="font-bold text-slate-800 dark:text-white">{t('dashboard.transcript.title')}</h3>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => navigator.clipboard.writeText(outputText)}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed" title={t('dashboard.controls.copy')}
                          disabled={!outputText}
                      >
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                      <button
                        onClick={() => {
                          setOutputText('');
                          setTranslationError('');
                          resetAudioPlayer();
                          setAudioUrl('');
                        }}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors" title={t('dashboard.controls.clear')}
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
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('dashboard.transcript.translating')}</span>
                          </div>
                        )}
                      </div>
                    ) : translationError ? (
                      <div className="h-full rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-800/70 dark:bg-red-900/20 dark:text-red-300">
                        {translationError}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-50">
                        <span className="material-symbols-outlined text-4xl mb-2">subtitles</span>
                        <p>{t('dashboard.transcript.empty')}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-700/80">
                    <button
                      onClick={toggleAudioPlayback}
                      disabled={!audioUrl || isAudioLoading}
                      className={`w-full flex items-center justify-center gap-3 bg-primary hover:bg-[#d93d20] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] ${iconDir}`}
                    >
                      <span className="material-symbols-outlined">
                        {isAudioLoading ? 'hourglass_top' : isAudioPlaying ? 'pause' : 'volume_up'}
                      </span>
                      {t('dashboard.controls.playAudio')}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* VOICE TO AVATAR MODE UI */}
            {mode === 'voice-to-avatar' && (
              <>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Unified Input Panel */}
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">

                    {/* Mic Section */}
                    <div
                      className={`p-5 flex items-center gap-5 cursor-pointer transition-colors border-b border-slate-200 dark:border-slate-700 ${inputMode === 'voice' ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                      onClick={() => {
                        if (inputMode !== 'voice') {
                          setInputMode('voice');
                          setTextInput('');
                          setTextInputError('');
                          if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); setIsTranslating(false); }
                        }
                      }}
                    >
                      {/* Mic Button */}
                      <div className="relative flex-shrink-0" onClick={(e) => { e.stopPropagation(); setInputMode('voice'); toggleRecording(); }}>
                        <button className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 border-4 ${isRecording ? 'bg-red-500 border-red-200 scale-110' : 'bg-primary border-white dark:border-slate-700 hover:bg-primary-light hover:scale-105'}`}>
                          <span className="material-symbols-outlined text-3xl">{isRecording ? 'stop' : 'mic'}</span>
                        </button>
                        {isRecording && (
                          <div className="absolute top-0 left-0 h-full w-full rounded-full bg-primary/30 animate-[ping_1.5s_ease-in-out_infinite] opacity-75"></div>
                        )}
                      </div>

                      {/* Mic Info + Visualizer */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.voice.title')}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${isRecording ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600'}`}>
                            {isRecording ? t('dashboard.recording.listening') : t('dashboard.recording.tapMic')}
                          </span>
                        </div>
                        <div className={`flex items-end gap-1 h-8 transition-opacity ${isRecording ? 'opacity-100' : 'opacity-30'}`}>
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 bg-primary/70 rounded-full ${isRecording ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : ''}`}
                              style={{ height: `${isRecording ? Math.random() * 2 + 0.5 : 0.5}rem`, animationDelay: `${i * 80}ms` }}
                            ></div>
                          ))}
                        </div>
                        {outputText && inputMode === 'voice' && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">"{outputText}"</p>
                        )}
                      </div>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-3 px-5 py-2 bg-slate-50 dark:bg-slate-700/40">
                      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600"></div>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('dashboard.text.divider')}</span>
                      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600"></div>
                    </div>

                    {/* Text Section */}
                    <div
                      className={`p-5 transition-colors ${inputMode === 'text' ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                      onClick={() => { if (inputMode !== 'text') { setInputMode('text'); setOutputText(''); if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); setIsTranslating(false); } } }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base text-primary">edit_note</span>
                          {t('dashboard.text.title')}
                        </span>
                        {textInput && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setTextInput(''); setTextInputError(''); }}
                            className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">close</span> {t('dashboard.text.clear')}
                          </button>
                        )}
                      </div>
                      <textarea
                        value={textInput}
                        onChange={(e) => {
                          const nextValue = e.target.value;
                          const cleanedValue = keepArabicCharactersOnly(nextValue);
                          const hasInvalidCharacters = cleanedValue !== nextValue;

                          setTextInput(cleanedValue);
                          setTextInputError(hasInvalidCharacters ? t('dashboard.errors.arabicOnly') : '');
                          setInputMode('text');

                          if (isRecording) {
                            recognitionRef.current?.stop();
                            setIsRecording(false);
                            setIsTranslating(false);
                          }
                        }}
                        placeholder={t('dashboard.text.placeholder')}
                        rows={4}
                        className={`w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-slate-800 dark:text-white text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${textStart} transition-shadow`}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {textInputError && (
                        <p className="mt-2 text-xs font-medium text-red-500 dark:text-red-400">{textInputError}</p>
                      )}
                    </div>

                    {/* Convert Button */}
                    <div className="px-5 pb-5">
                      <button
                        onClick={handlePlayAvatarFromInput}
                        disabled={!textInput.trim()}
                        className={`w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] ${iconDir}`}
                      >
                        <span className="material-symbols-outlined">smart_toy</span>
                        {t('dashboard.text.convert')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Avatar preview powered by CWASA SiGML runtime */}
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-700">
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600" title={t('dashboard.avatar.fullscreen')}>
                          <span className="material-symbols-outlined">fullscreen</span>
                        </button>
                      </div>
                    </div>
                    <div className="relative aspect-video w-full bg-white dark:bg-slate-900 overflow-hidden">
                      <CWASAAvatarPlayer
                        sigml={avatarSigml}
                        playNonce={avatarPlayNonce}
                        className="absolute inset-0 h-full w-full"
                        title="Dashboard Avatar"
                      />
                    </div>
                    <div className="h-8 bg-white"></div>
                  </div>
                </div>
              </>
            )}
          </div>

          <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.history.title')}</h3>
              <Link to="/history" className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1">
                {t('dashboard.history.viewAll')} <span className="material-symbols-outlined text-sm">{isRtl ? 'chevron_left' : 'chevron_right'}</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${textStart}`}>
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('dashboard.history.headers.type')}</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('dashboard.history.headers.duration')}</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('dashboard.history.headers.date')}</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-left">{t('dashboard.history.headers.status')}</th>
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
                          {item.status === 'completed' ? t('dashboard.history.status.completed') : t('dashboard.history.status.archived')}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">{t('dashboard.history.empty')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <Sidebar variant="mobile" activeItem="dashboard" />

        {/* Video Review Modal */}
        {showVideoReviewModal && pendingVideo && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div dir={dir} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">preview</span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.videoReview.title')}</h2>
                </div>
                <button
                  onClick={handleCancelVideoUpload}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  disabled={isUploadingFile}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Video Preview */}
                <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                  <video
                    src={pendingVideo.url}
                    controls
                    className="w-full h-full"
                  />
                </div>

                {/* File Info */}
                {videoMetadata && (
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">{t('dashboard.videoReview.fileName')}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white break-all">{videoMetadata.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">{t('dashboard.videoReview.fileSize')}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatFileSize(videoMetadata.size)}</p>
                    </div>
                    {videoMetadata.duration !== null && (
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">{t('dashboard.videoReview.duration')}</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatDurationWithUnit(videoMetadata.duration)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase mb-1">{t('dashboard.videoReview.fileType')}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{videoMetadata.type || 'Unknown'}</p>
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {isUploadingFile && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('dashboard.videoReview.uploading')}</p>
                      <span className="text-sm font-semibold text-primary">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Actions */}
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 flex gap-3">
                <button
                  onClick={handleCancelVideoUpload}
                  disabled={isUploadingFile}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all border ${
                    isUploadingFile
                      ? 'opacity-50 cursor-not-allowed bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-500'
                      : 'bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-500'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">close</span>
                    {t('dashboard.videoReview.cancel')}
                  </span>
                </button>

                {isUploadingFile ? (
                  <button
                    onClick={handleStopVideoUpload}
                    className="flex-1 px-4 py-2.5 rounded-lg font-medium transition-all bg-red-500 hover:bg-red-600 text-white border border-red-600"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">stop</span>
                      {t('dashboard.videoReview.stop')}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleConfirmVideoUpload}
                    className="flex-1 px-4 py-2.5 rounded-lg font-medium transition-all bg-primary hover:bg-primary-dark text-white border border-primary active:scale-[0.98] shadow-lg shadow-primary/20"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">upload</span>
                      {t('dashboard.videoReview.upload')}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};
export default DashboardPage;

