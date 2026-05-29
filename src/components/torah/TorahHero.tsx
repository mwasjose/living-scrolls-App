'use client';

import { motion } from 'framer-motion';
import type { TorahPortionDetail } from '@/lib/models';

interface TorahHeroProps {
  portion: TorahPortionDetail;
  progress: number;
}

export function TorahHero({ portion, progress }: TorahHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-soft bg-surface p-8 shadow-soft transition">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,163,17,0.14),_transparent_38%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-[rgba(252,163,17,0.16)] blur-3xl" />
      <div className="relative space-y-6 lg:max-w-3xl">
        <span className="inline-flex rounded-full border border-soft bg-surface-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
          Weekly Torah Portion
        </span>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-secondary">Immersive sacred study hall</p>
          <h1 className="hero-title text-primary">{portion.title} — {portion.hebrewTitle}</h1>
          <p className="max-w-2xl text-base leading-8 text-secondary">{portion.summary}</p>
        </div>

        <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <motion.div whileHover={{ y: -2 }} className="card-sacred p-3">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Hebrew title</p>
            <p className="mt-2 text-sm font-semibold text-primary truncate">{portion.hebrewTitle}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="card-sacred p-3">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Transliteration</p>
            <p className="mt-2 text-sm font-semibold text-primary truncate">{portion.transliteration}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="card-sacred p-3">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">References</p>
            <p className="mt-2 text-sm font-semibold text-primary truncate">{portion.references}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="card-sacred p-3">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Cycle progress</p>
            <p className="mt-2 text-sm font-semibold text-primary truncate">{portion.cycleProgress}</p>
          </motion.div>
        </div>

        <div className="rounded-[28px] border border-soft bg-surface-soft p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">Reading focus</p>
              <p className="mt-2 text-lg font-semibold text-primary">{portion.themes.slice(0, 2).join(' · ')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">Study momentum</p>
              <p className="mt-2 text-lg font-semibold accent-primary">{progress}%</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-soft">
            <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

