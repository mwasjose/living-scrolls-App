import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import type { TriviaQuestion } from '@/lib/models';
import { COMPREHENSIVE_TRIVIA_QUESTIONS, getRandomQuestions, getQuestionsByCategory, getAllCategories } from '@/lib/triviaDatabase';

export const triviaCollection = collection(firestore, 'triviaQuestions');

export async function fetchTriviaCategories() {
  // Return all unique categories from the comprehensive database
  return getAllCategories();
}

export async function fetchTriviaByCategory(category: string, difficulty?: TriviaQuestion['difficulty']) {
  // Filter from the comprehensive database
  let filtered = COMPREHENSIVE_TRIVIA_QUESTIONS.filter((q) => q.category === category);

  if (difficulty) {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }

  return filtered;
}

export async function fetchRandomTrivia(
  count: number = 10,
  category?: string,
  difficulty?: string,
  excludeIds?: Set<string>
): Promise<TriviaQuestion[]> {
  // Get randomized questions from the comprehensive database
  return getRandomQuestions(count, category, difficulty, excludeIds);
}

export async function getTriviaDifficulties(category: string): Promise<string[]> {
  // Get all unique difficulties for a category
  const questions = getQuestionsByCategory(category);
  const difficulties = new Set(questions.map((q) => q.difficulty));
  return Array.from(difficulties).sort();
}
