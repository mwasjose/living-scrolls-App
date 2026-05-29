'use client';

import { motion } from 'framer-motion';
import { WisdomFeedCard } from '@/components/cards/WisdomFeedCard';

const wisdomEntries = [
  {
    title: 'The Significance of "Bereshit"',
    category: 'Hebrew Word Study',
    excerpt: 'The very first word of Torah, בְּרֵאשִׁית (Bereshit), means "in the beginning." It encapsulates the creative power of Elohim...',
    author: 'AI Mentor',
  },
  {
    title: 'Messiah in the Manna',
    category: 'Messianic Teaching',
    excerpt: 'The manna provided in the wilderness was a miraculous provision, foreshadowing Yahshuah Messiah as the true Bread of Life...',
    author: 'AI Mentor',
  },
  {
    title: 'Reflection on Obedience',
    category: 'Reflection Prompt',
    excerpt: 'How does a heart of obedience bring us closer to Adonai? Reflect on areas where you can align more fully with His Torah...',
    author: 'AI Mentor',
  },
];

export default function WisdomPage() {
  return (
    <div className="space-y-8 py-6">
      <section className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Torah Wisdom Feed</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Daily insights for your spiritual journey.</h1>
        <p className="mt-4 max-w-2xl text-slate-200/90">Receive AI-generated Torah insights, Hebrew word studies, and Messianic teachings to deepen your walk with Yahshuah Messiah.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {wisdomEntries.map((entry, index) => (
          <motion.div
            key={entry.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <WisdomFeedCard {...entry} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}