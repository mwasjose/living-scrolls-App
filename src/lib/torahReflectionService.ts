import {
  doc,
  getDoc,
  setDoc,
  collection,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export interface CachedReflection {
  id?: string;
  portionId: string;
  aliyahId?: string;
  summary: string;
  hebraicInsight: {
    title: string;
    text: string;
    hebrew?: string;
    transliteration?: string;
  };
  messianicConnection: string;
  lifeReflection: string;
  wordStudy: Array<{
    word: string;
    hebrew: string;
    transliteration: string;
    meaning: string;
    insight: string;
  }>;
  prayer: string;
  reflectionQuestions: string[];
  crossReferences: string[];
  createdAt?: Timestamp;
}

export async function getCachedReflection(portionId: string, aliyahId?: string): Promise<CachedReflection | null> {
  try {
    const reflectionId = aliyahId ? `${portionId}_${aliyahId}` : portionId;
    const docRef = doc(db, 'torah_reflections', reflectionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as CachedReflection;
    }
    return null;
  } catch (error) {
    console.error('Error fetching cached reflection:', error);
    return null;
  }
}

export async function saveReflection(
  portionId: string,
  reflection: Omit<CachedReflection, 'id' | 'createdAt'>,
  aliyahId?: string
): Promise<void> {
  try {
    const reflectionId = aliyahId ? `${portionId}_${aliyahId}` : portionId;
    const docRef = doc(db, 'torah_reflections', reflectionId);

    await setDoc(
      docRef,
      {
        ...reflection,
        portionId,
        aliyahId,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving reflection:', error);
    // Silently fail - this is optional caching
  }
}
