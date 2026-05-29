'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Eye, Languages, ScrollText, Shapes } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/hooks/useAuth';
import { HebrewWord } from '@/lib/models';

const mockWords: HebrewWord[] = [
  { id: '1', hebrew: '\u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u05d9\u05dd', transliteration: 'Elohim', meaning: 'God / Supreme Being', category: 'Divinity' },
  { id: '2', hebrew: '\u05d1\u05b0\u05bc\u05e8\u05b5\u05d0\u05e9\u05b4\u05c1\u05d9\u05ea', transliteration: 'Bereshit', meaning: 'In the beginning', category: 'Torah' },
  { id: '3', hebrew: '\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd', transliteration: 'Shalom', meaning: 'Peace / Wholeness', category: 'Common' },
];

export default function HebrewLearningPage() {
  const { user } = useAuth();
  const { profile } = useUserProfile(user?.uid ?? null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'card' | 'root' | 'symbolic'>('card');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(mockWords.map((word) => word.category)))], []);
  const filteredWords = useMemo(() => (category === 'All' ? mockWords : mockWords.filter((word) => word.category === category)), [category]);
  const currentWord = filteredWords[currentIndex] ?? filteredWords[0] ?? mockWords[0];
  const mastery = profile?.wisdomXP ? 88 : 85;
  const viewOptions = [
    { id: 'card' as const, label: 'Word View', Icon: BookOpen },
    { id: 'root' as const, label: 'Root Analysis', Icon: ScrollText },
    { id: 'symbolic' as const, label: 'Symbolic', Icon: Shapes },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-6">
      <header className="rounded-[32px] border border-white/10 bg-midnight/70 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Sacred Language</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Hebrew Study Circle</h1>
        <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
          Explore the visual beauty and root meanings of Lashon HaKodesh.
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <motion.div
          key={`${currentWord.id}-${viewMode}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card relative flex min-h-[420px] flex-col justify-center overflow-hidden rounded-[32px] p-8 pt-24 text-center shadow-glow"
        >
          <div className="absolute left-6 right-6 top-6 flex flex-wrap justify-center gap-2">
            {viewOptions.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setViewMode(id)}
                className={`filter-icon-btn text-xs font-semibold uppercase tracking-[0.14em] ${viewMode === id ? 'active' : ''}`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'card' ? (
              <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="hebrew-text mb-8 text-7xl text-white">{currentWord.hebrew}</h2>
                <p className="text-2xl font-serif text-gold tracking-wide">{currentWord.transliteration}</p>
                <p className="mt-6 text-slate-300 text-lg">{currentWord.meaning}</p>
              </motion.div>
            ) : null}

            {viewMode === 'root' ? (
              <motion.div key="root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex justify-center gap-4">
                  {currentWord.hebrew.split('').map((char, i) => (
                    <div key={`${char}-${i}`} className="flex flex-col items-center">
                      <span className="hebrew-text text-4xl text-gold">{char}</span>
                      <span className="mt-2 text-[10px] text-slate-500">Pillar {i + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-white/5 p-6 text-left">
                  <p className="mb-2 text-xs uppercase tracking-widest text-gold">Visual Hint</p>
                  <p className="text-sm italic text-slate-300">&quot;The shape of this word resembles a scroll unfolding from left to right.&quot;</p>
                </div>
              </motion.div>
            ) : null}

            {viewMode === 'symbolic' ? (
              <motion.div key="symbolic" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-gold/5 shadow-glow">
                  <span className="hebrew-text text-4xl text-gold">{currentWord.hebrew[0]}</span>
                </div>
                <p className="text-lg leading-relaxed text-slate-200">The ancient glyph represents the strength of the ox, signifying the sovereignty of Elohim.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <section className="space-y-6">
          <div className="filter-panel">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-olive" strokeWidth={1.8} />
              <h3 className="text-sm uppercase tracking-widest text-gold">Word Filters</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setCurrentIndex(0);
                  }}
                  className={`filter-icon-btn text-sm font-semibold ${category === item ? 'active' : ''}`}
                >
                  <Eye className="h-4 w-4" strokeWidth={1.8} />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[32px] p-8">
            <h3 className="mb-6 text-sm uppercase tracking-widest text-gold">Study Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Category Mastery: {currentWord.category}</span>
                <span>{mastery}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${mastery}%` }} className="h-full bg-gold shadow-glow" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1))}
              className="filter-icon-btn justify-center p-4 text-sm font-semibold uppercase tracking-widest"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredWords.length)}
              className="filter-icon-btn active justify-center p-4 text-sm font-semibold uppercase tracking-widest"
            >
              <span>Next Word</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
