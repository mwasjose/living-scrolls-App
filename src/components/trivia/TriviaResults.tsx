'use client';

interface TriviaResultsProps {
  score: number;
  total: number;
  accuracy: number;
  xp: number;
  streak: number;
}

export function TriviaResults({ score, total, accuracy, xp, streak }: TriviaResultsProps) {
  return (
    <div className="card-sacred p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-secondary">Sacred completion</p>
      <h3 className="mt-3 text-2xl font-semibold text-primary">Your Scripture mastery snapshot</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-5 text-sm text-secondary">
          <p className="uppercase tracking-[0.24em] text-secondary">Session score</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{score} / {total}</p>
        </div>
        <div className="rounded-3xl bg-surface p-5 text-sm text-secondary">
          <p className="uppercase tracking-[0.24em] text-secondary">Accuracy</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{accuracy}%</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-5 text-sm text-secondary">
          <p className="uppercase tracking-[0.24em] text-secondary">Wisdom XP earned</p>
          <p className="mt-3 text-2xl font-semibold text-primary">{xp}</p>
        </div>
        <div className="rounded-3xl bg-surface p-5 text-sm text-secondary">
          <p className="uppercase tracking-[0.24em] text-secondary">Highest streak</p>
          <p className="mt-3 text-2xl font-semibold text-primary">{streak}</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-secondary">Return to your Sacred Wisdom Training System to deepen category mastery and enrich your Scripture insight.</p>
    </div>
  );
}

