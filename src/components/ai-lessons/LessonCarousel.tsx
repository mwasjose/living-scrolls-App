'use client';

import { motion } from 'framer-motion';
import { AILesson } from '@/lib/models';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { PremiumArticleCard } from './PremiumArticleCard';

interface LessonCarouselProps {
  lessons: AILesson[];
  title: string;
  subtitle?: string;
  onSelectLesson?: (lesson: AILesson) => void;
  onSaveLesson?: (lesson: AILesson) => void;
  savedArticles?: string[];
}

export function LessonCarousel({
  lessons,
  title,
  subtitle,
  onSelectLesson,
  onSaveLesson,
  savedArticles = [],
}: LessonCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, lessons.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  if (lessons.length === 0) {
    return null;
  }

  const visibleLessons = lessons.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
        </div>

        {lessons.length > itemsPerView && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded-full border border-white/20 bg-white/5 p-3 text-white transition hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="rounded-full border border-white/20 bg-white/5 p-3 text-white transition hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Carousel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {visibleLessons.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
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

      {/* Progress indicator */}
      {lessons.length > itemsPerView && (
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: Math.ceil(lessons.length / itemsPerView) }).map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1 rounded-full transition ${
                idx === Math.floor(currentIndex / 1)
                  ? 'w-6 bg-gold'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
