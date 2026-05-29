interface LessonCardProps {
  title: string;
  category: string;
  description: string;
}

export function LessonCard({ title, category, description }: LessonCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">{category}</p>
        <span className="rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Daily Wisdom</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{description}</p>
    </div>
  );
}
