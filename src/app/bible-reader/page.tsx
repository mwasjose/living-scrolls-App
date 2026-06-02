'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Headphones, Minus, Plus, Search, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScriptureTextViewer } from '@/components/scripture/ScriptureTextViewer';
import { useScripturePassage } from '@/hooks/useScripturePassage';
import { BIBLE_BOOKS, buildChapterReference } from '@/lib/scripture';

const translations = [
  { id: 'kjv', label: 'KJV' },
  { id: 'web', label: 'WEB' },
];

export default function BibleReaderPage() {
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState(1);
  const [translation, setTranslation] = useState('kjv');
  const [fontSize, setFontSize] = useState(21);
  const [searchQuery, setSearchQuery] = useState('');
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const selectedBook = useMemo(() => BIBLE_BOOKS.find((b) => b.name === book) || BIBLE_BOOKS[0], [book]);
  const reference = buildChapterReference(book, chapter);
  const { passage, loading } = useScripturePassage(reference, translation, true);
  const adjacentReadings = useMemo(() => {
    const candidates = [
      chapter > 1 ? chapter - 1 : null,
      chapter,
      chapter < selectedBook.chapters ? chapter + 1 : null,
    ].filter((value): value is number => value !== null);

    return candidates.map((chapterNumber) => {
      const ref = buildChapterReference(book, chapterNumber);
      return {
        chapterNumber,
        id: `reader-${book}-${chapterNumber}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: chapterNumber === chapter ? 'Current' : chapterNumber < chapter ? 'Previous' : 'Next',
        title: ref,
        reference: ref,
        summary:
          chapterNumber === chapter
            ? 'Continue through the selected chapter with verse controls, highlights, bookmarks, and copying.'
            : 'Open this adjacent reading to preview the surrounding chapter without leaving your current place.',
      };
    });
  }, [book, chapter, selectedBook.chapters]);
  const [activeReadingId, setActiveReadingId] = useState('');
  const activeReadingTitle = adjacentReadings.find((reading) => reading.id === activeReadingId)?.title || reference;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `reader-scroll:${reference}:${translation}`;
    const saved = Number(window.localStorage.getItem(key) || 0);
    const id = window.requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior }));
    return () => {
      window.cancelAnimationFrame(id);
      window.localStorage.setItem(key, String(window.scrollY));
    };
  }, [reference, translation]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentId = `reader-${book}-${chapter}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const saved = window.localStorage.getItem('bible-reader-active-reading');
    setActiveReadingId(adjacentReadings.some((reading) => reading.id === saved) ? saved || currentId : currentId);
  }, [adjacentReadings, book, chapter]);

  useEffect(() => {
    const handleScroll = () => {
      const root = contentRef.current;
      if (!root) return;
      const totalHeight = root.scrollHeight - window.innerHeight;
      const scrollTop = Math.max(0, window.scrollY - root.offsetTop + 48);
      const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / totalHeight) * 100)) : 0;
      setReadingProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reference]);

  return (
    <div className="py-4 sm:py-10">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        <article
          ref={contentRef}
          className={`rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-soft overflow-hidden flex flex-col min-h-[78vh] ${immersiveMode ? 'shadow-[0_40px_120px_-55px_rgba(15,23,42,0.9)]' : ''}`}
        >
          <header className={`sticky top-0 z-20 bg-[var(--surface)]/95 backdrop-blur-lg border-b border-[var(--border)] px-5 py-5 sm:px-8 sm:py-6 transition-all ${immersiveMode ? 'shadow-[0_25px_80px_-45px_rgba(0,0,0,0.55)]' : ''}`}>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  <span>{immersiveMode ? 'Immersive Reading' : 'Bible Reader'}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif tracking-tight">{reference}</h1>
                <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] opacity-80">
                  <Badge variant="outline" className="bg-[var(--surface-soft)] text-[var(--accent)] border-[var(--border)]">
                    {passage.translation || translation.toUpperCase()}
                  </Badge>
                  <span className="opacity-50">/</span>
                  <span>{passage.verses.length} Verses</span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)] opacity-80">
                  {activeReadingId ? `${activeReadingTitle} · ${chapter}/${selectedBook.chapters}` : 'Ready to continue your next reading journey.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-[11px] text-[var(--text-secondary)]">
                  <span>{selectedBook.name}</span>
                  <span className="h-4 w-px bg-[var(--border)]" />
                  <span>Ch {chapter}</span>
                </div>
                <button
                  onClick={() => setChapter((v) => Math.max(1, v - 1))}
                  disabled={chapter === 1}
                  className="p-2 rounded-full hover:bg-[var(--surface-soft)] disabled:opacity-30 transition-colors text-[var(--text-secondary)]"
                  aria-label="Previous Chapter"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setChapter((v) => Math.min(selectedBook.chapters, v + 1))}
                  disabled={chapter === selectedBook.chapters}
                  className="p-2 rounded-full hover:bg-[var(--surface-soft)] disabled:opacity-30 transition-colors text-[var(--text-secondary)]"
                  aria-label="Next Chapter"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[1.5fr_1fr] items-center">
              <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setFontSize((s) => Math.max(14, s - 1))} className="rounded-full p-2 text-[var(--accent)] hover:bg-[var(--surface)] transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">{fontSize}px</span>
                    <button onClick={() => setFontSize((s) => Math.min(36, s + 1))} className="rounded-full p-2 text-[var(--accent)] hover:bg-[var(--surface)] transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  <select
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    className="rounded-full border border-[var(--border)] bg-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] outline-none"
                  >
                    {translations.map((t) => (
                      <option key={t.id} value={t.id}>{t.label} Edition</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
                  <input
                    type="text"
                    placeholder="Jump to verse..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-2 pl-10 pr-4 text-xs font-semibold text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/50"
                  />
                </div>
                <button className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Audio Reading">
                  <Headphones size={18} />
                </button>
                <button className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Reading Settings">
                  <Settings2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">{selectedBook.name} · Chapter {chapter} of {selectedBook.chapters}</span>
              </div>
              <button
                type="button"
                onClick={() => setImmersiveMode((value) => !value)}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                {immersiveMode ? 'Exit Immersive Mode' : 'Enter Immersive Mode'}
              </button>
            </div>
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-slate-800/70">
                <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${readingProgress}%` }} />
              </div>
              <p className="mt-2 text-xs text-[var(--text-secondary)]">Reading progress: {Math.round(readingProgress)}%</p>
            </div>
          </header>

          <section className={`flex-1 ${immersiveMode ? 'py-10 sm:py-14' : 'py-8 sm:py-12'}`}>
            <div className={`mx-auto ${immersiveMode ? 'max-w-4xl px-4 sm:px-6' : 'max-w-3xl'}`}>
              <ScriptureTextViewer
                passage={passage}
                loading={loading}
                fontSize={fontSize}
                searchQuery={searchQuery}
                storageKey={`chapter:${reference}:${translation}`}
              />
            </div>
          </section>
          {immersiveMode ? (
            <div className="sticky bottom-0 left-0 right-0 z-10 border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-lg px-4 py-3 sm:px-6">
              <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-4xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  <span>Immersive Focus</span>
                  <span className="h-4 w-px bg-[var(--border)]" />
                  <span>{reference}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChapter((v) => Math.max(1, v - 1))}
                    disabled={chapter === 1}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface)] disabled:opacity-40 transition"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setChapter((v) => Math.min(selectedBook.chapters, v + 1))}
                    disabled={chapter === selectedBook.chapters}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface)] disabled:opacity-40 transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}

