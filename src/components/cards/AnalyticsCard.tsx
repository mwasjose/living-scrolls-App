'use client';

import { motion } from 'framer-motion';

interface AnalyticsCardProps {
  title: string;
value: string;
  description: string;
}

export function AnalyticsCard({ title, value, description }: AnalyticsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)] font-semibold">{title}</p>
      <h3 className="mt-4 text-3xl font-semibold text-[var(--accent)]">{value}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{description}</p>
    </motion.div>
  );
}