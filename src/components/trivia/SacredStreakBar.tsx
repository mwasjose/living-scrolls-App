'use client';

interface SacredStreakBarProps {
  streak: number;
  maxStreak: number;
  accuracy: number;
}

export function SacredStreakBar({ streak, maxStreak, accuracy }: SacredStreakBarProps) {
  return (
    <div className="rounded-[28px] bg-surface p-5 text-primary">
      <p className="text-xs uppercase tracking-[0.28em] text-secondary">Wisdom momentum</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-surface-soft p-4 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Streak</p>
          <p className="mt-2 text-xl font-semibold text-primary">{streak}</p>
        </div>
        <div className="rounded-3xl bg-surface-soft p-4 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Highest streak</p>
          <p className="mt-2 text-xl font-semibold text-primary">{maxStreak}</p>
        </div>
        <div className="rounded-3xl bg-surface-soft p-4 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Accuracy</p>
          <p className="mt-2 text-xl font-semibold text-primary">{accuracy}%</p>
        </div>
      </div>
    </div>
  );
}

