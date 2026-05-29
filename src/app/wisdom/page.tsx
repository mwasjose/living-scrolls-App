'use client';

import { motion } from 'framer-motion';
import AILessonsPage from '@/app/ai-lessons/page';

export default function WisdomPage() {
  return (
    <div className="space-y-8 py-6">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)] font-title">Wisdom Feed</p>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] font-title">AI-powered lessons for every step of your spiritual path.</h1>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Dive into the AI Lesson Library directly from your Wisdom feed. Explore Torah insights, word studies, and guided reflections built for your daily spiritual journey.
        </p>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)] font-title">AI Lesson Library</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)] font-title">Explore teachings, stories, and guided reflections.</h2>
          <p className="mt-2 text-[var(--text-secondary)]">Your Wisdom feed now opens the full AI lessons experience with one elegant study flow.</p>
        </div>
        <AILessonsPage />
      </section>
    </div>
  );
}
