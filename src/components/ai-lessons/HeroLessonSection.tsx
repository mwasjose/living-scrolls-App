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
      className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-midnight/60 via-slate-900/40 to-midnight/60 p-12 shadow-2xl backdrop-blur-xl"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-40" />

      {/* Hero image with overlay */}
      {lesson.heroImage && (
        <div className="absolute inset-0 -z-20 overflow-hidden rounded-[40px]">
          <Image
            src={lesson.heroImage}
            alt={lesson.heroImageAlt || lesson.title}
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/50 to-transparent" />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-6 lg:col-span-2">
          {/* Category and badge */}
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              {lesson.category}
            </span>
            {lesson.isFeature && (
              <span className="inline-block rounded-full bg-amber-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
                Featured
              </span>
            )}
          </div>

          {/* Hero Scripture */}
          {lesson.heroScripture && (
            <div className="rounded-[20px] border border-gold/20 bg-gold/5 p-4 italic text-slate-200">
              <p className="text-sm">{lesson.heroScripture}</p>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            {lesson.title}
          </h1>

          {/* Subtitle */}
          {lesson.subtitle && (
            <p className="text-xl font-light leading-relaxed text-slate-300">
              {lesson.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p className="text-lg leading-relaxed text-slate-200/90">
            {lesson.excerpt}
          </p>

          {/* Meta info and CTA */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">{lesson.readTime} min read</span>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-gold/90 active:scale-95"
              >
                Continue Reading
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSave}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 hover:border-white/30 active:scale-95"
              >
                <Bookmark className="h-4 w-4" />
                Save
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right side - Additional info */}
        <div className="space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
          {/* Difficulty badge */}
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Difficulty</p>
            <p className="mt-2 text-lg font-semibold text-white">{lesson.difficulty}</p>
          </div>

          {/* Scripture references */}
          {lesson.scriptureReferences.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Scripture</p>
              <div className="mt-2 space-y-2">
                {lesson.scriptureReferences.slice(0, 3).map((ref, idx) => (
                  <p key={idx} className="text-sm font-medium text-gold">
                    {ref}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Engagement stats */}
          <div className="rounded-[16px] bg-white/5 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-slate-500">Views</p>
                <p className="text-lg font-semibold text-white">{(lesson.views ?? 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Saved</p>
                <p className="text-lg font-semibold text-white">{(lesson.saves ?? 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {lesson.tags.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Topics</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex rounded-full bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300 border border-white/10"
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
