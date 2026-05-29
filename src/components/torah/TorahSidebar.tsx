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
    <aside className="hidden lg:block">
      <div className="sticky top-[100px] space-y-6 card-sacred p-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary">Torah companion</h2>
          <p className="text-sm leading-6 text-secondary">Follow this week’s portion with a prayerful pace, scripture navigation, and Hebrew insight at your side.</p>
        </div>

        <div className="rounded-3xl bg-surface p-5 ring-1 ring-[rgba(252,163,17,0.15)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">Portion mastery</p>
              <p className="mt-2 text-xl font-semibold text-primary">{portion.title}</p>
            </div>
            <div className="rounded-2xl bg-[rgba(252,163,17,0.15)] px-3 py-1 text-sm font-semibold text-primary">{Math.round(progress)}%</div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-surface-soft">
            <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm text-secondary">{completedCount} of {totalCount} aliyot complete. Keep the scroll moving.</p>
        </div>

        <div id="aliyot-navigation" className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-secondary">Aliyot Timeline</p>
          <AliyotTimeline
            aliyot={portion.aliyot}
            activeAliyahId={activeAliyahId}
            completedAliyotIds={completedAliyotIds}
            onSelectAliyah={onSelectAliyah}
          />
        </div>

        <div className="space-y-3 rounded-3xl bg-surface p-5">
          <div className="flex items-center gap-3 text-secondary">
            <Sparkles size={18} />
            <p className="text-sm font-semibold">Sacred rhythm</p>
          </div>
          <p className="text-sm leading-6 text-secondary">Track your readings, anchor your prayers, and meditate on the hidden themes as you move through each aliyah.</p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold uppercase text-primary">
            <div className="rounded-2xl bg-surface-soft px-2 py-2">Study</div>
            <div className="rounded-2xl bg-surface-soft px-2 py-2">Reflect</div>
            <div className="rounded-2xl bg-surface-soft px-2 py-2">Grow</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
