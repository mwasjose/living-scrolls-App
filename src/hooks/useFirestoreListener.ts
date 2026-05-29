import { useEffect, useState } from 'react';
import { onSnapshot, Query } from 'firebase/firestore';

export function useFirestoreListener<T>(query: Query) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T)));
      setLoading(false);
    });
    return unsubscribe;
  }, [query]);

  return { data, loading };
}
