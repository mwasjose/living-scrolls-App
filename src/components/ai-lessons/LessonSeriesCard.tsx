'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LessonSeries, AILesson } from '@/lib/models';
import { ChevronRight, BookOpen, Zap } from 'lucide-react';

interface LessonSeriesCardProps {
  series: LessonSeries;
  lessons: AILesson[];
  completedCount?: number;
  onStart?: () => void;
  onContinue?: () => void;
}

export function LessonSeriesCard({
  series,
  lessons,
  completedCount = 0,
  onStart,
  onContinue,
}: LessonSeriesCardProps) {
  const progressPercent = (completedCount / series.totalLessons) * 100;
  const isStarted = completedCount > 0;
  const isCompleted = completedCount === series.totalLessons;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-soft transition hover:border-[var(--accent)] hover:shadow-soft"
    >
      {/* Header with cover */}
      <div className="relative overflow-hidden h-40 bg-[var(--surface-soft)]">
        {series.coverImage && (
          <Image
            src={series.coverImage}
            alt={series.title}
            fill
            className="object-cover opacity-20 group-hover:scale-110 transition duration-500"
          />
        )}

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-start justify-between p-4">
          <div>
            <span className="inline-flex rounded-full bg-accent-soft border border-accent px-3 py-1 text-xs font-semibold text-accent uppercase tracking-widest">
              Series
            </span>
          </div>
          {isCompleted && (
            <div className="rounded-full bg-green-500/20 border border-green-500/50 p-2">
              <Zap className="h-4 w-4 text-green-400" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-accent transition">
          {series.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2">{series.description}</p>

        {/* Category and difficulty */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-[var(--surface-soft)] px-2.5 py-1 text-[var(--text-secondary)]">
            {series.category}
          </span>
          <span className="rounded-full bg-[var(--surface-soft)] px-2.5 py-1 text-[var(--text-secondary)]">
            {series.difficulty}
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              {completedCount} of {series.totalLessons} lessons
            </span>
            <span className="text-accent font-semibold">{Math.round(progressPercent)}%</span>
          </div>

          {/* Progress bar */}
          <div className="overflow-hidden rounded-full bg-card-soft h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-accent to-amber-400"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] pt-2">
          <BookOpen className="h-3 w-3 text-[var(--accent)]" />
          <span>{series.estimatedCompletionTime}</span>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={isStarted ? onContinue : onStart}
          className="w-full mt-4 rounded-full bg-accent px-6 py-3 font-semibold text-slate-950 transition hover:bg-accent-soft flex items-center justify-center gap-2"
        >
          {isCompleted ? 'Completed!' : isStarted ? 'Continue Series' : 'Start Series'}
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
