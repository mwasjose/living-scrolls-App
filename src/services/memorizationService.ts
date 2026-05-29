import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { MemorizationVerse } from '@/lib/models';

const MEMORIZATION_COLLECTION = 'memorizationVerses';

// Mock data for demonstration
const mockVerses: MemorizationVerse[] = [
  { id: 'psalm119_105', category: 'Psalms', verse: 'Psalm 119:105', text: 'Your word is a lamp to my feet and a light to my path.', reference: 'Psalm 119:105', hebrewText: 'נֵר לְרַגְלִי דְבָרֶךָ וְאוֹר לִנְתִיבָתִי', masteryLevel: 0, lastReviewed: null },
  { id: 'john3_16', category: 'Teachings of Yahshuah', verse: 'John 3:16', text: 'For Elohim so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', reference: 'John 3:16', masteryLevel: 0, lastReviewed: null },
  { id: 'genesis1_1', category: 'Torah', verse: 'Genesis 1:1', text: 'In the beginning Elohim created the heavens and the earth.', reference: 'Genesis 1:1', hebrewText: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', masteryLevel: 0, lastReviewed: null },
  { id: 'proverbs3_5', category: 'Wisdom', verse: 'Proverbs 3:5', text: 'Trust in Adonai with all your heart and lean not on your own understanding.', reference: 'Proverbs 3:5', masteryLevel: 0, lastReviewed: null },
];

export async function fetchMemorizationVerses(category?: MemorizationVerse['category']): Promise<MemorizationVerse[]> {
  // In a real application, you would fetch from Firestore.
  // For now, we'll filter mock data.
  if (category) {
    return mockVerses.filter(verse => verse.category === category);
  }
  return mockVerses;
  
  /*
  const versesRef = collection(firestore, MEMORIZATION_COLLECTION);
  const q = category ? query(versesRef, where('category', '==', category)) : versesRef;
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MemorizationVerse));
  */
}