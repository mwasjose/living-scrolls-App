import { useEffect, useState, useRef } from 'react';
import type { ScripturePassage } from '@/lib/models';
import { emptyPassage } from '@/lib/scripture';

// Basic in-memory cache for session-based performance
const scriptureCache = new Map<string, ScripturePassage>();

export function useScripturePassage(reference: string, translation = 'kjv', enabled = true) {
  const [passage, setPassage] = useState<ScripturePassage>(() => {
    const cacheKey = `${reference}-${translation}`;
    return scriptureCache.get(cacheKey) || emptyPassage(reference, translation);
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabled || !reference) return;
    
    const cacheKey = `${reference}-${translation}`;
    if (scriptureCache.has(cacheKey)) {
      setPassage(scriptureCache.get(cacheKey)!);
      return;
    }

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ translation });
    const url = `https://bible-api.com/${encodeURIComponent(reference)}?${params.toString()}`;
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load Scripture text.');
        return response.json();
      })
      .then((data: ScripturePassage) => {
        scriptureCache.set(cacheKey, data);
        setPassage(data);
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setError(err?.message || 'Unable to load Scripture text.');
        setPassage(emptyPassage(reference, translation));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [enabled, reference, translation]);

  return { passage, loading, error };
}
