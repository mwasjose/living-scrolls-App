import { AILesson, LessonCategory } from '@/lib/models';
import { SearchFilters } from '@/components/ai-lessons/SearchBar';

export const lessonSearchService = {
  /**
   * Search lessons by query and filters
   */
  searchLessons: async (allLessons: AILesson[], filters: SearchFilters): Promise<AILesson[]> => {
    let results = [...allLessons];

    // Filter by query
    if (filters.query && filters.query.trim()) {
      const queryLower = filters.query.toLowerCase();
      results = results.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(queryLower) ||
          lesson.excerpt.toLowerCase().includes(queryLower) ||
          lesson.tags.some((tag) => tag.toLowerCase().includes(queryLower)) ||
          lesson.scriptureReferences.some((ref) => ref.toLowerCase().includes(queryLower))
      );
    }

    // Filter by category
    if (filters.category) {
      results = results.filter((lesson) => lesson.category === filters.category);
    }

    // Filter by difficulty
    if (filters.difficulty) {
      results = results.filter((lesson) => lesson.difficulty === filters.difficulty);
    }

    // Filter by read time
    if (filters.minReadTime !== undefined) {
      results = results.filter((lesson) => lesson.readTime >= filters.minReadTime!);
    }
    if (filters.maxReadTime !== undefined) {
      results = results.filter((lesson) => lesson.readTime <= filters.maxReadTime!);
    }

    return results;
  },

  /**
   * Get search suggestions based on query
   */
  getSearchSuggestions: async (allLessons: AILesson[], query: string): Promise<string[]> => {
    if (!query || query.length < 2) {
      return [];
    }

    const queryLower = query.toLowerCase();
    const suggestions = new Set<string>();

    allLessons.forEach((lesson) => {
      if (lesson.title.toLowerCase().includes(queryLower)) {
        suggestions.add(lesson.title);
      }
      lesson.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
      lesson.scriptureReferences.forEach((ref) => {
        if (ref.toLowerCase().includes(queryLower)) {
          suggestions.add(ref);
        }
      });
    });

    return Array.from(suggestions).slice(0, 8);
  },

  /**
   * Get lessons matching Scripture reference
   */
  getLessonsByScripture: async (
    allLessons: AILesson[],
    scriptureRef: string
  ): Promise<AILesson[]> => {
    return allLessons.filter((lesson) =>
      lesson.scriptureReferences.some((ref) =>
        ref.toLowerCase().includes(scriptureRef.toLowerCase())
      )
    );
  },

  /**
   * Get lessons by tags
   */
  getLessonsByTags: async (allLessons: AILesson[], tags: string[]): Promise<AILesson[]> => {
    return allLessons.filter((lesson) =>
      tags.some((tag) => lesson.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    );
  },

  /**
   * Get lessons by multiple categories
   */
  getLessonsByCategories: async (
    allLessons: AILesson[],
    categories: LessonCategory[]
  ): Promise<AILesson[]> => {
    return allLessons.filter((lesson) => categories.includes(lesson.category));
  },
};
