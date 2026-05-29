import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { generateTriviaQuestions, getDailyChallenge, TriviaMode, TriviaLevel } from './questionEngine';
import type { TriviaQuestion } from '@/lib/models';

const PROGRESS_COLLECTION = 'trivia_progress';
const LEADERBOARD_COLLECTION = 'trivia_leaderboards';
const DAILY_CHALLENGE_COLLECTION = 'daily_challenges';

export async function fetchQuestionsFromEngine({
  mode,
  difficulty,
  category,
  count = 8,
}: {
  mode: TriviaMode;
  difficulty: TriviaLevel;
  category?: string;
  count?: number;
}) {
  return generateTriviaQuestions({ mode, difficulty, category, count });
}

export async function fetchDailyChallenge(userId: string | undefined, date?: string) {
  const today = date ?? new Date().toISOString().slice(0, 10);
  if (!userId) {
    return { challenge: getDailyChallenge(today), date: today };
  }

  const challengeRef = doc(firestore, DAILY_CHALLENGE_COLLECTION, `${userId}-${today}`);
  const snapshot = await getDoc(challengeRef);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  const challenge = getDailyChallenge(today);
  await setDoc(challengeRef, {
    userId,
    date: today,
    challenge,
    createdAt: serverTimestamp(),
  });

  return { userId, date: today, challenge };
}

export async function saveTriviaProgress(userId: string, points: number, accuracy: number, streakDays: number) {
  const progressRef = doc(firestore, PROGRESS_COLLECTION, userId);
  const snapshot = await getDoc(progressRef);

  if (snapshot.exists()) {
    await updateDoc(progressRef, {
      wisdomXP: (snapshot.data()?.wisdomXP || 0) + points,
      accuracy,
      streakDays,
      lastUpdated: serverTimestamp(),
    });
  } else {
    await setDoc(progressRef, {
      userId,
      wisdomXP: points,
      accuracy,
      streakDays,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
  }
}

export async function fetchLeaderboards(type: 'global' | 'weekly' | 'torah' | 'hebrew' = 'global', count = 8) {
  const topCollection = collection(firestore, LEADERBOARD_COLLECTION);
  const q = query(topCollection, where('category', '==', type), orderBy('wisdomXP', 'desc'), limit(count));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));
}
