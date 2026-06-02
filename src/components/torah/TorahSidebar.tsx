'use client';

import { ChevronRight, Sparkles } from 'lucide-react';
import type { TorahPortionDetail } from '@/lib/models';
import { AliyotTimeline } from './AliyotTimeline';

interface TorahSidebarProps {
  portion: TorahPortionDetail;
  progress: number;
  completedCount: number;
  totalCount: number;
  activeAliyahId: string;
  completedAliyotIds: string[];
  onSelectAliyah: (aliyahId: string) => void;
}

export function TorahSidebar({ portion, progress, completedCount, totalCount, activeAliyahId, completedAliyotIds, onSelectAliyah }: TorahSidebarProps) {
  return (
    <aside>
      <section className="lg:sticky lg:top-[100px] space-y-5 rounded-[26px] border border-[var(--border)] bg-[var(--surface)]/85 p-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Torah companion</h2>
          <p className="text-sm leading-6 text-[var(--text-secondary)]">Follow this week’s portion with a prayerful pace, scripture navigation, and Hebrew insight at your side.</p>
        </div>

        <section className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)]/85 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Portion mastery</p>
              <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{portion.title}</p>
            </div>
            <div className="rounded-2xl bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent)]">{Math.round(progress)}%</div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
            <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">{completedCount} of {totalCount} aliyot complete. Keep the scroll moving.</p>
        </section>

        <div id="aliyot-navigation" className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Aliyot Timeline</p>
          <AliyotTimeline
            aliyot={portion.aliyot}
            activeAliyahId={activeAliyahId}
            completedAliyotIds={completedAliyotIds}
            onSelectAliyah={onSelectAliyah}
          />
        </div>

        <section className="space-y-3 rounded-[24px] border border-[var(--border)] bg-[var(--surface)]/85 p-5">
          <div className="flex items-center gap-3 text-[var(--accent)]">
            <Sparkles size={18} />
            <p className="text-sm font-semibold">Sacred rhythm</p>
          </div>
          <p className="text-sm leading-6 text-[var(--text-secondary)]">Track your readings, anchor your prayers, and meditate on the hidden themes as you move through each aliyah.</p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold uppercase text-[var(--text-primary)]">
            <div className="rounded-2xl bg-[var(--surface-soft)] px-2 py-2">Study</div>
            <div className="rounded-2xl bg-[var(--surface-soft)] px-2 py-2">Reflect</div>
            <div className="rounded-2xl bg-[var(--surface-soft)] px-2 py-2">Grow</div>
          </div>
        </section>
      </section>
    </aside>
  );
}
