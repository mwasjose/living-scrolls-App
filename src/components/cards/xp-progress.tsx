interface XPProgressProps {
  label: string;
  value: number;
  subtitle: string;
}

export function XPProgress({ label, value, subtitle }: XPProgressProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">{label}</p>
        <p className="text-sm text-[var(--accent)]">{value}%</p>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--surface-strong)]">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--color-avast-cyan-light)]" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-4 text-sm text-[var(--text-muted)]">{subtitle}</p>
    </div>
  );
}
