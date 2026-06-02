'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollCard } from '@/components/cards/scroll-card';
import { LessonCard } from '@/components/cards/lesson-card';

const features = [
  'Daily Torah reflection and spiritual missions',
  'Messianic Bible quizzes with scholar insight',
  'Hebrew learning cards with word study',
  'Live scripture challenges and community circles',
];

export default function HomePage() {
  return (
    <div className="space-y-12 py-6 min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-1 text-xs uppercase tracking-[0.24em] text-[var(--accent)] font-bold">
              Sacred growth platform
            </span>
            <h1 className="hero-title max-w-3xl leading-tight text-[var(--text-primary)] sm:text-5xl">
              <span className="text-[var(--accent)]">Living Scrolls</span> — a cinematic sanctuary for Torah study & reflection.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              Journey with Yahshuah Messiah through Torah study, Bible trivia, Hebrew wisdom, and community rhythms shaped by Adonai and Ruach HaKodesh.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="btn-primary text-xs sm:text-sm w-full sm:w-auto justify-center inline-flex"
              >
                Enter the scrolls
              </Link>
              <Link
                href="/register"
                className="btn-secondary text-xs sm:text-sm w-full sm:w-auto justify-center inline-flex"
              >
                Begin your journey
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-bold">Spirit-led highlights</p>
              <div className="mt-6 grid gap-4">
                {features.map((feature) => (
                  <div key={feature} className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)]">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ScrollCard title="Torah portion cycles" subtitle="Weekly readings with commentary and insight." />
              <LessonCard title="Daily wisdom" category="Faith" description="AI lessons tuned to deep spiritual formation." />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-semibold tracking-[0.12em] uppercase text-[var(--accent)]">Sacred pathways</h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Explore a modern scroll experience with scripture reading, Torah study, Hebrew learning, and communal prayer spaces that feel precious and timeless.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)]">
              <p className="font-semibold text-[var(--accent)]">AI Encouragement</p>
              <p className="mt-2 text-[var(--text-muted)]">Adonai speaks hope into your daily walk.</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)]">
              <p className="font-semibold text-[var(--accent)]">Hebrew study</p>
              <p className="mt-2 text-[var(--text-muted)]">Learn bereshit, shemot, vayikra, bamidbar and devarim.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-semibold tracking-[0.12em] uppercase text-[var(--accent)]">Featured scripture</h2>
          <p className="mt-4 text-[var(--text-muted)]">Your word is a lamp to my feet and a light to my path. — Psalm 119:105</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">Messianic invitation</p>
              <p className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Delve into living Torah and discover daily quiet revival.</p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)]">
                <p className="uppercase tracking-[0.18em] text-[var(--accent)]">Community circles</p>
                <p className="mt-3 text-sm text-[var(--text-muted)]">Connect with study groups and prayer hearts.</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-primary)]">
                <p className="uppercase tracking-[0.18em] text-[var(--accent)]">Scripture challenges</p>
                <p className="mt-3 text-sm text-[var(--text-muted)]">Train memory and deepen your daily reading rhythm.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
