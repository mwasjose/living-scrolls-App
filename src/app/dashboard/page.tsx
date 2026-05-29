'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useTorahProgress } from '@/hooks/useTorahProgress';
import { useUserProfile } from '@/hooks/useUserProfile';
import Link from 'next/link';
import { BookOpen, Scroll, Brain, Languages, Bell } from 'lucide-react';
import { VerseCard } from '@/components/cards/verse-card';
import { ScrollCard } from '@/components/cards/scroll-card';
import { LessonCard } from '@/components/cards/lesson-card';
import { PrayerTrackerCard } from '@/components/cards/prayer-tracker-card';
import { MemorizationProgressCard } from '@/components/cards/memorization-progress-card';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);
  const displayName = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Beloved';
  const { progress: torahProgressData, loading: progressLoading } = useTorahProgress(user?.uid ?? undefined);

  const notifications = profile?.notifications ?? [];
  const notificationCount = notifications.length;
  const latestNotifications = notifications.slice(0, 3);

  if (loading || profileLoading || progressLoading) {
    return <div className="py-20 text-center text-[var(--accent)]">Preparing your spiritual dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--text-secondary)]">Welcome</p>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Sign in to your sacred dashboard.</h1>
        <p className="mt-4 text-[var(--text-muted)]">Your personalized Torah study plan and spiritual progress await.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login" className="btn-avast-primary text-xs sm:text-sm">
            Sign in
          </Link>
          <Link href="/register" className="btn-avast-secondary text-xs sm:text-sm">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-2xl border border-bronze/20 bg-cream/90 p-6 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-olive">Daily spiritual pulse</p>
            <h1 className="mt-4 text-3xl font-semibold text-deep font-title">Shalom, Mwangi.</h1>
            <p className="mt-3 max-w-2xl text-deep/80">Your daily scroll offers scripture, mission wisdom, and the next steps for growth in Adonai’s presence.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:w-[420px]">
            <div className="rounded-xl border border-bronze/15 bg-cream/90 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-olive">Wisdom XP</p>
              <p className="mt-3 text-3xl font-semibold text-deep">{profile?.wisdomXP ?? 2480}</p>
            </div>
            <div className="rounded-xl border border-bronze/15 bg-cream/90 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-olive">Streak</p>
              <p className="mt-3 text-3xl font-semibold text-deep">{profile?.streakDays ?? 12} days</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="grid gap-6">
            <VerseCard verse="Psalm 119:105" text="Your word is a lamp to my feet and a light to my path." reference="HalleluYah Scriptures" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-2xl border border-bronze/15 bg-cream/90 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-olive">Daily missions</p>
                <p className="mt-2 text-deep/80">Nurture your heart with Scripture, reflection, and wisdom.</p>
              </div>
              <Link href="/journal" className="rounded-xl border border-bronze/20 bg-cream/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-olive transition hover:bg-cream/90">
                Journal
              </Link>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-bronze/10 bg-cream/95 p-4 text-sm text-deep">Study today’s Torah portion</div>
              <div className="rounded-xl border border-bronze/10 bg-cream/95 p-4 text-sm text-deep">Memorize Psalm 23 verse 1</div>
              <div className="rounded-xl border border-bronze/10 bg-cream/95 p-4 text-sm text-deep">Complete 1 Messianic trivia set</div>
              <div className="rounded-xl border border-bronze/10 bg-cream/95 p-4 text-sm text-deep">Reflect in your prayer journal</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="grid gap-4 sm:grid-cols-2">
            <ScrollCard title="Torah portion" subtitle="Bereshit — Genesis 1 and Messianic connection." />
            <PrayerTrackerCard userId={user.uid} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="grid gap-4 sm:grid-cols-2">
            <MemorizationProgressCard userId={user.uid} />
            <LessonCard title="AI encouragement" category="Prayer" description="Receive a daily word that awakens your spiritual habits." />
          </motion.div>
        </section>

        <aside className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-2xl border border-bronze/15 bg-cream/90 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-olive">Notifications</p>
                <p className="mt-2 text-sm text-deep/70">Latest reminders from your journey.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-olive/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-olive">
                <Bell size={14} /> {notificationCount} new
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-deep">
              {notificationCount > 0 ? (
                latestNotifications.map((message) => (
                  <div key={message.id} className="rounded-xl border border-bronze/10 bg-cream/95 p-4">
                    <p className="font-semibold text-deep">{message.title}</p>
                    <p className="mt-1 text-sm text-deep/80">{message.message}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-bronze/10 bg-cream/95 p-4 text-sm text-deep/70">
                  No new notifications yet. Your next reminder will appear here after you continue your study and journal rhythm.
                </div>
              )}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="p-2">
            <h2 className="text-lg font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">Quick Access</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/journal" title="Journal" aria-label="Journal" className="p-2 rounded-lg hover:bg-[var(--accent-soft)] transition group">
                <BookOpen className="h-6 w-6 text-[var(--accent)] transition group-hover:scale-110" strokeWidth={1.6} />
              </Link>
              <Link href="/bible-reader" title="Bible Reader" aria-label="Bible Reader" className="p-2 rounded-lg hover:bg-[var(--accent-soft)] transition group">
                <Scroll className="h-6 w-6 text-[var(--color-avast-green)] transition group-hover:scale-110" strokeWidth={1.6} />
              </Link>
              <Link href="/trivia" title="Trivia" aria-label="Trivia" className="p-2 rounded-lg hover:bg-[var(--accent-soft)] transition group">
                <Brain className="h-6 w-6 text-[var(--color-avast-cyan-light)] transition group-hover:scale-110" strokeWidth={1.6} />
              </Link>
              <Link href="/hebrew-learning" title="Hebrew Learning" aria-label="Hebrew Learning" className="p-2 rounded-lg hover:bg-[var(--accent-soft)] transition group">
                <Languages className="h-6 w-6 text-[var(--accent)] transition group-hover:scale-110" strokeWidth={1.6} />
              </Link>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
