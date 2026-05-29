import { useEffect, useState } from 'react';
import type { TorahPortionDetail } from '@/lib/models';

export function useTorahPortion() {
  const [portion, setPortion] = useState<TorahPortionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('https://www.hebcal.com/shabbat?cfg=json&geonameid=3448439&leyning=on')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load Torah portion.');
        return response.json();
      })
      .then((data: any) => {
        if (!isMounted) return;
        // Minimal transformation to match expected TorahPortionDetail shape
        const items = Array.isArray(data.items) ? data.items : [];
        const weeklyItem = items.find((item: any) => item?.leyning?.torah && item.category === 'parashat') || items.find((item: any) => item?.leyning?.torah);
        if (!weeklyItem || !weeklyItem.leyning) throw new Error('Weekly Torah portion data is unavailable.');
        const title = weeklyItem.title.replace(/^Parashat\s+/i, '').trim();
        const hebrewTitle = weeklyItem.hebrew ?? title;
        const transliteration = hebrewTitle;
        const leyning = weeklyItem.leyning;
        const aliyot = Object.keys(leyning)
          .filter((key) => /^[0-9]+$/.test(key))
          .sort((a, b) => Number(a) - Number(b))
          .map((key) => ({
            id: `aliyah-${key}`,
            label: `Aliyah ${key}`,
            title: `Aliyah ${key}`,
            reference: leyning[key],
            verses: leyning[key],
            summary: '',
            completed: false,
          }));

        const portion: TorahPortionDetail = {
          id: title.toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
          title,
          hebrewTitle,
          transliteration,
          references: leyning.torah || '',
          cycleProgress: '0%',
          summary: weeklyItem.memo || '',
          themes: [],
          haftarah: leyning.haftarah || '',
          maftir: leyning.maftir || '',
          aliyot,
          commentary: [],
          keywords: [],
          messianicConnections: [],
          ntConnections: [],
          readingProgress: 0,
        } as any;

        setPortion(portion);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message || 'Unable to load Torah portion.');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { portion, loading, error };
}
