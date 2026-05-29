'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, CalendarDays, Crown, Flame, ScrollText, Sparkles, Star, Users, Map, Hash, PartyPopper, Zap } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/hooks/useAuth';
import { useTriviaGame } from '@/hooks/useTriviaGame';
import { TriviaSlider } from './TriviaSlider';
import { TriviaLeaderboard } from './TriviaLeaderboard';
import { TriviaResults } from './TriviaResults';

export function TriviaArena() {
  const { user } = useAuth();
  const { profile } = useUserProfile(user?.uid ?? null);
  const {
    availableModes,
    availableLevels,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    questions,
    currentIndex,
    submitAnswer,
    moveToNextQuestion,
    resetSession,
    loadingQuestions,
    loadingNextQuestion,
    sessionMessage,
    sessionComplete,
    correctAnswers,
    maxStreak,
    accuracy,
    earnedXP,
    modeSummary,
    challengeDateLabel,
  } = useTriviaGame(user?.uid);

  const hasQuestions = Boolean(questions.length);
  const modeOptions = availableModes.map((item) => ({
    label: item,
    Icon: item === 'Daily Sacred Challenge' ? CalendarDays : item === 'Torah Challenge' ? ScrollText : Sparkles,
  }));
  
  const categoryOptions = [
    { label: 'Torah / Pentateuch', Icon: ScrollText },
    { label: 'Prophets', Icon: Flame },
    { label: 'Psalms & Proverbs', Icon: Star },
    { label: 'Gospels', Icon: BookOpen },
    { label: 'Acts & Apostles', Icon: Users },
    { label: 'Paul’s Letters', Icon: ScrollText },
    { label: 'Bible Characters', Icon: Users },
    { label: 'Miracles', Icon: Zap },
    { label: 'Kings & Prophets', Icon: Crown },
    { label: 'Women in the Bible', Icon: Star },
    { label: 'Bible Geography', Icon: Map },
    { label: 'Bible Numbers & Symbols', Icon: Hash },
    { label: 'Feasts & Holy Days', Icon: PartyPopper },
    { label: 'End Times / Revelation', Icon: Sparkles },
    { label: 'General Bible Knowledge', Icon: Brain },
  ];

  return (
    <div className="space-y-8">
      <section className="card-sacred p-8">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Sacred Scripture Intelligence</p>
            <h1 className="text-4xl font-semibold text-primary">Bible Trivia reimagined as a Scripture Mastery Journey.</h1>
            <p className="max-w-2xl text-secondary">Choose a sacred path, build your Hebrew wisdom, and collect XP with every inspired answer.</p>
          </div>
          <div className="grid gap-4 rounded-[28px] bg-surface p-6">
            <div className="rounded-3xl bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">Session focus</p>
              <p className="mt-3 text-sm text-primary">{modeSummary}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-secondary">Wisdom level</p>
                <p className="mt-3 text-lg font-semibold text-primary">{difficulty}</p>
              </div>
              <div className="rounded-3xl bg-surface-soft p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-secondary">Daily challenge</p>
                <p className="mt-3 text-lg font-semibold text-primary">{challengeDateLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
          <div className="card-sacred p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-3 block">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="inline-flex h-11 min-w-[7rem] rounded-md border border-soft bg-surface px-3 text-sm font-semibold text-primary"
                  aria-label="Select trivia mode"
                >
                  {modeOptions.map(({ label }) => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-3 block">Wisdom level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="inline-flex h-11 min-w-[6rem] rounded-md border border-soft bg-surface px-3 text-sm font-semibold text-primary"
                  aria-label="Select wisdom level"
                >
                  {availableLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-3 block">Scripture category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="inline-flex h-11 min-w-[8rem] rounded-md border border-soft bg-surface px-3 text-sm font-semibold text-primary"
                  aria-label="Select scripture category"
                >
                  {categoryOptions.map(({ label }) => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="card-sacred p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary">Sacred quiz</p>
                <h2 className="text-2xl font-semibold text-primary">{hasQuestions ? 'Question journey' : 'Prepare your path'}</h2>
              </div>
              <button
                type="button"
                onClick={resetSession}
                className="rounded-full border border-soft bg-surface px-4 py-2 text-sm font-semibold text-primary transition hover:border-accent"
              >
                Reset Session
              </button>
            </div>

            {hasQuestions ? (
              <TriviaSlider
                questions={questions}
                currentIndex={currentIndex}
                onAnswer={submitAnswer}
                onNext={moveToNextQuestion}
                loading={loadingQuestions}
                loadingNext={loadingNextQuestion}
                sessionComplete={sessionComplete}
                enableSound={true}
                enableVibration={true}
              />
            ) : (
              <div className="rounded-2xl bg-surface-soft border border-soft p-8 text-center">
                <p className="text-primary font-semibold">Choose a mode and category to begin your training.</p>
              </div>
            )}

            <p className="mt-6 text-sm text-secondary text-center">{sessionMessage || 'Each question brings scripture context, Torah insight, and messianic teaching.'}</p>
          </motion.div>
        </motion.div>

        <aside className="space-y-6">
          {mode === 'Daily Sacred Challenge' ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.125 }} className="card-sacred p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">Daily sacred challenge</p>
              <div className="mt-4 rounded-3xl bg-surface p-4 text-sm text-secondary">
                <p className="font-semibold text-primary">Today&apos;s path</p>
                <p className="mt-2">Complete the curated scripture challenge for consistent mastery and streak reward.</p>
                <p className="mt-4 text-xs uppercase tracking-[0.26em] text-secondary">Challenge date</p>
                <p className="mt-1 text-sm text-primary">{challengeDateLabel}</p>
              </div>
            </motion.div>
          ) : null}

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="card-sacred p-6">
            <TriviaLeaderboard profile={profile} />
          </motion.div>

          {sessionComplete ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <TriviaResults
                score={correctAnswers}
                total={questions.length}
                accuracy={accuracy}
                xp={earnedXP}
                streak={maxStreak}
              />
            </motion.div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
