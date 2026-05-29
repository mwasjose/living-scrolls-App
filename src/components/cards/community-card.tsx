interface CommunityCardProps {
  title: string;
  description: string;
  tag: string;
}

export function CommunityCard({ title, description, tag }: CommunityCardProps) {
  return (
    <div className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{tag}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{description}</p>
    </div>
  );
}
