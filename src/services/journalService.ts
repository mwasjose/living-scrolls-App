import { collection, doc, setDoc, getDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { JournalEntry } from '@/lib/models';

const JOURNAL_COLLECTION = 'journalEntries';

export async function createJournalEntry(
  userId: string,
  date: string, // YYYY-MM-DD
  data: Omit<JournalEntry, 'id' | 'userId' | 'date' | 'createdAt'>
) {
  const entryRef = doc(firestore, JOURNAL_COLLECTION, `${userId}_${date}`);
  await setDoc(entryRef, {
    userId,
    date,
    ...data,
    createdAt: serverTimestamp(),
  }, { merge: true });
}

export async function fetchJournalEntryForDate(userId: string, date: string): Promise<JournalEntry | null> {
  const entryRef = doc(firestore, JOURNAL_COLLECTION, `${userId}_${date}`);
  const docSnap = await getDoc(entryRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as JournalEntry;
  } else {
    return null;
  }
}