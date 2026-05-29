import { doc, getDoc, runTransaction, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

export interface TorahProgressState {
  completedAliyot: string[];
  progress: number;
  lastUpdated: number;
}

export interface TorahProgressDocument {
  updatedAt: number;
  portions: Record<string, TorahProgressState>;
  streakDays?: number;
  reflections?: Record<string, string>;
}

const progressDocPath = (userId: string) => doc(firestore, 'users', userId, 'torah_progress', 'current');

export async function fetchTorahProgress(userId: string): Promise<TorahProgressDocument | null> {
  const snapshot = await getDoc(progressDocPath(userId));
  return snapshot.exists() ? (snapshot.data() as TorahProgressDocument) : null;
}

export async function updateTorahProgress(
  userId: string,
  portionId: string,
  progress: number,
  completedAliyot: string[],
  reflection?: string,
): Promise<TorahProgressDocument> {
  const progressRef = progressDocPath(userId);

  return runTransaction(firestore, async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const currentData = snapshot.exists() ? (snapshot.data() as TorahProgressDocument) : { updatedAt: Date.now(), portions: {} };
    const existing = currentData.portions?.[portionId] || { completedAliyot: [], progress: 0, lastUpdated: Date.now() };
    const newPortionState: TorahProgressState = {
      completedAliyot,
      progress,
      lastUpdated: Date.now(),
    };

    const updatedData: TorahProgressDocument = {
      ...currentData,
      updatedAt: Date.now(),
      portions: {
        ...currentData.portions,
        [portionId]: newPortionState,
      },
      reflections: reflection ? { ...currentData.reflections, [portionId]: reflection } : currentData.reflections,
    };

    if (snapshot.exists()) {
      transaction.set(progressRef, updatedData, { merge: true });
    } else {
      transaction.set(progressRef, updatedData);
    }

    return updatedData;
  });
}
