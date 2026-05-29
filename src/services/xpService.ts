import { collection, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

export async function addWisdomXP(userId: string, amount: number) {
  const userRef = doc(firestore, 'users', userId);
  await updateDoc(userRef, {
    wisdomXP: increment(amount),
    // Logic for level up can be handled via Cloud Functions or calculated on client
  });
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export async function recordWisdomHistory(entry: any) {
  const historyRef = doc(collection(firestore, 'wisdomHistory'));
  await setDoc(historyRef, {
    ...entry,
    completedAt: Date.now(),
  });
}

