import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { UserProfile } from '@/lib/models';
import { firestore } from '@/lib/firebase';

export type UserProfileData = UserProfile;

export async function createUserProfile(userId: string, displayName: string, email: string) {
  const profileRef = doc(firestore, 'users', userId);
  const initialProfile: UserProfileData = {
    id: userId,
    displayName,
    email,
    wisdomXP: 120,
    streakDays: 1,
    level: 1,
    wisdomTitle: 'Torah Seeker',
    badges: ['Torah Seeker'],
    readingProgress: { torah: 0, neviim: 0, ketuvim: 0, messianic: 0 },
    activeReadingPlan: undefined,
    readingPlans: {},
    journalEntries: [],
    notifications: [],
    prayerConsistency: {},
    torahReadingProgress: {},
    memorizationProgress: {},
    disciplineTracker: {},
    dailyMissionsCompleted: [],
  };
  await setDoc(profileRef, initialProfile);
  return initialProfile;
}

export async function getUserProfile(userId: string) {
  const profileRef = doc(firestore, 'users', userId);
  const snapshot = await getDoc(profileRef);
  return snapshot.exists() ? (snapshot.data() as UserProfileData) : null;
}

export async function updateUserProfile(userId: string, updates: Partial<Omit<UserProfileData, 'id' | 'email'>>) {
  const profileRef = doc(firestore, 'users', userId);
  await updateDoc(profileRef, updates);
  return getUserProfile(userId);
}

export async function ensureUserProfile(user: User) {
  const existingProfile = await getUserProfile(user.uid);
  if (existingProfile) {
    return existingProfile;
  }

  const displayName = user.displayName || user.email?.split('@')[0] || 'Beloved';
  const email = user.email || 'unknown@living-scrolls.com';
  return createUserProfile(user.uid, displayName, email);
}

export function listenToUserProfile(userId: string, callback: (profile: UserProfileData | null) => void) {
  const profileRef = doc(firestore, 'users', userId);
  return onSnapshot(profileRef, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.data() as UserProfileData) : null);
  });
}
