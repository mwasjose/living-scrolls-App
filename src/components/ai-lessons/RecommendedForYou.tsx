'use client';

import { motion } from 'framer-motion';
import { AILesson } from '@/lib/models';
import { Sparkles } from 'lucide-react';
import { PremiumArticleCard } from './PremiumArticleCard';

interface RecommendedForYouProps {
  lessons: AILesson[];
  reason?: string;
  onSelectLesson?: (lesson: AILesson) => void;
  onSaveLesson?: (lesson: AILesson) => void;
  savedArticles?: string[];
}

export function RecommendedForYou({
  lessons,
  reason = 'Based on your reading history and interests',
  onSelectLesson,
  onSaveLesson,
  savedArticles = [],
}: RecommendedForYouProps) {
  if (lessons.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-accent" />
        <div>
          <h2 className="text-3xl font-bold text-white">Recommended For You</h2>
          <p className="mt-1 text-sm text-slate-400">{reason}</p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {lessons.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <PremiumArticleCard
              lesson={lesson}
              onRead={() => onSelectLesson?.(lesson)}
              onSave={() => onSaveLesson?.(lesson)}
              isSaved={savedArticles.includes(lesson.id)}
              variant="compact"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
