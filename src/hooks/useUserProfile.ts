import { useEffect, useState } from 'react';
import type { UserProfileData } from '@/services/userService';
import { listenToUserProfile } from '@/services/userService';

export function useUserProfile(userId: string | null) {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const unsubscribe = listenToUserProfile(userId, (data) => {
      setProfile(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { profile, loading };
}
