'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AILesson } from '@/lib/models';
import { Bookmark, BookmarkCheck, Clock, Eye, Share2 } from 'lucide-react';
import { useState } from 'react';

interface PremiumArticleCardProps {
  lesson: AILesson;
  onRead?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  showEngagement?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export function PremiumArticleCard({
  lesson,
  onRead,
  onSave,
  isSaved = false,
  showEngagement = true,
  variant = 'default',
}: PremiumArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group overflow-hidden rounded-[24px] border border-border bg-card p-6 transition hover:border-accent"
      >
        {/* Hero image */}
        {lesson.heroImage && (
          <div className="mb-4 overflow-hidden rounded-[16px] relative h-32">
            <Image
              src={lesson.heroImage}
              alt={lesson.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Category badge */}
        <div className="mb-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          {lesson.category}
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition group-hover:text-accent">
          {lesson.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 text-sm text-slate-400">{lesson.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>{lesson.readTime} min</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="text-slate-400 transition hover:text-accent"
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ y: -6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative overflow-hidden rounded-[32px] border border-border bg-card p-0 transition hover:border-accent"
      >
        {/* Hero image */}
        {lesson.heroImage && (
          <div className="relative overflow-hidden h-64">
            <Image
              src={lesson.heroImage}
              alt={lesson.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
          </div>
        )}

        {/* Content overlay */}
        <div className="relative space-y-4 p-8">
          {/* Category */}
          <div className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {lesson.category}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold leading-tight text-white group-hover:text-accent transition">
            {lesson.title}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-200/90">{lesson.excerpt}</p>

          {/* Meta and CTA */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{lesson.readTime} min</span>
              </div>
              {showEngagement && (
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{(lesson.views ?? 0).toLocaleString()}</span>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRead}
              className="rounded-full bg-accent px-6 py-2 font-semibold text-slate-950 transition hover:bg-accent-soft"
            >
              Read
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-[var(--surface)]/40 shadow-none transition hover:border-accent hover:bg-[var(--surface)]/55"
    >
      {/* Hero image */}
      {lesson.heroImage && (
        <div className="relative overflow-hidden h-40">
          <Image
            src={lesson.heroImage}
            alt={lesson.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,54,24,0.85)] via-transparent to-transparent" />

          {/* Badge overlay */}
          <div className="absolute top-4 right-4">
            {lesson.isFeature && (
              <span className="inline-flex rounded-full bg-accent-soft border border-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                Featured
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <div className="mb-3 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-accent">
          {lesson.category}
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-[var(--text-primary)] transition group-hover:text-accent">
          {lesson.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-sm text-[var(--text-secondary)]">{lesson.excerpt}</p>

        {/* Meta and CTA */}
        <div className="flex flex-col gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{lesson.readTime} min read</span>
            </div>
            {showEngagement && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{(lesson.views ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bookmark className="h-3 w-3" />
                  <span>{(lesson.saves ?? 0).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRead}
              className="flex-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
            >
              Continue Reading
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSave}
              className="rounded-full border border-border bg-card-soft px-4 py-2 text-[var(--text-secondary)] transition hover:bg-surface-soft hover:border-border hover:text-white"
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
