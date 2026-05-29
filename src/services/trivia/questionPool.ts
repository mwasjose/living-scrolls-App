import { redis } from '@/hooks/redis';
import type { TriviaQuestion } from '@/lib/models';

/**
 * Fetches a large batch of candidate questions from the global pool.
 * It checks Redis first for the cached pool and falls back to the database.
 */
export async function getCandidateQuestions(params: {
  mode: string;
  difficulty: string;
  category: string;
}): Promise<TriviaQuestion[]> {
  const { mode, difficulty, category } = params;
  
  // Create a deterministic key for the global pool cache
  const poolKey = `trivia:pool:${mode}:${difficulty}:${category}`
    .toLowerCase()
    .replace(/\s+/g, '-');

  try {
    // 1. Attempt to retrieve the entire pool from Redis
    const cachedPool = await redis.get(poolKey);
    if (cachedPool) {
      return JSON.parse(cachedPool);
    }

    // 2. Cache Miss: Fetch from your persistent database (e.g., Firestore)
    // This logic assumes you have a collection of pre-verified or pre-generated questions.
    // const snapshot = await db.collection('trivia_questions')
    //   .where('category', '==', category)
    //   .where('difficulty', '==', difficulty)
    //   .limit(100) 
    //   .get();
    // const questions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const questions: TriviaQuestion[] = []; // Placeholder for your DB retrieval logic

    // 3. Populate Redis cache with the global pool if we found results
    if (questions.length > 0) {
      // Cache the global pool for 6 hours (21600 seconds)
      await redis.setex(poolKey, 21600, JSON.stringify(questions));
    }

    return questions;
  } catch (error) {
    console.error('[QuestionPool] Error fetching candidate pool:', error);
    return [];
  }
}