import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import type { HebrewWord } from '@/lib/models';

export const hebrewWordsCollection = collection(firestore, 'hebrewWords');

export async function fetchHebrewWords(category?: string) {
  const wordQuery = category
    ? query(hebrewWordsCollection, where('category', '==', category))
    : query(hebrewWordsCollection);

  const snapshot = await getDocs(wordQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<HebrewWord, 'id'>) } as HebrewWord));
}
