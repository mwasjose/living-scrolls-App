'use client';

import type { TorahPortionDetail } from '@/lib/models';

interface TorahHeroProps {
  portion: TorahPortionDetail;
}

export function TorahHero({ portion }: TorahHeroProps) {
  return (
    <section className="space-y-6 pb-8">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">Weekly Torah Portion</p>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">{portion.title}</h1>
          <p className="text-xl text-[var(--text-secondary)]">{portion.hebrewTitle}</p>
          <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)]">{portion.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
          <span className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">References</span>
          <span>{portion.references}</span>
        </div>
      </div>
    </section>
  );
}

