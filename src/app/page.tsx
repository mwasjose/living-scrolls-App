'use client';

import Link from 'next/link';

const highlights = [
  'Continue your current parashah with a daily reading rhythm.',
  'Capture a reflection, prayer focus, or insight in the moment.',
  'Keep your streak moving with small, sacred habits.',
];

export default function HomePage() {
  return (
    <main className="min-h-screen pb-24 bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-3xl px-5 pt-6 space-y-8">
        {/* Greeting */}
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] font-semibold">Daily Scroll</p>
          <h1 className="text-2xl font-bold leading-tight">Good morning — begin with a calm rhythm</h1>
          <p className="text-sm text-[var(--text-secondary)]">Scripture, reflection, and steady progress—designed for daily use on your phone.</p>
        </section>

        {/* Today's Scripture */}
        <section className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)] font-semibold">Today’s Scripture</p>
              <h2 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">Psalm 119:105</h2>
              <p className="text-sm text-[var(--text-secondary)]">A lamp for your feet, a light for your path.</p>
            </div>
            <Link href="/bible-reader" className="rounded-full bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-[var(--text-on-accent)]">
              Read
            </Link>
          </div>
        </section>

        {/* Continue Reading */}
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)] font-semibold">Continue</p>
          <div className="space-y-3">
            <Link href="/reading-plans" className="block rounded-lg px-3 py-4">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Your current journey</h3>
              <p className="text-sm text-[var(--text-secondary)]">Continue the Torah cycle — Genesis • Chapter 12 • Day 34</p>
            </Link>
            <Link href="/ai-lessons" className="block rounded-lg px-3 py-4">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Daily Wisdom</h3>
              <p className="text-sm text-[var(--text-secondary)]">A short reflection to carry through the day.</p>
            </Link>
          </div>
        </section>

        {/* Current Torah Portion */}
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)] font-semibold">Torah Portion</p>
          <div className="px-0 py-2">
            <h3 className="text-base font-semibold">Parashat Chayei Sarah</h3>
            <p className="text-sm text-[var(--text-secondary)]">Overview • Reading path • Key insights</p>
          </div>
        </section>

        {/* Recent Activity & Prayer Focus */}
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)] font-semibold">Recent</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Recent activity</p>
                <p className="text-xs text-[var(--text-secondary)]">Reflections • Readings • Streaks</p>
              </div>
              <Link href="/activity" className="text-xs text-[var(--accent)] font-semibold">View</Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Prayer focus</p>
                <p className="text-xs text-[var(--text-secondary)]">Pause, offer, and commit one thing today.</p>
              </div>
              <Link href="/profile" className="text-xs text-[var(--accent)] font-semibold">Open</Link>
            </div>
          </div>
        </section>

        {/* Spiritual Journey */}
        <section className="space-y-2 pb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)] font-semibold">Journey</p>
          <div>
            <h3 className="text-base font-semibold">Momentum and milestones</h3>
            <p className="text-sm text-[var(--text-secondary)]">Streak: 3 days • Lessons: 8</p>
          </div>
        </section>
      </div>
    </main>
  );
}
