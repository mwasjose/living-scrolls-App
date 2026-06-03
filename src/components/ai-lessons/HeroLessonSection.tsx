'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AILesson } from '@/lib/models';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';

interface HeroLessonSectionProps {
  lesson: AILesson;
  onContinue?: () => void;
  onSave?: () => void;
}

export function HeroLessonSection({ lesson, onContinue, onSave }: HeroLessonSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--surface)]/90 p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(146,213,31,0.12),_transparent_32%)]" />
      {lesson.heroImage && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-10">
          <Image
            src={lesson.heroImage}
            alt={lesson.heroImageAlt || lesson.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--surface)]/80" />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-10">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {lesson.category}
            </span>
            {lesson.isFeature && (
              <span className="inline-flex rounded-full bg-[var(--surface-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)]">
                Featured
              </span>
            )}
          </div>

          {lesson.heroScripture && (
            <div className="rounded-[24px] border border-[var(--accent)] bg-[var(--accent-soft)]/70 p-4 italic text-[var(--text-primary)]">
              <p className="text-sm">{lesson.heroScripture}</p>
            </div>
          )}

          <h1 className="text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {lesson.title}
          </h1>

          {lesson.subtitle && (
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              {lesson.subtitle}
            </p>
          )}

          <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
            {lesson.excerpt}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {lesson.readTime} min read
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-soft)]"
              >
                Continue Reading
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface)]"
              >
                <Bookmark className="h-4 w-4" />
                Save
              </motion.button>
            </div>
          </div>
        </div>

        <div className="space-y-5 border border-[var(--border)] bg-[var(--surface)]/90 p-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Difficulty</p>
            <p className="text-lg font-semibold text-[var(--text-primary)]">{lesson.difficulty}</p>
          </div>

          {lesson.scriptureReferences.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Scripture</p>
              <div className="space-y-2">
                {lesson.scriptureReferences.slice(0, 3).map((ref, idx) => (
                  <p key={idx} className="text-sm font-medium text-[var(--accent)]">
                    {ref}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <div className="flex justify-between text-sm text-[var(--text-secondary)]">
              <span>Views</span>
              <span>{(lesson.views ?? 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-3 text-sm text-[var(--text-secondary)]">
              <span>Saved</span>
              <span>{(lesson.saves ?? 0).toLocaleString()}</span>
            </div>
          </div>

          {lesson.tags.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">Topics</p>
              <div className="flex flex-wrap gap-2">
                {lesson.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
