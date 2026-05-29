'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { useState, useMemo } from 'react';
import { LessonCategory } from '@/lib/models';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
  recentSearches?: string[];
  trendingTopics?: string[];
  categories?: LessonCategory[];
  selectedCategory?: LessonCategory;
}

export interface SearchFilters {
  query: string;
  category?: LessonCategory;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  minReadTime?: number;
  maxReadTime?: number;
}

export function SearchBar({
  onSearch,
  onFilterChange,
  recentSearches = [],
  trendingTopics = ['faith', 'prayer', 'wisdom', 'spiritual growth', 'Torah'],
  categories = [],
  selectedCategory,
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'Beginner' | 'Intermediate' | 'Advanced' | undefined
  >(undefined);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: selectedCategory,
    difficulty: undefined,
  });

  const handleSearch = (searchQuery: string) => {
    const newFilters = { ...filters, query: searchQuery };
    setFilters(newFilters);
    onSearch?.(searchQuery);
    onFilterChange?.(newFilters);
  };

  const handleDifficultyChange = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    const newDifficulty = selectedDifficulty === difficulty ? undefined : difficulty;
    setSelectedDifficulty(newDifficulty);
    const newFilters = { ...filters, difficulty: newDifficulty };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-4"
    >
      {/* Main search bar */}
      <div className="relative">
        <motion.div
          layout
          className={`group relative overflow-hidden rounded-[20px] border transition-all duration-300 ${
            isExpanded || query
              ? 'border-gold/50 bg-midnight/40 shadow-lg'
              : 'border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <Search className="h-5 w-5 flex-shrink-0 text-gold" />
            <input
              type="text"
              placeholder="Search the Wisdom Library..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(query);
                  setIsExpanded(false);
                }
              }}
              className="w-full bg-transparent text-white placeholder-slate-400 outline-none"
            />

            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setQuery('');
                  handleSearch('');
                }}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Expanded search dropdown */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-[20px] border border-gold/30 bg-gradient-to-b from-midnight to-slate-900 shadow-2xl"
            >
              <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                {/* Recent searches */}
                {recentSearches.length > 0 && !query && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-3">Recent Searches</p>
                    <div className="space-y-2">
                      {recentSearches.map((search, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 4 }}
                          onClick={() => {
                            setQuery(search);
                            handleSearch(search);
                          }}
                          className="flex w-full items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition"
                        >
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{search}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending topics */}
                {!query && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-3">Trending Topics</p>
                    <div className="flex flex-wrap gap-2">
                      {trendingTopics.map((topic, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            setQuery(topic);
                            handleSearch(topic);
                          }}
                          className="flex items-center gap-2 rounded-full bg-gold/10 border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/20 transition"
                        >
                          <TrendingUp className="h-3 w-3" />
                          <span>{topic}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search suggestions - placeholder */}
                {query && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-3">Suggestions</p>
                    <div className="space-y-2">
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => handleSearch(query)}
                        className="flex w-full items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition"
                      >
                        <Search className="h-4 w-4 text-gold" />
                        <span>{`Search for "${query}"`}</span>
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {/* Difficulty filters */}
        {['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
          <motion.button
            key={difficulty}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleDifficultyChange(difficulty as any)}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition ${
              selectedDifficulty === difficulty
                ? 'bg-gold text-slate-950 border border-gold'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {difficulty}
          </motion.button>
        ))}

        {/* Category filter - show first few */}
        {categories.slice(0, 3).map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition ${
              selectedCategory === cat
                ? 'bg-gold/20 text-gold border border-gold/50'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
