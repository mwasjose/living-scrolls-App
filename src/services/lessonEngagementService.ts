import { QuizResponse, ReflectionSubmission } from './aiLessonGenerationService';
import { LessonEngagement } from '@/lib/models';

/**
 * Service for tracking user engagement with lessons
 * Quiz responses, reflections, highlights, notes, etc.
 */

export const lessonEngagementService = {
  /**
   * Save quiz response
   */
  saveQuizResponse: async (userId: string, response: QuizResponse): Promise<void> => {
    try {
      // In production, save to Firestore
      console.log('Saving quiz response:', response);

      // For now, store in localStorage for demo
      const key = `quiz-${response.quizId}-${userId}`;
      localStorage.setItem(key, JSON.stringify(response));

      // Update user engagement metrics
      await updateUserEngagementMetrics(userId, response.lessonId, {
        completed: true,
        quizScore: response.percentScore,
      });
    } catch (error) {
      console.error('Error saving quiz response:', error);
      throw error;
    }
  },

  /**
   * Save reflection submission
   */
  saveReflection: async (userId: string, reflection: ReflectionSubmission): Promise<void> => {
    try {
      // In production, save to Firestore
      console.log('Saving reflection:', reflection);

      // For now, store in localStorage for demo
      const key = `reflection-${reflection.lessonId}-${userId}`;
      localStorage.setItem(key, JSON.stringify(reflection));

      // Update user engagement metrics
      await updateUserEngagementMetrics(userId, reflection.lessonId, {
        reflectionSubmitted: true,
      });
    } catch (error) {
      console.error('Error saving reflection:', error);
      throw error;
    }
  },

  /**
   * Get quiz responses for a user
   */
  getUserQuizResponses: async (userId: string): Promise<QuizResponse[]> => {
    try {
      // In production, query from Firestore
      const responses: QuizResponse[] = [];

      // For now, check localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('quiz-') && key.includes(userId)) {
          const data = localStorage.getItem(key);
          if (data) {
            responses.push(JSON.parse(data));
          }
        }
      }

      return responses;
    } catch (error) {
      console.error('Error fetching quiz responses:', error);
      return [];
    }
  },

  /**
   * Get reflections for a user
   */
  getUserReflections: async (userId: string): Promise<ReflectionSubmission[]> => {
    try {
      // In production, query from Firestore
      const reflections: ReflectionSubmission[] = [];

      // For now, check localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('reflection-') && key.includes(userId)) {
          const data = localStorage.getItem(key);
          if (data) {
            reflections.push(JSON.parse(data));
          }
        }
      }

      return reflections;
    } catch (error) {
      console.error('Error fetching reflections:', error);
      return [];
    }
  },

  /**
   * Get quiz response for specific lesson
   */
  getQuizResponseForLesson: async (
    userId: string,
    lessonId: string
  ): Promise<QuizResponse | null> => {
    try {
      // In production, query from Firestore with filters
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('quiz-') && key.includes(userId)) {
          const data = localStorage.getItem(key);
          if (data) {
            const response = JSON.parse(data) as QuizResponse;
            if (response.lessonId === lessonId) {
              return response;
            }
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Error fetching quiz response:', error);
      return null;
    }
  },

  /**
   * Get reflection for specific lesson
   */
  getReflectionForLesson: async (
    userId: string,
    lessonId: string
  ): Promise<ReflectionSubmission | null> => {
    try {
      // In production, query from Firestore with filters
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('reflection-') && key.includes(userId)) {
          const data = localStorage.getItem(key);
          if (data) {
            const reflection = JSON.parse(data) as ReflectionSubmission;
            if (reflection.lessonId === lessonId) {
              return reflection;
            }
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Error fetching reflection:', error);
      return null;
    }
  },

  /**
   * Save lesson engagement (highlights, notes, bookmarks)
   */
  saveLessonEngagement: async (engagement: LessonEngagement): Promise<void> => {
    try {
      // In production, save to Firestore
      console.log('Saving lesson engagement:', engagement);

      const key = `engagement-${engagement.articleId}-${engagement.userId}`;
      localStorage.setItem(key, JSON.stringify(engagement));
    } catch (error) {
      console.error('Error saving engagement:', error);
      throw error;
    }
  },

  /**
   * Get lesson engagement
   */
  getLessonEngagement: async (userId: string, lessonId: string): Promise<LessonEngagement | null> => {
    try {
      // In production, query from Firestore
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('engagement-') && key.includes(userId)) {
          const data = localStorage.getItem(key);
          if (data) {
            const engagement = JSON.parse(data) as LessonEngagement;
            if (engagement.articleId === lessonId) {
              return engagement;
            }
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Error fetching engagement:', error);
      return null;
    }
  },

  /**
   * Get lesson completion statistics
   */
  getLessonCompletionStats: async (userId: string): Promise<{
    lessonsRead: number;
    quizzesCompleted: number;
    quizzesPasssed: number;
    reflectionsSubmitted: number;
    averageQuizScore: number;
  }> => {
    try {
      const responses = await lessonEngagementService.getUserQuizResponses(userId);
      const reflections = await lessonEngagementService.getUserReflections(userId);

      const passedQuizzes = responses.filter((r) => r.passed).length;
      const avgScore =
        responses.length > 0
          ? responses.reduce((sum, r) => sum + r.percentScore, 0) / responses.length
          : 0;

      return {
        lessonsRead: reflections.length,
        quizzesCompleted: responses.length,
        quizzesPasssed: passedQuizzes,
        reflectionsSubmitted: reflections.length,
        averageQuizScore: Math.round(avgScore),
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return {
        lessonsRead: 0,
        quizzesCompleted: 0,
        quizzesPasssed: 0,
        reflectionsSubmitted: 0,
        averageQuizScore: 0,
      };
    }
  },
};

/**
 * Helper function to update user engagement metrics
 */
async function updateUserEngagementMetrics(
  userId: string,
  lessonId: string,
  updates: Partial<LessonEngagement>
): Promise<void> {
  try {
    const existing = await lessonEngagementService.getLessonEngagement(userId, lessonId);

    const engagement: LessonEngagement = {
      id: existing?.id || `engagement-${Date.now()}`,
      userId,
      articleId: lessonId,
      views: (existing?.views || 0) + 1,
      timeSpent: (existing?.timeSpent || 0) + 5, // Approximate 5 min per interaction
      completed: updates.completed || existing?.completed || false,
      highlighted: existing?.highlighted || [],
      notes: existing?.notes || [],
      reflectionSubmitted: updates.reflectionSubmitted || existing?.reflectionSubmitted || false,
      reflectionText: updates.reflectionSubmitted ? (updates as any).reflectionText : existing?.reflectionText,
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    await lessonEngagementService.saveLessonEngagement(engagement);
  } catch (error) {
    console.error('Error updating engagement metrics:', error);
  }
}
