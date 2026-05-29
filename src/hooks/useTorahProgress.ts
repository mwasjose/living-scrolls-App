import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { updateTorahProgress, type TorahProgressDocument } from '@/services/torah/torahProgressService';
import { useTorahStore } from '@/hooks/useTorahStore';

export function useTorahProgress(userId?: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const store = useTorahStore();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return undefined;
    }

    const progressRef = doc(db, 'users', userId, 'torah_progress', 'current');
    const unsubscribe = onSnapshot(
      progressRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          store.setFullProgressDocument({ updatedAt: Date.now(), portions: {} });
        } else {
          store.setFullProgressDocument(snapshot.data() as TorahProgressDocument);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [userId, store]);

  const saveProgress = async (portionId: string, progressValue: number, completedAliyot: string[], reflection?: string) => {
    if (!userId) {
      throw new Error('Sign in to save Torah progress.');
    }

    setSaving(true);
    try {
      const updated = await updateTorahProgress(userId, portionId, progressValue, completedAliyot, reflection);
      store.setFullProgressDocument(updated);
      setError(null);
      return updated;
    } catch (err) {
      setError((err as Error)?.message || 'Unable to save Torah progress.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    progress: store.progress,
    loading,
    error,
    saving,
    saveProgress,
  };
}
