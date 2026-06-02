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
        className="rounded-[20px] border border-border bg-[var(--surface)]/30 p-10 text-center"
      >
        <BookmarkCheck className="mx-auto h-16 w-16 text-accent/30 mb-4" />
        <h3 className="text-xl font-semibold text-white">No Saved Articles Yet</h3>
        <p className="mt-2 text-[var(--text-secondary)]">
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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Your Saved Library</h2>
          <p className="mt-1 text-[var(--text-secondary)]">{savedArticles.length} teachings saved</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['recent', 'title', 'category'] as const).map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSortBy(option)}
              className={`rounded-full px-4 py-2 text-sm font-medium uppercase tracking-widest transition ${
                sortBy === option
                  ? 'bg-accent text-slate-950'
                  : 'bg-card-soft text-[var(--text-secondary)] border border-border hover:bg-surface-soft'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Articles list */}
      <div className="space-y-4">
        {sortedArticles.map((saved, idx) => (
          <motion.div
            key={saved.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="rounded-[20px] border border-border bg-[var(--surface)]/25 p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="mb-2 inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  {saved.article.category}
                </div>
                <h3 className="text-lg font-semibold text-white truncate">{saved.article.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">{saved.article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                  <span>{saved.article.readTime} min read</span>
                  {saved.readingProgress !== undefined && <span>{Math.round(saved.readingProgress)}% read</span>}
                  <span>Saved {new Date(saved.savedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRead?.(saved.article)}
                  className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft whitespace-nowrap"
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
