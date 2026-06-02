'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // This will help you see the actual crash in the browser console
    console.error('Dashboard Error Trace:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-card-soft rounded-lg border-2 border-dashed border-red-200">
      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">!</div>
      <h2 className="text-xl font-bold text-sacred-primary mb-2">Dashboard Data Error</h2>
      <p className="text-sacred-primary/60 mb-6 max-w-md text-sm">
        {error.message || "There was a problem loading dashboard components. This often happens if data in Firestore is missing required fields."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-sacred-primary text-white rounded-md hover:bg-opacity-90 transition-all font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}