interface HebrewWordCardProps {
  hebrew: string;
  transliteration: string;
  meaning: string;
  category: string;
}

export function HebrewWordCard({ hebrew, transliteration, meaning, category }: HebrewWordCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">{category}</p>
      <h3 className="mt-3 text-2xl font-semibold text-[var(--accent)]" style={{ fontFamily: "var(--font-hebrew), var(--font-fira)" }}>{ hebrew}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{transliteration}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--text-primary)]">{meaning}</p>
    </div>
  );
}
