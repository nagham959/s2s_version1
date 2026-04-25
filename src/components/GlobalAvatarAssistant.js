import React, { useEffect, useRef, useState } from 'react';
import CWASAAvatarPlayer from './CWASAAvatarPlayer';

const STORAGE_KEY = 's2s-avatar-assistant-position';
const MIN_TEXT_LENGTH = 4;
const MAX_TEXT_LENGTH = 220;
const DEFAULT_OFFSET = 24;
const BUTTON_SIZE = 64;

const TEXT_TAGS = new Set([
  'A',
  'ARTICLE',
  'BLOCKQUOTE',
  'DD',
  'DIV',
  'DT',
  'FIGCAPTION',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'LABEL',
  'LI',
  'MAIN',
  'P',
  'SECTION',
  'SMALL',
  'SPAN',
  'STRONG',
  'EM',
  'TD',
  'TH',
]);

const IGNORED_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH']);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const normalizeText = (value = '') => value.replace(/\s+/g, ' ').trim();

const getViewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const getInitialPosition = () => {
  if (typeof window === 'undefined') {
    return { x: DEFAULT_OFFSET, y: DEFAULT_OFFSET };
  }

  const savedPosition = window.localStorage.getItem(STORAGE_KEY);
  if (savedPosition) {
    try {
      const parsed = JSON.parse(savedPosition);
      if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
        return {
          x: clamp(parsed.x, DEFAULT_OFFSET, Math.max(DEFAULT_OFFSET, window.innerWidth - BUTTON_SIZE - DEFAULT_OFFSET)),
          y: clamp(parsed.y, DEFAULT_OFFSET, Math.max(DEFAULT_OFFSET, window.innerHeight - BUTTON_SIZE - DEFAULT_OFFSET)),
        };
      }
    } catch (_error) {
      // Fall through to the default position.
    }
  }

  return {
    x: DEFAULT_OFFSET,
    y: Math.max(DEFAULT_OFFSET, window.innerHeight - 128),
  };
};

const isIgnoredElement = (element) => {
  if (!element || !element.tagName) return false;
  return IGNORED_TAGS.has(element.tagName.toUpperCase());
};

const extractReadableText = (target, assistantRoot) => {
  if (!target) return '';

  const element = target.nodeType === Node.TEXT_NODE ? target.parentElement : target;
  let current = element;

  while (current && current !== document.body) {
    if (assistantRoot?.contains(current)) {
      return '';
    }

    if (isIgnoredElement(current) || current.getAttribute?.('data-avatar-assistant-ignore') === 'true') {
      return '';
    }

    const text = normalizeText(current.innerText || current.textContent || '');
    if (text.length >= MIN_TEXT_LENGTH) {
      if (TEXT_TAGS.has(current.tagName) || text.length <= MAX_TEXT_LENGTH) {
        return text.slice(0, MAX_TEXT_LENGTH);
      }
    }

    current = current.parentElement;
  }

  return '';
};

