interface VerseCardProps {
  verse: string;
  text: string;
  reference: string;
}

export function VerseCard({ verse, text, reference }: VerseCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">Daily Verse</p>
      <h3 className="mt-4 text-3xl font-semibold leading-tight text-[var(--accent)]">{verse}</h3>
      <p className="mt-5 text-sm leading-7 text-[var(--text-primary)]">&quot;{text}&quot;</p>
      <p className="mt-5 text-xs text-[var(--text-muted)]">{reference}</p>
    </div>
  );
}
