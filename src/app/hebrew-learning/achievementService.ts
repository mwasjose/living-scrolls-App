import { firestore } from '@/lib/firebase';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

const TITLES = [
  { minXP: 0, title: 'Torah Seeker' },
  { minXP: 1000, title: 'Wisdom Builder' },
  { minXP: 5000, title: 'Keeper of the Covenant' },
  { minXP: 10000, title: 'Scroll Guardian' },
  { minXP: 50000, title: 'Light Bearer' },
];

export async function checkAndUnlockAchievements(userId: string, currentXP: number) {
  const userRef = doc(firestore, 'users', userId);
  
  try {
    await runTransaction(firestore, async (transaction) => {
      const userSnap = await transaction.get(userRef);
      if (!userSnap.exists()) return;
      
      const userData = userSnap.data();
      const currentTitle = userData.wisdomTitle;
      
      // Determine appropriate title based on XP
      const newTitle = TITLES.slice().reverse().find(t => currentXP >= t.minXP)?.title;
      
      if (newTitle && newTitle !== currentTitle) {
        transaction.update(userRef, {
          wisdomTitle: newTitle,
          achievements: [...(userData.achievements || []), {
            id: `title_${newTitle.toLowerCase().replace(/ /g, '_')}`,
            unlockedAt: serverTimestamp(),
            type: 'TITLE'
          }]
        });
        console.log(`Unlocked new title: ${newTitle}`);
      }
    });
  } catch (e) {
    console.error("Achievement check failed", e);
  }
}