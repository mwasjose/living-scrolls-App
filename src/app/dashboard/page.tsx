'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Hebcal from 'hebcal';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, CalendarDays, Compass, HeartHandshake, NotebookPen, ScrollText, Sparkles, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';

const dailyBlessings = [
  'Grace and peace be upon you as you begin a new week.',
  'May Adonai establish the work of your hands today.',
  'Walk in wisdom and understanding throughout this day.',
  'May your heart remain steadfast in faith and hope.',
  'Prepare your heart for the coming Sabbath rest.',
  'Shabbat Shalom. May peace fill your dwelling.',
  'May your week begin with renewed strength and purpose.',
];

const scripturePool = [
  { reference: 'Psalm 119:105', verse: 'Your word is a lamp to my feet and a light to my path.', translation: 'HalleluYah Scriptures', reflection: 'Walk today with confidence, knowing that Scripture illuminates every step.', category: 'Wisdom' },
  { reference: 'Joshua 1:8', verse: 'This Book of the Torah shall not depart from your mouth.', translation: 'HalleluYah Scriptures', reflection: 'Let the Word shape your speech, your thoughts, and your courage.', category: 'Torah' },
  { reference: 'Psalm 27:14', verse: 'Wait for the LORD; be strong and let your heart take courage.', translation: 'HalleluYah Scriptures', reflection: 'Choose patient trust as you move through today.', category: 'Hope' },
  { reference: 'Proverbs 3:5-6', verse: 'Trust in the LORD with all your heart and lean not on your own understanding.', translation: 'HalleluYah Scriptures', reflection: 'Let obedience replace anxiety when the path ahead feels uncertain.', category: 'Faith' },
  { reference: 'Philippians 4:6', verse: 'Do not be anxious about anything, but in everything by prayer and supplication.', translation: 'HalleluYah Scriptures', reflection: 'Bring your burdens to prayer before you carry them alone.', category: 'Prayer' },
];

const memoryVerses = [
  { reference: 'Joshua 1:8', text: 'This Book of the Torah shall not depart from your mouth; meditate on it day and night.', progress: 60 },
  { reference: 'Psalm 119:11', text: 'Your word I have hidden in my heart, that I might not sin against You.', progress: 72 },
  { reference: 'Proverbs 4:23', text: 'Above all else, guard your heart, for everything you do flows from it.', progress: 48 },
];

