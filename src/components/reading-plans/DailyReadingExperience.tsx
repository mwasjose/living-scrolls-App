'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DailyReading } from '@/lib/models';

interface DailyReadingExperienceProps {
  reading: DailyReading;
  onSaveReflection: (reflection: string) => Promise<void>;
  onBookmark: () => void;
  onHighlight: (verseRange: string) => void;
}

export function DailyReadingExperience({
  reading,
  onSaveReflection,
  onBookmark,
  onHighlight,
}: DailyReadingExperienceProps) {
  const [reflection, setReflection] = useState(reading.userReflection || '');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'scripture' | 'commentary' | 'reflection'>('scripture');

  const handleSaveReflection = async () => {
    setSaving(true);
    try {
      await onSaveReflection(reflection);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with date and theme */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] border border-white/10 bg-gradient-to-br from-gold/10 via-midnight/40 to-midnight/60 p-8 shadow-soft backdrop-blur-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-gold">{reading.date}</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{reading.theme}</h1>
            <p className="mt-2 text-lg text-slate-300">{reading.scriptureReference}</p>
          </div>
          <button
            onClick={onBookmark}
            className={`rounded-full p-3 transition-all ${
              reading.bookmarked
                ? 'bg-gold/20 text-gold'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <svg className="h-6 w-6" fill={reading.bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-white/10">
        {(['scripture', 'commentary', 'reflection'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium uppercase tracking-widest transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-gold text-gold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'scripture' && 'Scripture'}
            {tab === 'commentary' && 'Reflection'}
            {tab === 'reflection' && 'Journal'}
          </button>
        ))}
      </div>

      {/* Scripture Tab */}
      {activeTab === 'scripture' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Scripture text - styled like a manuscript */}
          <div className="space-y-4 rounded-[24px] border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
            <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-100">
              {reading.scriptureText}
            </p>
            <button
              onClick={() => onHighlight('all')}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold hover:bg-gold/20 transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.5 3a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" />
                <path fillRule="evenodd" d="M4 8a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" clipRule="evenodd" />
              </svg>
              Highlight Verse
            </button>
          </div>

          {/* Hebrew insight */}
          {reading.wordStudy && (
            <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
              <h3 className="text-sm uppercase tracking-widest text-gold">Hebrew Word Study</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-400">Hebrew Word</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{reading.wordStudy.hebrew}</p>
                  <p className="mt-1 text-sm text-slate-300">{reading.wordStudy.transliteration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Meaning</p>
                  <p className="mt-1 text-white">{reading.wordStudy.meaning}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Spiritual Insight</p>
                  <p className="mt-1 text-slate-300">{reading.wordStudy.spiritualSignificance}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Commentary Tab */}
      {activeTab === 'commentary' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Devotional Commentary */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-parchment/5 p-8 shadow-soft">
            <h3 className="text-sm uppercase tracking-widest text-gold">Devotional Reflection</h3>
            <p className="text-lg leading-relaxed text-slate-100">{reading.devotionalCommentary}</p>
          </div>

          {/* Hebraic Context */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <h3 className="text-sm uppercase tracking-widest text-gold">Hebraic Context</h3>
            <p className="text-slate-300">{reading.hebraicContext}</p>
          </div>

          {/* Messianic Connection */}
          <div className="space-y-3 rounded-[24px] border border-gold/20 bg-gold/5 p-6 shadow-soft">
            <h3 className="text-sm uppercase tracking-widest text-gold">Connection to Yahshuah Messiah</h3>
            <p className="text-slate-100">{reading.messianicConnection}</p>
          </div>

          {/* Life Application */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <h3 className="text-sm uppercase tracking-widest text-gold">Living This Truth</h3>
            <p className="text-slate-300">{reading.lifeApplication}</p>
          </div>

          {/* Prayer Suggestion */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <h3 className="text-sm uppercase tracking-widest text-gold">Prayer Thought</h3>
            <p className="italic text-slate-300">{reading.prayerSuggestion}</p>
          </div>
        </motion.div>
      )}

      {/* Reflection Tab */}
      {activeTab === 'reflection' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Reflection Prompt */}
          <div className="rounded-[24px] border border-gold/20 bg-gold/5 p-6 shadow-soft">
            <h3 className="text-sm uppercase tracking-widest text-gold">Reflection Prompt</h3>
            <p className="mt-3 text-lg text-white">{reading.reflectionPrompt}</p>
          </div>

          {/* Journal Entry */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-8 shadow-soft">
            <label className="text-sm uppercase tracking-widest text-gold">Your Reflection</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your thoughts, insights, prayers, and spiritual discoveries here..."
              className="min-h-64 w-full bg-white/5 rounded-[12px] border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
            />
            <button
              onClick={handleSaveReflection}
              disabled={saving}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-gold/90 disabled:opacity-60"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {saving ? 'Saving...' : 'Save Reflection'}
            </button>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <label className="text-sm uppercase tracking-widest text-gold">Personal Notes</label>
            <textarea
              defaultValue={reading.userNotes}
              placeholder="Add any additional notes, cross-references, or personal insights..."
              className="min-h-40 w-full bg-white/5 rounded-[12px] border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
            />
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex justify-between items-center pt-4">
        <button className="text-sm text-slate-400 hover:text-white transition-colors">
          ← Previous Day
        </button>
        <button className="rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold hover:bg-gold/20 transition-colors">
          Mark as Complete
        </button>
        <button className="text-sm text-slate-400 hover:text-white transition-colors">
          Next Day →
        </button>
      </div>
    </div>
  );
}
