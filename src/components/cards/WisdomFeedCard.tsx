'use client';

import { motion } from 'framer-motion';

interface WisdomFeedCardProps {
  title: string;
  category: string;
  excerpt: string;
  author: string;
}

export function WisdomFeedCard({ title, category, excerpt, author }: WisdomFeedCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 cursor-pointer"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{category}</p>
      <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)] font-title">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{excerpt}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">— {author}</p>
    </motion.div>
  );
}