const prayerFocuses = ['Wisdom', 'Faith', 'Family', 'Gratitude', 'Obedience', 'Service', 'Peace', 'Strength'];
const feastEvents = [
  { name: 'Shavuot', shortLabel: 'Feast of Weeks', preview: 'Celebration of the giving of Torah and the completion of the Omer.', description: 'Shavuot celebrates the giving of the Torah and the harvest of the firstfruits. It is a season of gratitude, remembrance, and the outpouring of covenant life.', referenceVerses: ['Exodus 19', 'Leviticus 23:15-22', 'Deuteronomy 16:9-12'], significance: 'Ancient Israel gathered before Elohim to remember His covenant and commandments.', observances: ['Prayer', 'Scripture study', 'Community gathering', 'Thanksgiving'], month: 5, day: 6 },
  { name: 'Yom Teruah', shortLabel: 'Feast of Trumpets', preview: 'A joyful call to prepare the heart before the appointed season.', description: 'Yom Teruah is a day of sounding the trumpets, awakening the people to repentance, consecration, and the hope of the coming kingdom.', referenceVerses: ['Numbers 29:1-6', 'Leviticus 23:23-25', 'Psalm 81:3-4'], significance: 'This feast marks the beginning of the sacred season of remembrance and expectation.', observances: ['Prayer', 'Sounding the shofar', 'Preparation', 'Reflection'], month: 7, day: 1 },
  { name: 'Yom Kippur', shortLabel: 'Day of Atonement', preview: 'A solemn day to seek mercy, repentance, and cleansing.', description: 'Yom Kippur is the appointed day of atonement, calling the people into humility, confession, and return to Elohim.', referenceVerses: ['Leviticus 16', 'Leviticus 23:26-32', 'Numbers 29:7-11'], significance: 'It reminds the faithful that reconciliation with Elohim begins in repentance and trust.', observances: ['Fasting', 'Prayer', 'Confession', 'Stillness'], month: 9, day: 10 },
  { name: 'Sukkot', shortLabel: 'Feast of Tabernacles', preview: 'A season of dwelling in joy and remembering Elohim’s provision.', description: 'Sukkot commemorates the wilderness journey and the sheltering presence of Elohim. It is a joyful celebration of provision, remembrance, and worship.', referenceVerses: ['Leviticus 23:33-43', 'Deuteronomy 16:13-15', 'Zechariah 14:16-19'], significance: 'The feast teaches the people to rejoice in the presence and provision of the Lord.', observances: ['Gathering', 'Joyful worship', 'Hospitality', 'Scripture reflection'], month: 9, day: 15 },
];
const wisdomInsights = [
  'The seed does not become a tree overnight. Remain faithful in small daily growth.',
  'A steady heart hears the hidden instruction of the Spirit.',
  'What is planted in quiet devotion will bear fruit in due season.',
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);
  const displayName = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Beloved';
  const [scriptureIndex, setScriptureIndex] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = typeof window !== 'undefined' ? window.localStorage.getItem('dashboard-scripture-date') : null;
    const storedIndex = typeof window !== 'undefined' ? Number(window.localStorage.getItem('dashboard-scripture-index') || '0') : 0;

    if (storedDate !== today) {
      const available = scripturePool.map((_, index) => index).filter((index) => index !== storedIndex);
      const nextIndex = available[Math.floor(Math.random() * available.length)] ?? 0;
      setScriptureIndex(nextIndex);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('dashboard-scripture-date', today);
        window.localStorage.setItem('dashboard-scripture-index', String(nextIndex));
      }
      return;
    }

    setScriptureIndex(storedIndex || 0);
  }, []);

  const currentDay = useMemo(() => new Date().getDay(), []);
  const blessing = dailyBlessings[currentDay] || dailyBlessings[0];
  const scripture = scripturePool[scriptureIndex] || scripturePool[0];
  const weeklyTheme = useMemo(() => ['Wisdom', 'Trust', 'Prayer', 'Obedience', 'Hope', 'Faith', 'Holiness'][currentDay % 7], [currentDay]);
  const memoryVerse = memoryVerses[currentDay % memoryVerses.length];
  const prayerFocus = prayerFocuses[currentDay % prayerFocuses.length];
  const wisdomInsight = wisdomInsights[currentDay % wisdomInsights.length];
  const [viewMode, setViewMode] = useState<'hebrew' | 'appointed'>('hebrew');
  const [selectedFeastIndex, setSelectedFeastIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = useMemo(() => new Date(), []);
  const hebrewDateLabel = useMemo(() => new Hebcal.HDate(today).toString('a'), [today]);
  const hebrewDateHebrewLabel = useMemo(() => new Hebcal.HDate(today).toString('h'), [today]);
  const hebrewWeekday = useMemo(() => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today), [today]);
  const gregorianDateLabel = useMemo(() => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(today), [today]);
  const feastEventsWithDays = useMemo(() => feastEvents.map((event) => {
    const target = new Date(today.getFullYear(), event.month - 1, event.day);
    if (target < today) target.setFullYear(target.getFullYear() + 1);
    const daysRemaining = Math.max(0, Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    return { ...event, daysRemaining };
  }).sort((a, b) => a.daysRemaining - b.daysRemaining), [today]);
  const nextFeast = feastEventsWithDays[0] || feastEvents[0];
  const selectedFeast = feastEventsWithDays[selectedFeastIndex] || nextFeast;

  if (loading || profileLoading) {
    return <div className="py-20 text-center text-[var(--accent)]">Preparing your spiritual dashboard...</div>;
  }

  if (!user) {
    return (
      <section className="space-y-6 rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--text-secondary)]">Welcome</p>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Sign in to your sacred dashboard.</h1>
        <p className="mt-4 text-[var(--text-muted)]">Your personalized Torah study plan and spiritual progress await.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login" className="btn-primary text-xs sm:text-sm">Sign in</Link>
          <Link href="/register" className="btn-secondary text-xs sm:text-sm">Create account</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-16 py-6 text-[var(--text-primary)]">
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">Spiritual home</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">Shalom, {displayName}.</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--text-secondary)]">{blessing}</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="rounded-[32px] border border-[var(--border)]/70 bg-gradient-to-br from-[var(--surface)] via-[var(--surface-soft)] to-[var(--surface)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-8"
      >
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className={`flex items-center gap-3 transition-colors duration-300 ${viewMode === 'appointed' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`}><CalendarDays className={`h-5 w-5 ${viewMode === 'appointed' ? 'drop-shadow-[0_0_10px_rgba(193,159,74,0.25)]' : ''}`} /> <span className="text-xs uppercase tracking-[0.28em]">Hebrew Calendar</span></div>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">Biblical time center</h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">A premium, app-like toggle for Hebrew calendar insight and the next appointed time.</p>
          </div>

          <div className="w-full max-w-md self-stretch xl:w-auto xl:self-auto">
            <div className="relative flex rounded-full border border-[var(--border)]/70 bg-[var(--surface-soft)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                animate={{ x: viewMode === 'hebrew' ? 0 : '100%' }}
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[var(--accent)] shadow-[0_10px_24px_rgba(193,159,74,0.22)]"
              />
              <button
                type="button"
                onClick={() => setViewMode('hebrew')}
                className={`relative z-10 flex-1 rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition duration-200 ease-out ${viewMode === 'hebrew' ? 'border-[var(--accent)]/70 bg-[rgba(255,255,255,0.08)] text-[var(--text-primary)] shadow-[0_6px_20px_rgba(0,0,0,0.08)]' : 'border-[var(--border)]/70 bg-transparent text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)]'}`}
              >
                Hebrew Calendar
              </button>
              <button
                type="button"
                onClick={() => setViewMode('appointed')}
                className={`relative z-10 flex-1 rounded-full border px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition duration-200 ease-out ${viewMode === 'appointed' ? 'border-[var(--accent)]/70 bg-[rgba(255,255,255,0.08)] text-[var(--text-primary)] shadow-[0_6px_20px_rgba(0,0,0,0.08)]' : 'border-[var(--border)]/70 bg-transparent text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)]'}`}
              >
                <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />Elohim&apos;s Time</span>
              </button>
            </div>
          </div>
        </div>

        <div className={`mt-6 rounded-[28px] border p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-300 sm:p-6 ${viewMode === 'appointed'
          ? 'border-[var(--accent)]/40 bg-[linear-gradient(135deg,var(--accent-soft),rgba(255,255,255,0.05),var(--surface-soft))] shadow-[0_12px_30px_rgba(193,159,74,0.12)]'
          : 'border-[var(--border)]/70 bg-[var(--surface)]/70'}`}>
          <AnimatePresence mode="wait">
            {viewMode === 'hebrew' ? (
              <motion.div key="hebrew" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Today in the Hebrew calendar</p>
                <h3 className="text-3xl font-semibold text-[var(--text-primary)]">{hebrewDateLabel}</h3>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{hebrewDateHebrewLabel}</p>
                <p className="text-sm text-[var(--text-secondary)]">{hebrewWeekday}</p>
                <p className="text-sm text-[var(--text-secondary)]">{gregorianDateLabel}</p>
              </motion.div>
            ) : (
              <motion.div key="appointed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Next appointed time</p>
                <h3 className="text-3xl font-semibold text-[var(--text-primary)]">{nextFeast.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{nextFeast.daysRemaining} day{nextFeast.daysRemaining === 1 ? '' : 's'} remaining</p>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{nextFeast.preview}</p>
                <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/60 bg-[rgba(255,255,255,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-primary)] shadow-[0_6px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[rgba(255,255,255,0.14)] hover:text-[var(--text-primary)]"><Sparkles className="h-3.5 w-3.5" />Learn About {nextFeast.name}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }} className="rounded-[32px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Scripture of the Day</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{scripture.reference}</h2>
          </div>
          <span className="rounded-full border border-[var(--border)]/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{scripture.category}</span>
        </div>
        <p className="mt-5 text-xl leading-9 text-[var(--text-primary)]">“{scripture.verse}”</p>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">Translation: {scripture.translation}</p>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">Reflection: {scripture.reflection}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <button type="button" className="rounded-full border border-[var(--border)]/70 px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]">Share</button>
          <button type="button" className="rounded-full border border-[var(--border)]/70 px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]">Save to journal</button>
        </div>
      </motion.section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[var(--accent)]"><BookOpen className="h-5 w-5" /> <span className="text-xs uppercase tracking-[0.28em]">Memory Verse of the Week</span></div>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{memoryVerse.reference}</h3>
          <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">“{memoryVerse.text}”</p>
          <div className="mt-5 rounded-[18px] border border-[var(--border)]/70 bg-[var(--surface)]/80 p-4 text-sm text-[var(--text-secondary)]">Memorization progress: {memoryVerse.progress}%</div>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[var(--accent)]"><Compass className="h-5 w-5" /> <span className="text-xs uppercase tracking-[0.28em]">Reflection Question</span></div>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">How can you let Scripture guide one decision you make today?</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">A practical prompt shaped by the verse of the day and your current spiritual focus.</p>
        </motion.article>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[var(--accent)]"><Star className="h-5 w-5" /> <span className="text-xs uppercase tracking-[0.28em]">This Week&apos;s Theme</span></div>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{weeklyTheme}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">Growing in understanding, discernment, and obedience through Scripture this week.</p>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[var(--accent)]"><HeartHandshake className="h-5 w-5" /> <span className="text-xs uppercase tracking-[0.28em]">Prayer Focus</span></div>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{prayerFocus}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">Ask Elohim for grace in decisions, conversations, and quiet obedience today.</p>
        </motion.article>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[var(--accent)]"><ScrollText className="h-5 w-5" /> <span className="text-xs uppercase tracking-[0.28em]">Continue Journey</span></div>
          <ul className="mt-5 space-y-3 text-sm text-[var(--text-secondary)]">
            <li>Current Torah Portion: <span className="font-semibold text-[var(--text-primary)]">Bereishit</span></li>
            <li>Current Reading Plan: <span className="font-semibold text-[var(--text-primary)]">Psalms in 30 Days</span></li>
            <li>Last Activity: <span className="font-semibold text-[var(--text-primary)]">Aliyah 3 completed yesterday</span></li>
          </ul>
          <Link href="/torah-portions" className="mt-6 inline-flex rounded-full border border-[var(--border)]/70 px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-soft)]">Resume</Link>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[var(--accent)]"><NotebookPen className="h-5 w-5" /> <span className="text-xs uppercase tracking-[0.28em]">Wisdom Insight</span></div>
          <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">Daily wisdom</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{wisdomInsight}</p>
        </motion.article>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.44 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Growth Summary</p>
          <ul className="mt-5 space-y-3 text-sm text-[var(--text-secondary)]">
            <li>Reading streak: <span className="font-semibold text-[var(--text-primary)]">18 days</span></li>
            <li>Torah portions completed: <span className="font-semibold text-[var(--text-primary)]">12</span></li>
            <li>Wisdom articles read: <span className="font-semibold text-[var(--text-primary)]">34</span></li>
            <li>Journal entries: <span className="font-semibold text-[var(--text-primary)]">27</span></li>
            <li>Memory verses learned: <span className="font-semibold text-[var(--text-primary)]">9</span></li>
          </ul>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48 }} className="rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)]/60 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Upcoming Biblical Events</p>
          <ul className="mt-5 space-y-3 text-sm text-[var(--text-secondary)]">
            {feastEventsWithDays.slice(0, 3).map((event, index) => (
              <li key={event.name} className="flex items-center justify-between gap-3 rounded-[18px] border border-[var(--border)]/70 bg-[var(--surface)]/80 p-3">
                <button type="button" onClick={() => { setSelectedFeastIndex(index); setIsModalOpen(true); }} className="text-left text-[var(--text-primary)] hover:text-[var(--accent)]">{event.name} — {event.daysRemaining} day{event.daysRemaining === 1 ? '' : 's'}</button>
                <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">{event.shortLabel}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedFeast ? (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="w-full max-w-xl rounded-[28px] border border-[var(--border)]/70 bg-[var(--surface)] p-4 shadow-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Feast details</p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">{selectedFeast.name}</h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] sm:text-sm">{selectedFeast.shortLabel}</p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full border border-[var(--border)]/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">Close</button>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)] sm:mt-5 sm:leading-7">{selectedFeast.description}</p>
              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                <article className="rounded-[22px] border border-[var(--border)]/70 bg-[var(--surface-soft)] p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Why it matters</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:leading-7">{selectedFeast.significance}</p>
                </article>
                <article className="rounded-[22px] border border-[var(--border)]/70 bg-[var(--surface-soft)] p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Observances</p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">{selectedFeast.observances.map((item) => <li key={item}>• {item}</li>)}</ul>
                </article>
              </div>

              <article className="mt-5 rounded-[22px] border border-[var(--border)]/70 bg-[var(--surface-soft)] p-4 sm:mt-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Scripture touchpoints</p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">{selectedFeast.referenceVerses.map((item) => <li key={item}>• {item}</li>)}</ul>
              </article>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
                <button type="button" onClick={() => setSelectedFeastIndex((selectedFeastIndex - 1 + feastEventsWithDays.length) % feastEventsWithDays.length)} className="rounded-full border border-[var(--border)]/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">Previous</button>
                <button type="button" onClick={() => setSelectedFeastIndex((selectedFeastIndex + 1) % feastEventsWithDays.length)} className="rounded-full border border-[var(--border)]/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)]">Next</button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
