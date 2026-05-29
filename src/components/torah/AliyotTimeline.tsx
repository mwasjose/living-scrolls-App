'use client';

import { ChevronRight } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';
import { messianicNormalize } from '@/lib/scriptureParser';

interface AliyotTimelineProps {
  aliyot: TorahAliyah[];
  activeAliyahId?: string;
  completedAliyotIds: string[];
  onSelectAliyah: (aliyahId: string) => void;
  onToggleCompletion?: (aliyahId: string) => void;
}

export function AliyotTimeline({ aliyot, activeAliyahId, completedAliyotIds, onSelectAliyah }: AliyotTimelineProps) {
  const completedCount = aliyot.filter((aliyah) => completedAliyotIds.includes(aliyah.id)).length;

  return (
    <div className="space-y-1">
      {aliyot.map((aliyah) => {
        const active = aliyah.id === activeAliyahId;
        const completed = completedAliyotIds.includes(aliyah.id);
        return (
          <button
            type="button"
            key={aliyah.id}
            onClick={() => onSelectAliyah(aliyah.id)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
              active
                ? 'bg-surface-soft text-primary ring-1 ring-[rgba(252,163,17,0.24)]'
                : 'text-secondary hover:bg-surface-soft hover:text-primary'
            }`}
          >
            <span>
              <span className="block font-semibold text-primary">
                {aliyah.label} - {messianicNormalize(aliyah.title || aliyah.reference)}
              </span>
              <span className="block text-xs text-muted">{aliyah.reference}</span>
              {completed && (
                <span className="mt-1 inline-block rounded-full bg-surface-soft px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                  Completed
                </span>
              )}
            </span>
            <ChevronRight className={`shrink-0 text-secondary transition ${active ? 'translate-x-1' : ''}`} size={16} />
          </button>
        );
      })}
    </div>
  );
}
