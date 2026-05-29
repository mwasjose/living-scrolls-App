'use client';

import { motion } from 'framer-motion';
import type { TorahHebrewKeyword } from '@/lib/models';

interface HebrewExplorerProps {
  keywords: TorahHebrewKeyword[];
}

export function HebrewExplorer({ keywords }: HebrewExplorerProps) {
  return (
    <section id="hebrew" className="space-y-6 section-card p-6 shadow-soft">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Hebrew explorer</p>
        <h2 className="section-title mt-3 text-3xl text-primary">Visual root study with glyph animation.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {keywords.map((keyword, index) => (
          <motion.article
            key={keyword.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group overflow-hidden card-sacred p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-surface-soft text-2xl font-semibold text-primary">
                {keyword.letter}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-secondary">{keyword.word}</p>
                <p className="mt-2 text-xl font-semibold text-primary">{keyword.transliteration}</p>
              </div>
            </div>
            <div className="mt-4 rounded-3xl border border-soft bg-surface p-4 opacity-90 transition group-hover:opacity-100">
              <p className="text-sm font-semibold text-primary">Meaning</p>
              <p className="mt-2 text-sm leading-7 text-secondary">{keyword.meaning}</p>
            </div>
            <div className="mt-4 grid gap-2 rounded-3xl bg-surface p-4 text-sm leading-6 text-secondary">
              <div className="rounded-2xl bg-surface-soft px-3 py-2">Root: {keyword.root}</div>
              <div className="rounded-2xl bg-surface-soft px-3 py-2">Morphology: {keyword.morphology}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