const GlobalAvatarAssistant = () => {
  const assistantRootRef = useRef(null);
  const dragStateRef = useRef(null);
  const frameRef = useRef(0);
  const [position, setPosition] = useState(getInitialPosition);
  const [hoveredText, setHoveredText] = useState('');
  const [viewport, setViewport] = useState(getViewport);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewport());
      setPosition((currentPosition) => ({
        x: clamp(currentPosition.x, DEFAULT_OFFSET, Math.max(DEFAULT_OFFSET, window.innerWidth - BUTTON_SIZE - DEFAULT_OFFSET)),
        y: clamp(currentPosition.y, DEFAULT_OFFSET, Math.max(DEFAULT_OFFSET, window.innerHeight - BUTTON_SIZE - DEFAULT_OFFSET)),
      }));
    };

    const handlePointerMove = (event) => {
      if (!dragStateRef.current) return;

      const nextX = event.clientX - dragStateRef.current.offsetX;
      const nextY = event.clientY - dragStateRef.current.offsetY;

      if (Math.abs(nextX - dragStateRef.current.startX) > 4 || Math.abs(nextY - dragStateRef.current.startY) > 4) {
        dragStateRef.current.moved = true;
      }

      setPosition({
        x: clamp(nextX, DEFAULT_OFFSET, Math.max(DEFAULT_OFFSET, window.innerWidth - BUTTON_SIZE - DEFAULT_OFFSET)),
        y: clamp(nextY, DEFAULT_OFFSET, Math.max(DEFAULT_OFFSET, window.innerHeight - BUTTON_SIZE - DEFAULT_OFFSET)),
      });
    };

    const handlePointerUp = () => {
      if (dragStateRef.current && !dragStateRef.current.moved) {
        setIsOpen((currentOpen) => !currentOpen);
      }
      dragStateRef.current = null;
    };

    const handleHoverMove = (event) => {
      if (!isOpen || dragStateRef.current) return;
      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const assistantRoot = assistantRootRef.current;
        const elementUnderPointer = document.elementFromPoint(event.clientX, event.clientY);

        if (!elementUnderPointer) {
          setHoveredText('');
          return;
        }

        if (assistantRoot?.contains(elementUnderPointer)) {
          return;
        }

        const nextText = extractReadableText(elementUnderPointer, assistantRoot);
        setHoveredText(nextText);
      });
    };

    const clearHover = () => setHoveredText('');

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handleHoverMove, true);
    window.addEventListener('blur', clearHover);
    window.addEventListener('scroll', clearHover, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointermove', handleHoverMove, true);
      window.removeEventListener('blur', clearHover);
      window.removeEventListener('scroll', clearHover, true);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
  }, [position]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    const launcher = event.currentTarget;
    const rect = launcher.getBoundingClientRect();

    dragStateRef.current = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };

    launcher.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const isPanelBelow = position.y < viewport.height * 0.5;
  const isPanelAlignedRight = position.x > viewport.width * 0.55;
  const assistantLabel = document.documentElement.dir === 'rtl' ? 'الأفاتار المساعد' : 'Avatar assistant';
  const helperButtonClass = 'flex items-center justify-center rounded-xl border border-primary bg-primary hover:bg-primary-hover transition-colors shadow-sm';

  return (
    <div
      ref={assistantRootRef}
      className="pointer-events-none fixed z-[9999]"
      style={{ left: position.x, top: position.y }}
    >
      <div className="pointer-events-auto relative">
        <button
          type="button"
          onPointerDown={handlePointerDown}
          title={assistantLabel}
          aria-label={assistantLabel}
          className={`${helperButtonClass} ${dragStateRef.current ? 'cursor-grabbing' : 'cursor-grab'} ${isOpen ? 'ring-2 ring-primary/30' : ''}`}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        >
          <span className="flex items-center justify-center text-white">
            <i className="fa-solid fa-hands-asl-interpreting text-2xl"></i>
          </span>
        </button>

        {isOpen ? (
          <div
            className={`absolute w-[min(19rem,calc(100vw-1rem))] rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-3 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95 dark:text-white ${isPanelBelow ? 'top-[calc(100%+0.65rem)]' : 'bottom-[calc(100%+0.65rem)]'} ${isPanelAlignedRight ? 'right-0' : 'left-0'}`}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F2593D]">
                  {document.documentElement.dir === 'rtl' ? 'جاهز للترجمة' : 'Ready to translate'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                ×
              </button>
            </div>

            <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-950 dark:border-slate-700">
              <CWASAAvatarPlayer className="h-52 w-full origin-top scale-[1.35] -translate-y-1" title="Global hover avatar" />
            </div>

            <p className="mt-2 max-h-24 overflow-auto rounded-2xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              {hoveredText || (document.documentElement.dir === 'rtl' ? 'مرري على أي نص بعد الفتح.' : 'Hover any text after opening.')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GlobalAvatarAssistant;