import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { UserProfile } from '@/lib/models';

export async function getGlobalLeaderboard(count = 10) {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, orderBy('wisdomXP', 'desc'), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as UserProfile);
}