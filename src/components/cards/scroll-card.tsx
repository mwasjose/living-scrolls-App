interface ScrollCardProps {
  title: string;
  subtitle: string;
}

export function ScrollCard({ title, subtitle }: ScrollCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">Scroll Study</p>
      <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{subtitle}</p>
    </div>
  );
}
