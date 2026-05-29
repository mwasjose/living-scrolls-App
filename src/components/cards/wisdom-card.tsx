interface WisdomCardProps {
  title: string;
  value: string;
}

export function WisdomCard({ title, value }: WisdomCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">{title}</p>
      <p className="mt-4 text-lg font-semibold text-[var(--accent)]">{value}</p>
    </div>
  );
}
