'use client';

interface TriviaProgressProps {
  progress: number;
  score: string;
  xp: number;
}

export function TriviaProgress({ progress, score, xp }: TriviaProgressProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-surface p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-secondary">Session progress</p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface-soft">
          <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-secondary">{progress}% complete</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-4 text-sm text-secondary">
          <p className="uppercase tracking-[0.24em] text-secondary">Score</p>
          <p className="mt-3 text-lg font-semibold text-primary">{score}</p>
        </div>
        <div className="rounded-3xl bg-surface p-4 text-sm text-secondary">
          <p className="uppercase tracking-[0.24em] text-secondary">Wisdom XP</p>
          <p className="mt-3 text-lg font-semibold text-primary">{xp}</p>
        </div>
      </div>
    </div>
  );
}

