'use client';

import type { TorahPortionDetail } from '@/lib/models';

interface TorahHeroProps {
  portion: TorahPortionDetail;
  progress: number;
}

export function TorahHero({ portion, progress }: TorahHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[var(--surface)]/10 p-8 transition">
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

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {[
            { label: 'References', value: portion.references },
          ].map((item) => (
            <section key={item.label} className="rounded-[24px] bg-[var(--surface)]/75 p-4 transition hover:bg-[var(--surface)]/90">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-primary truncate">{item.value}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

