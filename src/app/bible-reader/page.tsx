'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Headphones, Minus, Plus, Search, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ReadingPanel } from '@/components/scripture/ReadingPanel';
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
        id: `reader-${book}-${chapterNumber}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: chapterNumber === chapter ? 'Current Reading' : chapterNumber < chapter ? 'Previous Reading' : 'Next Reading',
        title: ref,
        reference: ref,
        verses: ref,
        summary:
          chapterNumber === chapter
            ? 'Continue through the selected chapter with verse controls, highlights, bookmarks, and copying.'
            : 'Open this adjacent reading to preview the surrounding chapter without leaving your current place.',
        commentary: `Read ${ref} in context. Watch for repeated phrases, transitions, promises, commands, and covenant themes.`,
        studyNotes: [
          'Use Previous and Next verse controls to move slowly through the passage.',
          'Highlight verses you want to revisit and bookmark verses for future study.',
        ],
        historicalBackground: 'Chapter divisions help navigation, while the reading flow is best understood by listening for paragraph and narrative movement.',
        crossReferences: ['Psalm 119:105', '2 Timothy 3:16-17', 'Luke 24:27'],
      };
    });
  }, [book, chapter, selectedBook.chapters]);
  const [activeReadingId, setActiveReadingId] = useState('');

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

  const changeBook = (nextBook: string) => {
    setBook(nextBook);
    setChapter(1);
  };

  return (
    <div className="py-4 sm:py-10">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        <article 
          ref={contentRef} 
          className="rounded-[40px] border border-sacred bg-sacred-cream shadow-glow overflow-hidden flex flex-col min-h-[85vh]"
        >
          {/* Immersive Unified Sticky Header */}
          <header className="sticky top-0 z-20 bg-sacred-cream/90 backdrop-blur-2xl border-b border-sacred/10 px-6 py-6 sm:px-10 sm:py-8 transition-all">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Title and Metadata */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-bold text-sacred-primary font-serif tracking-tight">{reference}</h1>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold text-secondary uppercase tracking-[0.2em] opacity-80">
                  <Badge variant="outline" className="bg-secondary/5 text-secondary border-sacred/20">{passage.translation || translation.toUpperCase()}</Badge>
                  <span className="opacity-30">/</span>
                  <span>{passage.verses.length} Verses</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-olive/5 p-1 rounded-2xl border border-sacred/10">
                  <select
                    value={book}
                    onChange={(e) => changeBook(e.target.value)}
                    className="bg-transparent text-xs font-bold px-3 py-2 outline-none text-sacred-primary cursor-pointer hover:bg-sacred-cream/80 rounded-xl transition-all"
                  >
                    {BIBLE_BOOKS.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                  </select>
                  <select
                    value={chapter}
                    onChange={(e) => setChapter(Number(e.target.value))}
                    className="bg-transparent text-xs font-bold px-3 py-2 outline-none text-sacred-primary cursor-pointer border-l border-sacred/10 hover:bg-sacred-cream/80 rounded-r-xl transition-all"
                  >
                    {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((c) => (
                      <option key={c} value={c}>Chapter {c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setChapter((v) => Math.max(1, v - 1))}
                    disabled={chapter === 1}
                    className="p-2.5 rounded-full hover:bg-olive/10 disabled:opacity-10 transition-colors text-sacred-primary"
                    aria-label="Previous Chapter"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setChapter((v) => Math.min(selectedBook.chapters, v + 1))}
                    disabled={chapter === selectedBook.chapters}
                    className="p-2.5 rounded-full hover:bg-olive/10 disabled:opacity-10 transition-colors text-sacred-primary"
                    aria-label="Next Chapter"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Reading Preferences Overlay */}
            <div className="mt-6 pt-6 border-t border-sacred/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-4 bg-olive/5 rounded-full px-5 py-2 border border-sacred/10">
                    <button onClick={() => setFontSize(s => Math.max(14, s - 1))} className="text-secondary hover:text-sacred-primary transition-colors"><Minus size={16}/></button>
                    <span className="text-[10px] sm:text-xs font-bold text-secondary w-12 text-center uppercase tabular-nums">{fontSize}px</span>
                    <button onClick={() => setFontSize(s => Math.min(36, s + 1))} className="text-secondary hover:text-sacred-primary transition-colors"><Plus size={16}/></button>
                  </div>
                  <select
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] bg-transparent outline-none text-secondary cursor-pointer hover:text-sacred-primary transition-colors"
                  >
                    {translations.map((t) => <option key={t.id} value={t.id}>{t.label} Edition</option>)}
                  </select>
               </div>
               
               <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative flex-1 md:w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40" size={16} />
                    <input 
                      type="text"
                      placeholder="Jump to verse..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-olive/5 border border-sacred/10 rounded-full py-2 pl-10 pr-4 text-xs font-bold text-sacred-primary outline-none focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-secondary/30"
                    />
                 </div>
                 <button className="p-2.5 rounded-full hover:bg-olive/10 text-secondary/60 hover:text-sacred-primary transition-colors" title="Audio Reading"><Headphones size={20}/></button>
                 <button className="p-2.5 rounded-full hover:bg-olive/10 text-secondary/60 hover:text-sacred-primary transition-colors" title="Reading Settings"><Settings2 size={20}/></button>
               </div>
            </div>
          </header>

          {/* Immersive Fluid Reading Area */}
          <section className="flex-1 py-8 sm:py-12">
            <div className="max-w-3xl mx-auto">
              <ScriptureTextViewer 
                passage={passage} 
                loading={loading} 
                fontSize={fontSize} 
                searchQuery={searchQuery}
                storageKey={`chapter:${reference}:${translation}`} 
              />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

