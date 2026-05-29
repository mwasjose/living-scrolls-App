'use client';

import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/models';
import { fetchLeaderboards } from '@/services/trivia/triviaService';

interface LeaderboardEntry {
  id: string;
  displayName: string;
  wisdomXP: number;
  streak: number;
  accuracy: number;
  title: string;
}

interface TriviaLeaderboardProps {
  profile?: UserProfile | null;
}

const defaultBoard: LeaderboardEntry[] = [
  { id: '1', displayName: 'Miriam', wisdomXP: 8420, streak: 18, accuracy: 97, title: 'Scroll Guardian' },
  { id: '2', displayName: 'Eliyahu', wisdomXP: 7980, streak: 14, accuracy: 95, title: 'Covenant Keeper' },
  { id: '3', displayName: 'Tamar', wisdomXP: 7440, streak: 12, accuracy: 92, title: 'Torah Seeker' },
];

export function TriviaLeaderboard({ profile }: TriviaLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(defaultBoard);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const remote = await fetchLeaderboards('global', 5);
        if (remote.length) {
          setEntries(remote as LeaderboardEntry[]);
        }
      } catch {
        // Keep default showcase if Firestore is unavailable.
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-secondary">Leaderboards</p>
          <h3 className="mt-2 text-lg font-semibold text-primary">Torah mastery rankings</h3>
        </div>
        <p className="rounded-full bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.24em] text-primary">Weekly</p>
      </div>
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={entry.id} className="grid grid-cols-[32px_1fr_80px] items-center gap-4 rounded-3xl bg-surface p-4 text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(252,163,17,0.15)] text-sm font-semibold text-primary">#{index + 1}</span>
            <div>
              <p className="font-semibold text-primary">{entry.displayName}</p>
              <p className="text-sm text-secondary">{entry.title}</p>
            </div>
            <div className="space-y-1 text-right text-sm">
              <p>{entry.wisdomXP} XP</p>
              <p className="text-secondary">{entry.accuracy}%</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-secondary">{profile ? 'Your pathway to the leaderboard is saved as you grow.' : 'Sign in to track mastery and join the leaderboard.'}</p>
    </div>
  );
}

