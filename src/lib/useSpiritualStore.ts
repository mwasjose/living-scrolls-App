interface SpiritualState {
  wisdomXP: number;
  streakDays: number;
  level: number;
  wisdomTitle: string;
  badges: string[];
  memorizationProgress: Record<string, number>;
  prayerConsistency: Record<string, boolean>;
  dailyMissions: string[];

  // Actions
  addXP: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  setTitle: (title: string) => void;
  updateMemorization: (verseId: string, progress: number) => void;
  updateStreak: (days: number) => void;
  completeMission: (missionId: string) => void;
  resetDailyState: () => void;
}

export function useSpiritualStore(): SpiritualState {
  return {
    wisdomXP: 0,
    streakDays: 0,
    level: 1,
    wisdomTitle: 'Torah Seeker',
    badges: [],
    memorizationProgress: {},
    prayerConsistency: {},
    dailyMissions: [],
    addXP: () => {},
    unlockBadge: () => {},
    setTitle: () => {},
    updateMemorization: () => {},
    updateStreak: () => {},
    completeMission: () => {},
    resetDailyState: () => {},
  };
}
