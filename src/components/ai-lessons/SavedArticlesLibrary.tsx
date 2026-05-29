'use client';

import { motion } from 'framer-motion';
import { SavedArticle, AILesson } from '@/lib/models';
import { BookmarkCheck, Trash2, BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';

interface SavedArticlesLibraryProps {
  savedArticles: SavedArticle[];
  onRead?: (article: AILesson) => void;
  onRemove?: (articleId: string) => void;
  isEmpty?: boolean;
}

export function SavedArticlesLibrary({
  savedArticles,
  onRead,
  onRemove,
  isEmpty = false,
}: SavedArticlesLibraryProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'category'>('recent');

  const sortedArticles = [...savedArticles].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    }
    if (sortBy === 'title') {
      return a.article.title.localeCompare(b.article.title);
    }
    if (sortBy === 'category') {
      return a.article.category.localeCompare(b.article.category);
    }
    return 0;
  });

  if (isEmpty || savedArticles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-[32px] border-2 border-dashed border-white/20 p-12 text-center"
      >
        <BookmarkCheck className="mx-auto h-16 w-16 text-gold/30 mb-4" />
        <h3 className="text-xl font-semibold text-white">No Saved Articles Yet</h3>
        <p className="mt-2 text-slate-400">
          Bookmark teachings and wisdom to build your personal library for continuous growth.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header with sorting */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Your Saved Library</h2>
          <p className="mt-1 text-slate-400">{savedArticles.length} teachings saved</p>
        </div>

        <div className="flex gap-2">
          {(['recent', 'title', 'category'] as const).map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSortBy(option)}
              className={`rounded-full px-4 py-2 text-sm font-medium uppercase tracking-widest transition ${
                sortBy === option
                  ? 'bg-gold text-slate-950'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <div className="space-y-3">
        {sortedArticles.map((saved, idx) => (
          <motion.div
            key={saved.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-r from-midnight/40 to-slate-900/30 p-6 transition hover:border-gold/30 hover:bg-midnight/50"
          >
            <div className="flex items-start justify-between gap-4 lg:items-center">
              <div className="flex-1 min-w-0">
                {/* Category */}
                <div className="mb-2 inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
                  {saved.article.category}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-gold transition truncate">
                  {saved.article.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-3 line-clamp-2 text-sm text-slate-400">{saved.article.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{saved.article.readTime} min</span>
                  </div>
                  {saved.readingProgress !== undefined && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{Math.round(saved.readingProgress)}% read</span>
                    </div>
                  )}
                  <span>Saved {new Date(saved.savedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRead?.(saved.article)}
                  className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-gold/90 whitespace-nowrap"
                >
                  Read
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemove?.(saved.article.id)}
                  className="rounded-full border border-red-500/30 bg-red-500/10 p-2.5 text-red-400 transition hover:bg-red-500/20 hover:border-red-500/50"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
