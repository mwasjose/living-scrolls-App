'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { AILesson, LessonCategory } from '@/lib/models';
import { lessonService } from '@/services/lessonService';
import { getRecommendationsForUser, getSimilarLessons } from '@/services/recommendationService';
import { lessonSearchService } from '@/services/lessonSearchService';
import { HeroLessonSection } from '@/components/ai-lessons/HeroLessonSection';
import { SearchBar, SearchFilters } from '@/components/ai-lessons/SearchBar';
import { CategoryGrid } from '@/components/ai-lessons/CategoryGrid';
import { LessonCarousel } from '@/components/ai-lessons/LessonCarousel';
import { RecommendedForYou } from '@/components/ai-lessons/RecommendedForYou';
import { LessonGrid } from '@/components/ai-lessons/LessonGrid';
import { SavedArticlesLibrary } from '@/components/ai-lessons/SavedArticlesLibrary';
import { LessonSeriesCard } from '@/components/ai-lessons/LessonSeriesCard';
import { Sparkles, BookMarked, Flame, Clock } from 'lucide-react';

export default function AILessonsPage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);

  const [allLessons, setAllLessons] = useState<AILesson[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<AILesson[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: '' });
  const [savedArticles, setSavedArticles] = useState<string[]>(profile?.savedArticles || []);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState<'browse' | 'search' | 'saved'>('browse');

  // Load lessons on mount
  useEffect(() => {
    const loadData = async () => {
      const [lessonsData, categoriesData, seriesData] = await Promise.all([
        lessonService.getAllLessons(),
        lessonService.getCategories(),
        lessonService.getLessonSeries(),
      ]);
      setAllLessons(lessonsData);
      setCategories(categoriesData);
      setSeries(seriesData);
      setSearchResults(lessonsData);
    };
    loadData();
  }, []);

  // Update saved articles from profile
  useEffect(() => {
    if (profile?.savedArticles) {
      setSavedArticles(profile.savedArticles);
    }
  }, [profile?.savedArticles]);

  // Featured lessons
  const featuredLessons = useMemo(
    () => allLessons.filter((l) => l.isFeature).slice(0, 6),
    [allLessons]
  );

  // Trending lessons
  const trendingLessons = useMemo(
    () => allLessons.filter((l) => l.isTrending).sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 6),
    [allLessons]
  );

  // Popular lessons (by saves)
  const popularLessons = useMemo(() => {
    return [...allLessons].sort((a, b) => (b.saves ?? 0) - (a.saves ?? 0)).slice(0, 8);
  }, [allLessons]);

  // Recently added lessons
  const recentLessons = useMemo(() => {
    return [...allLessons]
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 8);
  }, [allLessons]);

  // Recommended for user
  const [recommendedLessons, setRecommendedLessons] = useState<AILesson[]>([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      const recommendations = await getRecommendationsForUser(profile || null, allLessons, 6);
      setRecommendedLessons(recommendations);
    };

    loadRecommendations();
  }, [profile, allLessons]);

  // Saved articles
  const userSavedArticles = useMemo(() => {
    return savedArticles
      .map((id) => allLessons.find((l) => l.id === id))
      .filter(Boolean) as AILesson[];
  }, [savedArticles, allLessons]);

  const heroLesson = featuredLessons[0];

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    const filters = { ...searchFilters, query };
    setSearchFilters(filters);

    const results = await lessonSearchService.searchLessons(allLessons, filters);
    setSearchResults(results);
    setCurrentPage('search');
    setIsSearching(false);
  };

  const handleFilterChange = async (filters: SearchFilters) => {
    setIsSearching(true);
    setSearchFilters(filters);

    const results = await lessonSearchService.searchLessons(allLessons, filters);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSaveArticle = (lesson: AILesson) => {
    if (savedArticles.includes(lesson.id)) {
      setSavedArticles(savedArticles.filter((id) => id !== lesson.id));
      lessonService.incrementSaveCount(lesson.id);
    } else {
      setSavedArticles([...savedArticles, lesson.id]);
      lessonService.incrementSaveCount(lesson.id);
    }
  };

  const handleRemoveSavedArticle = (articleId: string) => {
    setSavedArticles(savedArticles.filter((id) => id !== articleId));
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Sparkles className="h-8 w-8 animate-pulse text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      {heroLesson && (
        <HeroLessonSection
          lesson={heroLesson}
          onContinue={() => lessonService.incrementViewCount(heroLesson.id)}
          onSave={() => handleSaveArticle(heroLesson)}
        />
      )}

      {/* Search Bar Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-white">Search the Wisdom Library</h2>
          <p className="mt-2 text-slate-400">Find teachings for your spiritual journey</p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          recentSearches={[]}
          trendingTopics={['faith', 'prayer', 'wisdom', 'spiritual growth', 'forgiveness']}
          categories={categories.map((c) => c.name)}
        />
      </motion.section>

      {/* Search Results View */}
      {currentPage === 'search' && searchResults.length > 0 && (
        <LessonGrid
          lessons={searchResults}
          title="Search Results"
          subtitle={`Found ${searchResults.length} teachings matching your search`}
          onSelectLesson={(lesson) => lessonService.incrementViewCount(lesson.id)}
          onSaveLesson={handleSaveArticle}
          savedArticles={savedArticles}
        />
      )}

      {currentPage === 'search' && searchResults.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="rounded-[24px] border-2 border-dashed border-white/20 p-12 text-center"
        >
          <Sparkles className="mx-auto h-16 w-16 text-gold/30 mb-4" />
          <p className="text-white font-semibold">No teachings found</p>
          <p className="mt-2 text-slate-400">Try different keywords or explore our categories</p>
        </motion.div>
      )}

      {/* Browse View */}
      {currentPage === 'browse' && (
        <div className="space-y-12">
          {/* Category System */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
              <p className="mt-2 text-slate-400">Explore teachings organized by spiritual theme</p>
            </div>

            <CategoryGrid
              categories={categories.map((c) => ({
                id: c.name,
                ...c,
              }))}
              onSelectCategory={(cat) => {
                handleFilterChange({ query: '', category: cat });
              }}
            />
          </motion.section>

          {/* Featured Teachings */}
          {featuredLessons.length > 0 && (
            <LessonCarousel
              lessons={featuredLessons}
              title="Featured Teachings"
              subtitle="Carefully selected wisdom to deepen your faith"
              onSelectLesson={(lesson) => lessonService.incrementViewCount(lesson.id)}
              onSaveLesson={handleSaveArticle}
              savedArticles={savedArticles}
            />
          )}

          {/* Trending Lessons */}
          {trendingLessons.length > 0 && (
            <LessonCarousel
              lessons={trendingLessons}
              title="Trending Lessons"
              subtitle="Most read among believers this week"
              onSelectLesson={(lesson) => lessonService.incrementViewCount(lesson.id)}
              onSaveLesson={handleSaveArticle}
              savedArticles={savedArticles}
            />
          )}

          {/* Lesson Series */}
          {series.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-white">Lesson Series</h2>
                <p className="mt-2 text-slate-400">Complete learning journeys for spiritual growth</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {series.map((s) => (
                  <LessonSeriesCard
                    key={s.id}
                    series={s}
                    lessons={allLessons.filter((l) => s.lessons.includes(l.id))}
                    completedCount={0}
                    onStart={() => {
                      // Handle series start
                    }}
                    onContinue={() => {
                      // Handle series continue
                    }}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Recommended For You */}
          {recommendedLessons.length > 0 && (
            <RecommendedForYou
              lessons={recommendedLessons}
              reason="Based on your reading history and spiritual interests"
              onSelectLesson={(lesson) => lessonService.incrementViewCount(lesson.id)}
              onSaveLesson={handleSaveArticle}
              savedArticles={savedArticles}
            />
          )}

          {/* Popular Among Believers */}
          {popularLessons.length > 0 && (
            <LessonGrid
              lessons={popularLessons}
              title="Popular Among Believers"
              subtitle="Most saved and appreciated teachings"
              onSelectLesson={(lesson) => lessonService.incrementViewCount(lesson.id)}
              onSaveLesson={handleSaveArticle}
              savedArticles={savedArticles}
            />
          )}

          {/* Latest Wisdom Articles */}
          {recentLessons.length > 0 && (
            <LessonGrid
              lessons={recentLessons}
              title="Latest Wisdom Articles"
              subtitle="Recently added teachings and insights"
              onSelectLesson={(lesson) => lessonService.incrementViewCount(lesson.id)}
              onSaveLesson={handleSaveArticle}
              savedArticles={savedArticles}
            />
          )}
        </div>
      )}

      {/* Saved Articles Library Tab */}
      {currentPage === 'saved' && (
        <SavedArticlesLibrary
          savedArticles={userSavedArticles.map((article) => ({
            id: article.id,
            userId: user?.uid || '',
            article,
            articleId: article.id,
            savedAt: new Date(),
            isRead: false,
          }))}
          onRead={(article) => lessonService.incrementViewCount(article.id)}
          onRemove={handleRemoveSavedArticle}
          isEmpty={userSavedArticles.length === 0}
        />
      )}

      {/* Page Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 rounded-2xl border border-white/10 bg-midnight/40 backdrop-blur-xl p-1"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('browse')}
          className={`rounded-xl px-6 py-2.5 font-semibold transition ${
            currentPage === 'browse'
              ? 'bg-gold text-slate-950'
              : 'bg-transparent text-white hover:text-gold'
          }`}
        >
          Browse
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('search')}
          className={`rounded-xl px-6 py-2.5 font-semibold transition ${
            currentPage === 'search'
              ? 'bg-gold text-slate-950'
              : 'bg-transparent text-white hover:text-gold'
          }`}
        >
          Search
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('saved')}
          className={`rounded-xl px-6 py-2.5 font-semibold transition ${
            currentPage === 'saved'
              ? 'bg-gold text-slate-950'
              : 'bg-transparent text-white hover:text-gold'
          }`}
        >
          <BookMarked className="inline-block h-4 w-4 mr-1" />
          Saved ({savedArticles.length})
        </motion.button>
      </motion.div>
    </div>
  );
}
