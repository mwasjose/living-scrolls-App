'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SpiritualJournalEntry } from '@/lib/models';

interface PersonalSpiritualJournalProps {
  entries: SpiritualJournalEntry[];
  onAddEntry: (entry: Omit<SpiritualJournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  loading?: boolean;
}

type MoodType = 'strengthened' | 'challenged' | 'inspired' | 'grateful' | 'seeking' | 'peaceful';

const MOOD_OPTIONS: { value: MoodType; label: string; icon: string; color: string }[] = [
  { value: 'strengthened', label: 'Strengthened', icon: '💪', color: 'from-rose-500 to-rose-600' },
  { value: 'challenged', label: 'Challenged', icon: '⛰️', color: 'from-amber-500 to-amber-600' },
  { value: 'inspired', label: 'Inspired', icon: '✨', color: 'from-yellow-500 to-yellow-600' },
  { value: 'grateful', label: 'Grateful', icon: '🙏', color: 'from-emerald-500 to-emerald-600' },
  { value: 'seeking', label: 'Seeking', icon: '🔍', color: 'from-blue-500 to-blue-600' },
  { value: 'peaceful', label: 'Peaceful', icon: '🕊️', color: 'from-indigo-500 to-indigo-600' },
];

export function PersonalSpiritualJournal({
  entries,
  onAddEntry,
  loading,
}: PersonalSpiritualJournalProps) {
  const [view, setView] = useState<'timeline' | 'new'>('timeline');
  const [newEntry, setNewEntry] = useState({
    reflection: '',
    insights: [] as string[],
    prayerNotes: '',
    spiritualMood: 'grateful' as MoodType,
    gratitudeItems: [] as string[],
    growthAreas: [] as string[],
  });

  const [currentGratitude, setCurrentGratitude] = useState('');
  const [currentGrowth, setCurrentGrowth] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddGratitude = () => {
    if (currentGratitude.trim()) {
      setNewEntry({
        ...newEntry,
        gratitudeItems: [...newEntry.gratitudeItems, currentGratitude],
      });
      setCurrentGratitude('');
    }
  };

  const handleAddGrowth = () => {
    if (currentGrowth.trim()) {
      setNewEntry({
        ...newEntry,
        growthAreas: [...newEntry.growthAreas, currentGrowth],
      });
      setCurrentGrowth('');
    }
  };

  const handleSaveEntry = async () => {
    if (!newEntry.reflection.trim()) return;

    setSaving(true);
    try {
      await onAddEntry({
        userId: '',
        planId: '',
        readingDayId: '',
        date: new Date().toISOString().split('T')[0],
        highlightedVerses: [],
        bookmarkedInsights: [],
        ...newEntry,
      });

      setNewEntry({
        reflection: '',
        insights: [],
        prayerNotes: '',
        spiritualMood: 'grateful',
        gratitudeItems: [],
        growthAreas: [],
      });

      setView('timeline');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] border border-white/10 bg-parchment/5 p-8 shadow-soft"
      >
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Spiritual Journal</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Your Personal Reflection Space</h2>
        <p className="mt-3 text-slate-200">
          Record your thoughts, gratitude, spiritual growth, and prayers as you journey through Scripture.
        </p>
      </motion.div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('timeline')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            view === 'timeline'
              ? 'bg-gold/20 text-gold'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          Journal Timeline
        </button>
        <button
          onClick={() => setView('new')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            view === 'new'
              ? 'bg-gold/20 text-gold'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          New Entry
        </button>
      </div>

      {/* Timeline View */}
      {view === 'timeline' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {entries.length === 0 ? (
            <div className="rounded-[24px] border-2 border-dashed border-white/20 p-12 text-center">
              <p className="text-slate-400">No journal entries yet</p>
              <p className="mt-2 text-sm text-slate-500">Begin writing your spiritual reflections to see them here.</p>
            </div>
          ) : (
            entries.map((entry, index) => {
              const mood = MOOD_OPTIONS.find((m) => m.value === entry.spiritualMood);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[20px] border border-white/10 bg-midnight/40 p-6 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">{entry.date}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">Spiritual Reflection</h3>
                    </div>
                    {mood && (
                      <div className={`flex-shrink-0 rounded-full bg-gradient-to-br ${mood.color} p-3 text-xl`}>
                        {mood.icon}
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-slate-300">{entry.reflection}</p>

                  {entry.gratitudeItems.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-gold">Gratitude</p>
                      {entry.gratitudeItems.map((item, i) => (
                        <p key={i} className="text-sm text-slate-400">• {item}</p>
                      ))}
                    </div>
                  )}

                  {entry.growthAreas.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-gold">Areas of Growth</p>
                      {entry.growthAreas.map((area, i) => (
                        <p key={i} className="text-sm text-slate-400">• {area}</p>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </motion.div>
      )}

      {/* New Entry View */}
      {view === 'new' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Spiritual Mood */}
          <div className="space-y-3">
            <label className="text-sm uppercase tracking-widest text-gold">How do you feel spiritually today?</label>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {MOOD_OPTIONS.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setNewEntry({ ...newEntry, spiritualMood: mood.value })}
                  className={`group relative flex flex-col items-center gap-2 rounded-[16px] p-3 transition-all ${
                    newEntry.spiritualMood === mood.value
                      ? `bg-gradient-to-br ${mood.color} p-3`
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{mood.icon}</span>
                  <span className={`text-xs font-medium ${
                    newEntry.spiritualMood === mood.value ? 'text-white' : 'text-slate-400'
                  }`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Reflection */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <label className="text-sm uppercase tracking-widest text-gold">Your Reflection</label>
            <textarea
              value={newEntry.reflection}
              onChange={(e) => setNewEntry({ ...newEntry, reflection: e.target.value })}
              placeholder="Write your spiritual reflections, insights, and thoughts about today's Scripture..."
              className="min-h-48 w-full bg-white/5 rounded-[12px] border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
            />
          </div>

          {/* Gratitude Items */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <label className="text-sm uppercase tracking-widest text-gold">Grateful For...</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentGratitude}
                onChange={(e) => setCurrentGratitude(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddGratitude()}
                placeholder="Add items of gratitude..."
                className="flex-1 bg-white/5 rounded-[8px] border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-gold/50 focus:outline-none"
              />
              <button
                onClick={handleAddGratitude}
                className="rounded-[8px] bg-gold/10 px-3 py-2 text-sm font-medium text-gold hover:bg-gold/20 transition-colors"
              >
                Add
              </button>
            </div>
            {newEntry.gratitudeItems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newEntry.gratitudeItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-sm text-gold"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() =>
                        setNewEntry({
                          ...newEntry,
                          gratitudeItems: newEntry.gratitudeItems.filter((_, idx) => idx !== i),
                        })
                      }
                      className="hover:opacity-70"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Growth Areas */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <label className="text-sm uppercase tracking-widest text-gold">Areas for Spiritual Growth</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentGrowth}
                onChange={(e) => setCurrentGrowth(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddGrowth()}
                placeholder="What spiritual areas would you like to develop?"
                className="flex-1 bg-white/5 rounded-[8px] border border-white/10 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-gold/50 focus:outline-none"
              />
              <button
                onClick={handleAddGrowth}
                className="rounded-[8px] bg-gold/10 px-3 py-2 text-sm font-medium text-gold hover:bg-gold/20 transition-colors"
              >
                Add
              </button>
            </div>
            {newEntry.growthAreas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newEntry.growthAreas.map((area, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-sm text-gold"
                  >
                    <span>{area}</span>
                    <button
                      onClick={() =>
                        setNewEntry({
                          ...newEntry,
                          growthAreas: newEntry.growthAreas.filter((_, idx) => idx !== i),
                        })
                      }
                      className="hover:opacity-70"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prayer Notes */}
          <div className="space-y-3 rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <label className="text-sm uppercase tracking-widest text-gold">Prayer & Meditation Notes</label>
            <textarea
              value={newEntry.prayerNotes}
              onChange={(e) => setNewEntry({ ...newEntry, prayerNotes: e.target.value })}
              placeholder="Write your prayers, meditations, or conversations with Elohim..."
              className="min-h-32 w-full bg-white/5 rounded-[12px] border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveEntry}
            disabled={saving || !newEntry.reflection.trim()}
            className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-gold/90 disabled:opacity-60"
          >
            {saving ? 'Saving Your Reflection...' : 'Save Journal Entry'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
