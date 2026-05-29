import { create } from 'zustand';
import type { TorahProgressState, TorahProgressDocument } from '@/services/torah/torahProgressService';

interface TorahStoreState {
  portionId?: string;
  activeAliyah?: string;
  progress: Record<string, TorahProgressState>;
  profileProgress: Record<string, number>;
  setPortionId: (portionId: string) => void;
  setActiveAliyah: (aliyahId: string) => void;
  setProgress: (portionId: string, state: TorahProgressState) => void;
  setProfileProgress: (progress: Record<string, number>) => void;
  setFullProgressDocument: (document: TorahProgressDocument) => void;
}

export const useTorahStore = create<TorahStoreState>((set) => ({
  progress: {},
  profileProgress: {},
  setPortionId: (portionId) => set({ portionId }),
  setActiveAliyah: (aliyahId) => set({ activeAliyah: aliyahId }),
  setProgress: (portionId, state) => set((current) => ({ progress: { ...current.progress, [portionId]: state } })),
  setProfileProgress: (profileProgress) => set({ profileProgress }),
  setFullProgressDocument: (document) => set({ progress: document.portions || {}, profileProgress: Object.fromEntries(Object.entries(document.portions || {}).map(([k, value]) => [k, value.progress])) }),
}));
