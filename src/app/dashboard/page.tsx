'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import Link from 'next/link';
import { BookOpen, Scroll, Brain, Languages } from 'lucide-react';
import { VerseCard } from '@/components/cards/verse-card';
import { PrayerTrackerCard } from '@/components/cards/prayer-tracker-card';
import { MemorizationProgressCard } from '@/components/cards/memorization-progress-card';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);
  const displayName = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Beloved';

  if (loading || profileLoading) {
    return <div className="py-20 text-center text-[var(--accent)]">Preparing your spiritual dashboard...</div>;
  }

  if (!user) {
    return (
      <section className="space-y-6 card-soft p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--text-secondary)]">Welcome</p>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Sign in to your sacred dashboard.</h1>
        <p className="mt-4 text-[var(--text-muted)]">Your personalized Torah study plan and spiritual progress await.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login" className="btn-primary text-xs sm:text-sm">
            Sign in
          </Link>
          <Link href="/register" className="btn-secondary text-xs sm:text-sm">
            Create account
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-16 py-6">
      {/* Greeting Section */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Spiritual Journey</p>
          <h1 className="mt-2 text-4xl font-bold text-[var(--text-primary)] leading-tight">Shalom, {displayName}.</h1>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Today&apos;s scroll offers scripture, wisdom, and opportunities for spiritual growth in Adonai&apos;s presence.
          </p>
        </div>
      </motion.section>


      {/* Today's Scripture (Featured Card) */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">Today&apos;s Light</p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">Daily Scripture</h2>
        </div>
        <VerseCard verse="Psalm 119:105" text="Your word is a lamp to my feet and a light to my path." reference="HalleluYah Scriptures" />
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid gap-16 lg:grid-cols-3">
        {/* Primary Content */}
        <div className="space-y-16 lg:col-span-2">
          {/* Continue Reading */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">Continue</p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">Your Reading Journey</h2>
            </div>
            <div className="space-y-3 card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Genesis 1-10 Reading Plan</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">Chapter 3 of 40 • 24% complete</p>
                </div>
                <Link href="/reading-plans" className="btn-primary text-sm font-semibold text-[var(--text-on-accent)]">
                  Continue
                </Link>
              </div>
            </div>
          </motion.section>

          {/* This Week's Torah */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">Torah Portion</p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">This Week&apos;s Parashah</h2>
            </div>
            <div className="space-y-3 card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Parashat Bereishit</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">Genesis 1:1 - 6:8</p>
                </div>
                <Link href="/torah-portions" className="btn-primary text-sm font-semibold text-[var(--text-on-accent)]">
                  Study
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Tracker Cards */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="grid gap-6 sm:grid-cols-2">
            <PrayerTrackerCard userId={user.uid} />
            <MemorizationProgressCard userId={user.uid} />
          </motion.section>

          {/* Recent Wisdom */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">Insights</p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">Recent Wisdom</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-4 card-soft p-4">
                <h3 className="font-semibold text-[var(--text-primary)]">The Power of Repentance</h3>
                <p className="text-sm text-[var(--text-secondary)]">Discover how teshuvah transforms spiritual practice</p>
              </div>
              <div className="space-y-4 card-soft p-4">
                <h3 className="font-semibold text-[var(--text-primary)]">Hebrew Word Study: Shalom</h3>
                <p className="text-sm text-[var(--text-secondary)]">Explore the depth of peace and wholeness</p>
              </div>
            </div>
            <Link href="/ai-lessons" className="inline-flex rounded-full border border-[var(--accent)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/10">
              Explore All
            </Link>
          </motion.section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:col-span-1">
          {/* Quick Access */}
          <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.22em] font-semibold text-[var(--text-primary)]">Quick Access</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/reading-plans"
                title="Plans"
                className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card text-[var(--accent)] transition hover:bg-[var(--surface)]/40 hover:border-[var(--accent)]/30"
              >
                <BookOpen className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/bible-reader"
                title="Bible Reader"
                className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card text-[var(--accent)] transition hover:bg-[var(--surface)]/40 hover:border-[var(--accent)]/30"
              >
                <Scroll className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/trivia"
                title="Trivia"
                className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card text-[var(--accent)] transition hover:bg-[var(--surface)]/40 hover:border-[var(--accent)]/30"
              >
                <Brain className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/hebrew-learning"
                title="Hebrew Learning"
                className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card text-[var(--accent)] transition hover:bg-[var(--surface)]/40 hover:border-[var(--accent)]/30"
              >
                <Languages className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.section>

        </aside>
      </div>
    </div>
  );
}
