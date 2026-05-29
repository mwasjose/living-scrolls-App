'use client';

interface TriviaTimerProps {
  current: number;
  total: number;
}

export function TriviaTimer({ current, total }: TriviaTimerProps) {
  const progress = total ? Math.max(0, Math.min(100, Math.round((current / total) * 100))) : 0;
  const stroke = 126;
  const dash = Math.round((progress / 100) * stroke);

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full">
          <circle cx="22" cy="22" r="20" strokeWidth="4" className="stroke-[rgba(255,255,255,0.1)] fill-transparent" />
          <circle
            cx="22"
            cy="22"
            r="20"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-[var(--accent)] transition-all duration-300"
            strokeDasharray={`${dash} 126`}
            transform="rotate(-90 22 22)"
          />
        </svg>
        <div className="relative flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
          {current}s
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-secondary">Remaining time</p>
        <p className="mt-2 text-lg font-semibold text-primary">{progress}%</p>
      </div>
    </div>
  );
}

