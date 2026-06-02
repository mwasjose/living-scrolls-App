'use client';

import { motion } from 'framer-motion';

interface DisciplineTrackerCardProps {
  title: string;
  disciplines: { name: string; completed: boolean }[];
}

export function DisciplineTrackerCard({ title, disciplines }: DisciplineTrackerCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[32px] border border-border bg-card p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">{title}</p>
      <div className="mt-5 space-y-3">
        {disciplines.map((discipline) => (
          <div key={discipline.name} className="flex items-center justify-between rounded-3xl border border-border bg-card p-4 text-[var(--text-secondary)]">
            <p>{discipline.name}</p>
            {discipline.completed ? (
              <span className="text-emerald-400">✓</span>
            ) : (
              <span className="text-slate-500">○</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}