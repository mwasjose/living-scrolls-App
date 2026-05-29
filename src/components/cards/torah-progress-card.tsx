interface TorahProgressCardProps {
  progress: number;
  portions: number;
  completedAliyot: number;
  subtitle: string;
}

export function TorahProgressCard({ progress, portions, completedAliyot, subtitle }: TorahProgressCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">Torah Progress</p>
          <p className="mt-3 text-2xl font-semibold text-[var(--accent)]">{progress}% complete</p>
        </div>
        <div className="rounded-full bg-[var(--accent-soft)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">{ portions} portion{portions === 1 ? '' : 's'}</div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--surface-strong)]">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--color-avast-cyan-light)]" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-5 grid gap-3 text-sm text-[var(--text-primary)]">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          <p className="font-semibold text-[var(--text-primary)]">Aliyot Completed</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{completedAliyot} marked as study complete in your Torah rhythm.</p>
        </div>
        <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
      </div>
    </div>
  );
}
