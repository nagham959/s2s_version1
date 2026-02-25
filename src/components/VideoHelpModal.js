import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const POPOVER_W = 288;
const POPOVER_H = 310;
const GAP = 10;

/**
 * VideoHelpModal — positioned popover anchored near the clicked button.
 * props:
 *   open       - boolean
 *   onClose    - function
 *   videoSrc   - string
 *   title      - string
 *   anchorRect - DOMRect of the button that triggered the popup
 */
const VideoHelpModal = ({ open, onClose, videoSrc = '/videos/hello.mp4', title, anchorRect = null }) => {
  const { t, dir } = useLanguage();
  const popoverRef = useRef(null);

  // ensure model-viewer is available for the embedded preview
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.customElements?.get('model-viewer')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // close on outside click (delayed to skip the same click that opened it)
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) onClose();
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 100);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handler); };
  }, [open, onClose]);

  if (!open || !anchorRect) return null;

  const resolvedTitle = title || t('help.exampleTitle');

  // ── positioning ─────────────────────────────────────────────────────────────
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // preferred: to the LEFT of the button
  let left = anchorRect.left - POPOVER_W - GAP;
  let top  = anchorRect.top + anchorRect.height / 2 - POPOVER_H / 2;
  let arrowSide = 'right'; // arrow on the right edge of popover pointing at button

  // fallback: to the RIGHT of the button
  if (left < 8) {
    left = anchorRect.right + GAP;
    arrowSide = 'left';
  }

  // fallback: BELOW the button (mobile / very narrow)
  if (left + POPOVER_W > vw - 8) {
    left = Math.max(8, anchorRect.left + anchorRect.width / 2 - POPOVER_W / 2);
    top  = anchorRect.bottom + GAP;
    arrowSide = 'top';
  }

  // clamp vertically
  top = Math.max(8, Math.min(top, vh - POPOVER_H - 8));
  // ────────────────────────────────────────────────────────────────────────────

  const arrowBase = 'absolute w-3 h-3 bg-surface-light dark:bg-surface-dark rotate-45 border-border-light dark:border-border-dark';
  const arrowStyle =
    arrowSide === 'right' ? `${arrowBase} -right-1.5 top-1/2 -translate-y-1/2 border-t-0 border-l-0 border border-r border-b` :
    arrowSide === 'left'  ? `${arrowBase} -left-1.5  top-1/2 -translate-y-1/2 border-b-0 border-r-0 border border-l border-t` :
                            `${arrowBase} -top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0 border border-l border-t`;

  return (
    <>
      {/* transparent full-screen layer to catch outside clicks on mobile */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      {/* popover card */}
      <div
        ref={popoverRef}
        className="fixed z-50 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark overflow-visible"
        style={{ left, top, width: POPOVER_W }}
      >
        {/* arrow */}
        <div className={arrowStyle} />

        {/* rounded inner wrapper clips video only */}
        <div className="rounded-2xl overflow-hidden">
          {/* header */}
          <div dir={dir} className="flex items-center justify-between px-4 py-2.5 border-b border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-hands-asl-interpreting text-lg text-primary" />
              <span className="text-sm font-semibold text-slate-800 dark:text-white">{resolvedTitle}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label={t('help.close')}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* model preview — force LTR so model-viewer canvas renders correctly */}
          <div dir="ltr" className="bg-slate-100 dark:bg-slate-800" style={{ height: '250px' }}>
            <model-viewer
              src="/base_basic_shaded.glb"
              camera-controls
              disable-tap
              camera-orbit="0deg 90deg 2.6m"
              min-camera-orbit="-20deg 75deg 2.2m"
              max-camera-orbit="20deg 105deg 3m"
              camera-target="0m 1.45m 0m"
              field-of-view="28deg"
              style={{ width: '100%', height: '100%' }}
              className="w-full h-full"
              ar
              ar-modes="webxr scene-viewer quick-look"
              exposure="1"
            ></model-viewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoHelpModal;
