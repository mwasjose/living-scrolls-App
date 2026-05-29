'use client';

import type { TorahAliyah } from '@/lib/models';
import { ReadingPanel } from '@/components/scripture/ReadingPanel';

interface ScriptureViewerProps {
  aliyot: TorahAliyah[];
  activeAliyahId?: string;
  completedAliyotIds?: string[];
  onSelectAliyah: (aliyahId: string) => void;
  onToggleCompletion?: (aliyahId: string) => void;
}

export function ScriptureViewer({
  aliyot,
  activeAliyahId,
  completedAliyotIds = [],
  onSelectAliyah,
  onToggleCompletion,
}: ScriptureViewerProps) {
  return (
    <div id="scripture">
      <ReadingPanel
        eyebrow="Scripture viewer"
        title="Responsive reading with anchored navigation."
        readings={aliyot}
        activeReadingId={activeAliyahId || aliyot[0]?.id || ''}
        completedReadingIds={completedAliyotIds}
        persistenceKey="torah-active-reading"
        onSelectReading={onSelectAliyah}
        onToggleCompletion={onToggleCompletion}
      />
    </div>
  );
}

