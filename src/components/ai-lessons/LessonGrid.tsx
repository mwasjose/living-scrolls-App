'use client';

import { motion } from 'framer-motion';
import { AILesson } from '@/lib/models';
import { PremiumArticleCard } from './PremiumArticleCard';

interface LessonGridProps {
  lessons: AILesson[];
  title: string;
  subtitle?: string;
  emptyMessage?: string;
  onSelectLesson?: (lesson: AILesson) => void;
  onSaveLesson?: (lesson: AILesson) => void;
  savedArticles?: string[];
  columns?: number;
}

export function LessonGrid({
  lessons,
  title,
  subtitle,
  emptyMessage = 'No teachings found',
  onSelectLesson,
  onSaveLesson,
  savedArticles = [],
  columns = 3,
}: LessonGridProps) {
  if (lessons.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
        </div>

        <div className="rounded-[24px] border-2 border-dashed border-white/20 p-12 text-center">
          <p className="text-slate-400">{emptyMessage}</p>
        </div>
      </motion.section>
    );
  }

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
      </div>

      {/* Grid */}
      <div className={`grid gap-6 ${gridColsClass}`}>
        {lessons.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <PremiumArticleCard
              lesson={lesson}
              onRead={() => onSelectLesson?.(lesson)}
              onSave={() => onSaveLesson?.(lesson)}
              isSaved={savedArticles.includes(lesson.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
