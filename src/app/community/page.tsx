'use client';

import { motion } from 'framer-motion';
import { CommunityCard } from '@/components/cards/community-card';

const circles = [
  { title: 'Torah Circle: Genesis', description: 'Weekly study group focusing on the first book of the Torah.', tag: 'Study' },
  { title: 'Prayer Requests', description: 'A gentle space to share requests and stand in agreement together.', tag: 'Prayer' },
  { title: 'Mentorship Path', description: 'One-on-one guidance for spiritual formation and Hebrew reading.', tag: 'Mentor' },
];

export default function CommunityPage() {
  return (
    <div className="space-y-8 py-6">
      <section className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Community</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Connect with Torah hearts and prayer circles.</h1>
        <p className="mt-4 max-w-2xl text-slate-200/90">Engage in study groups, share requests, and grow with mentors rooted in Messianic faith.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {circles.map((circle) => (
          <motion.div key={circle.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <CommunityCard {...circle} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
