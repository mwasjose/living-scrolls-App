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
              className={`group relative px-6 sm:px-12 py-4 border-b border-sacred/5 last:border-0 transition-colors duration-300 ${
                isHighlighted ? 'bg-gold/10' : isHovered ? 'bg-olive/5' : ''
              }`}
              onMouseEnter={() => setHoveredVerse(key)}
              onMouseLeave={() => setHoveredVerse(null)}
            >
              {/* Inline Verse Number and Text */}
              <div
                style={{
                  fontSize: fontSize ? `${fontSize}px` : undefined,
                  lineHeight: 1.8,
                }}
                className="relative"
              >
                <sup
                  className={`mr-3 font-bold text-[0.55em] transition-colors select-none ${
                    isHighlighted ? 'text-gold' : 'text-secondary'
                  }`}
                >
                  {verse.verse}
                </sup>
                <span className="font-serif text-lg leading-relaxed">
                  {verse.text}
                </span>
              </div>

              {/* Floating Inline Controls */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSet(setHighlighted, key)}
                  className={`p-2 rounded-full transition-all ${
                    isHighlighted
                      ? 'bg-gold text-deep shadow-soft'
                      : 'bg-sacred-cream border border-sacred/20 text-secondary hover:text-gold hover:border-gold/50'
                  }`}
                  title="Highlight"
                >
                  <Highlighter size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => toggleSet(setBookmarked, key)}
                  className={`p-2 rounded-full transition-all ${
                    isBookmarked
                      ? 'bg-bronze text-white shadow-soft'
                      : 'bg-sacred-cream border border-sacred/20 text-secondary hover:text-bronze hover:border-bronze/50'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark size={16} />
                </button>
              </div>

              {/* Mobile Interaction - Subtle footer controls */}
              <div className="mt-2 flex md:hidden items-center gap-4 border-t border-sacred/5 pt-2">
                <button
                  type="button"
                  onClick={() => toggleSet(setHighlighted, key)}
                  className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                    isHighlighted ? 'text-gold opacity-100' : 'text-muted opacity-60'
                  }`}
                >
                  <Highlighter size={12} /> {isHighlighted ? 'Highlighted' : 'Highlight'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleSet(setBookmarked, key)}
                  className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                    isBookmarked ? 'text-bronze opacity-100' : 'text-muted opacity-60'
                  }`}
                >
                  <Bookmark size={12} /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
