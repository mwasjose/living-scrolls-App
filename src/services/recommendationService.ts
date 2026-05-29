// This service would implement logic to provide personalized recommendations
// based on user data (e.g., trivia performance, reading habits, memorization gaps).
// For now, it provides static recommendations.

export async function getRecommendedTorahPortion(userId: string): Promise<{ title: string; reason: string }> {
  // Logic to determine based on user's reading progress or missed portions
  return {
    title: "Parashat Noach (Genesis 6:9 - 11:32)",
    reason: "This portion explores themes of covenant and new beginnings, which may resonate with your current spiritual journey.",
  };
}

export async function getRecommendedLesson(userId: string): Promise<{ title: string; category: string }> {
  // Logic to determine based on user's interests or areas for growth
  return {
    title: "Cultivating a Spirit of Gratitude",
    category: "Reflection",
  };
}

export async function getRecommendedHebrewStudy(userId: string): Promise<{ word: string; reason: string }> {
  // Logic to determine based on user's Hebrew learning progress
  return {
    word: "שָׁלוֹם (Shalom)",
    reason: "Deepen your understanding of peace, wholeness, and completeness in Adonai.",
  };
}
// ============ LESSON RECOMMENDATION FUNCTIONS ============

import { AILesson, UserProfile, LessonCategory } from '@/lib/models';

/**
 * Get recommendations for a user based on their reading history and interests
 */
export async function getRecommendationsForUser(
  user: UserProfile | null,
  allLessons: AILesson[],
  limit = 6
): Promise<AILesson[]> {
  if (!user || !allLessons.length) {
    return allLessons.slice(0, limit);
  }

  // Collect user preferences
  const readingHistory = user.lessonReadingHistory || [];
  const savedArticles = user.savedArticles || [];
  const favCategories = user.favoriteLessonCategories || [];

  // Calculate a score for each lesson
  const scoredLessons = allLessons
    .filter((l) => !readingHistory.includes(l.id) && !savedArticles.includes(l.id))
    .map((lesson) => {
      let score = 0;

      // Boost for favorite categories
      if (favCategories.includes(lesson.category)) {
        score += 10;
      }

      // Boost for similar difficulty
      if (user.level) {
        const difficultyScore = {
          Beginner: 1,
          Intermediate: 2,
          Advanced: 3,
        };
        const userLevelDiff = Math.abs(difficultyScore[lesson.difficulty] - Math.min(user.level, 3));
        score += Math.max(0, 5 - userLevelDiff);
      }

      // Boost for popular/trending
      if (lesson.isTrending) score += 3;
      if (lesson.isFeature) score += 2;

      // Boost based on engagement
      score += Math.log((lesson.views ?? 0) + 1) * 0.1;
      score += Math.log((lesson.saves ?? 0) + 1) * 0.2;

      return { lesson, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ lesson }) => lesson);

  return scoredLessons;
}

/**
 * Get similar lessons based on tags and category
 */
export async function getSimilarLessons(
  lesson: AILesson,
  allLessons: AILesson[],
  limit = 4
): Promise<AILesson[]> {
  const similar = allLessons
    .filter((l) => l.id !== lesson.id)
    .map((l) => {
      let similarity = 0;

      // Category match
      if (l.category === lesson.category) similarity += 3;

      // Tag matches
      const matchingTags = l.tags.filter((tag) => lesson.tags.includes(tag)).length;
      similarity += matchingTags * 2;

      // Similar difficulty
      if (l.difficulty === lesson.difficulty) similarity += 1;

      // Scripture reference overlap
      const scriptureOverlap = l.scriptureReferences.filter((ref) =>
        lesson.scriptureReferences.includes(ref)
      ).length;
      similarity += scriptureOverlap;

      return { lesson: l, similarity };
    })
    .filter((item) => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(({ lesson }) => lesson);

  return similar;
}