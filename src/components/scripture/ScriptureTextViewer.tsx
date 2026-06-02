'use client';

import { useEffect, useState, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Bookmark, Highlighter } from 'lucide-react';
import type { ScripturePassage } from '@/lib/models';

interface ScriptureTextViewerProps {
  passage: ScripturePassage;
  loading?: boolean;
  fontSize?: number;
  storageKey?: string;
  searchQuery?: string;
}

function readStoredSet(key: string) {
  if (typeof window === 'undefined') return new Set<string>();
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return new Set<string>(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

export function ScriptureTextViewer({ passage, loading, fontSize, storageKey = 'scripture-reader', searchQuery = '' }: ScriptureTextViewerProps) {
  const [highlighted, setHighlighted] = useState<Set<string>>(() => new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(() => new Set());
  const [hoveredVerse, setHoveredVerse] = useState<string | null>(null);

  const verses = passage.verses;

  useEffect(() => {
    setHighlighted(readStoredSet(`${storageKey}:highlights`));
    setBookmarked(readStoredSet(`${storageKey}:bookmarks`));
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(`${storageKey}:highlights`, JSON.stringify(Array.from(highlighted)));
  }, [highlighted, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(`${storageKey}:bookmarks`, JSON.stringify(Array.from(bookmarked)));
  }, [bookmarked, storageKey]);

  useEffect(() => {
    if (!searchQuery) return;
    
    const query = searchQuery.trim().toLowerCase();
    const verseNum = parseInt(query, 10);
    
    const targetVerse = verses.find(v => 
      v.verse === verseNum || v.text.toLowerCase().includes(query)
    );

    if (targetVerse) {
      const element = document.getElementById(`verse-${targetVerse.verse}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [searchQuery, verses]);

  const toggleSet = (setter: Dispatch<SetStateAction<Set<string>>>, key: string) => {
    setter((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="space-y-3">
          <div className="h-4 w-1/2 rounded-full bg-olive/10" />
          <div className="h-4 w-full rounded-full bg-olive/10" />
        </div>
        <div className="h-4 w-3/4 rounded-full bg-olive/10" />
        <div className="h-4 w-full rounded-full bg-olive/10" />
      </div>
    );
  }

  if (!verses.length) {
    return (
      <div className="py-12 text-sm text-muted text-center font-serif italic">
        Scripture text is not available for this reference yet.
      </div>
    );
  }

  return (
    <div className="transition-all duration-500">
      <div className="text-sacred-primary">
        {verses.map((verse) => {
          const key = `${verse.bookName}-${verse.chapter}-${verse.verse}`;
          const isHighlighted = highlighted.has(key);
          const isBookmarked = bookmarked.has(key);
          const isHovered = hoveredVerse === key;

          return (
            <div
              key={key}
              id={`verse-${verse.verse}`}
              className={`group relative px-6 sm:px-8 py-3 transition-all duration-200 ${
                isHighlighted ? 'bg-accent-gold opacity-10 rounded-lg' : ''
              }`}
              onMouseEnter={() => setHoveredVerse(key)}
              onMouseLeave={() => setHoveredVerse(null)}
            >
              {/* Verse with Number */}
              <div
                style={{
                  fontSize: fontSize ? `${fontSize}px` : undefined,
                  lineHeight: 1.9,
                }}
                className="relative leading-relaxed"
              >
                <sup
                  className={`mr-2 font-semibold text-[0.6em] transition-all select-none ${
                    isHighlighted ? 'accent-gold' : 'text-[var(--text-muted)] opacity-60'
                  }`}
                >
                  {verse.verse}
                </sup>
                <span className="font-sacred text-[var(--text-primary)] leading-relaxed">
                  {verse.text}
                </span>
              </div>

              {/* Floating Controls - Desktop Only */}
              <div className="hidden md:flex absolute right-0 top-0 items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={() => toggleSet(setHighlighted, key)}
                  className={`p-1.5 rounded-md transition-all ${
                    isHighlighted
                      ? 'bg-accent-gold opacity-20 accent-gold'
                      : 'bg-[var(--surface)]/40 text-[var(--text-secondary)] hover:bg-[var(--surface)]/60'
                  }`}
                  title="Highlight"
                  aria-label="Highlight verse"
                >
                  <Highlighter size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => toggleSet(setBookmarked, key)}
                  className={`p-1.5 rounded-md transition-all ${
                    isBookmarked
                      ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                      : 'bg-[var(--surface)]/40 text-[var(--text-secondary)] hover:bg-[var(--surface)]/60'
                  }`}
                  title="Bookmark"
                  aria-label="Bookmark verse"
                >
                  <Bookmark size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
