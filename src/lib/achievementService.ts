import { db } from '@/firebase/config';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

export const WISDOM_TITLES = {
  TORAH_SEEKER: { minXP: 0, title: 'Torah Seeker' },
  WISDOM_BUILDER: { minXP: 1000, title: 'Wisdom Builder' },
  KEEPER_COVENANT: { minXP: 5000, title: 'Keeper of the Covenant' },
  SCROLL_GUARDIAN: { minXP: 10000, title: 'Scroll Guardian' },
  LIGHT_BEARER: { minXP: 50000, title: 'Light Bearer' },
};

export async function checkAndUnlockAchievements(userId: string, currentXP: number) {
  const userRef = doc(db, 'users', userId);
  
  try {
    const result = await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);
      if (!userSnap.exists()) return null;
      
      const userData = userSnap.data();
      const currentTitle = userData.wisdomTitle || 'Torah Seeker';
      
      // Determine appropriate title based on XP
      const titlesArray = Object.values(WISDOM_TITLES).reverse();
      const earnedTitleObj = titlesArray.find(t => currentXP >= t.minXP);
      const newTitle = earnedTitleObj?.title || 'Torah Seeker';
      
      if (newTitle && newTitle !== currentTitle) {
        const achievementId = `title_${newTitle.toLowerCase().replace(/ /g, '_')}`;
        transaction.update(userRef, {
          wisdomTitle: newTitle,
          achievements: [...(userData.achievements || []), {
            id: achievementId,
            unlockedAt: serverTimestamp(),
            type: 'TITLE'
          }]
        });
        return newTitle;
      }
      return null;
    });
    return result;
  } catch (e) {
    console.error("Achievement check failed", e);
    return null;
  }
}