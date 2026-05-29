'use client';

import { motion } from 'framer-motion';
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
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-midnight/40 to-slate-900/30 shadow-soft transition hover:border-gold/30 hover:shadow-glow"
    >
      {/* Header with cover */}
      <div className="relative overflow-hidden h-40 bg-gradient-to-br from-gold/20 to-amber-500/10">
        {series.coverImage && (
          <img
            src={series.coverImage}
            alt={series.title}
            className="h-full w-full object-cover opacity-20 group-hover:scale-110 transition duration-500"
          />
        )}

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-start justify-between p-4">
          <div>
            <span className="inline-flex rounded-full bg-gold/20 border border-gold/50 px-3 py-1 text-xs font-semibold text-gold uppercase tracking-widest">
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
        <h3 className="text-xl font-bold text-white group-hover:text-gold transition">
          {series.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2">{series.description}</p>

        {/* Category and difficulty */}
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-blue-500/20 text-blue-300 px-2.5 py-1">
            {series.category}
          </span>
          <span className="rounded-full bg-amber-500/20 text-amber-300 px-2.5 py-1">
            {series.difficulty}
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              {completedCount} of {series.totalLessons} lessons
            </span>
            <span className="text-gold font-semibold">{Math.round(progressPercent)}%</span>
          </div>

          {/* Progress bar */}
          <div className="overflow-hidden rounded-full bg-white/10 h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-gold to-amber-400"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
          <BookOpen className="h-3 w-3" />
          <span>{series.estimatedCompletionTime}</span>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={isStarted ? onContinue : onStart}
          className="w-full mt-4 rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-gold/90 flex items-center justify-center gap-2"
        >
          {isCompleted ? 'Completed!' : isStarted ? 'Continue Series' : 'Start Series'}
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
