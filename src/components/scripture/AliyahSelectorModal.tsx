'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';

interface AliyahSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  readings: TorahAliyah[];
  activeReadingId: string;
  onSelectReading: (id: string) => void;
}

export function AliyahSelectorModal({
  isOpen,
  onClose,
  readings,
  activeReadingId,
  onSelectReading,
}: AliyahSelectorModalProps) {
  const handleSelect = (id: string) => {
    onSelectReading(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 max-h-[70vh] rounded-2xl border border-[var(--border)] bg-[var(--surface)]/98 p-5 shadow-2xl sm:max-w-sm"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">Select</p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">Aliyah</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] transition shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Aliyah list */}
            <motion.ul
              className="mt-4 max-h-[calc(70vh-80px)] overflow-y-auto space-y-1.5"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {readings.map((reading, i) => (
                <motion.li
                  key={reading.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(reading.id)}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-left text-sm transition ${
                      reading.id === activeReadingId
                        ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] ring-2 ring-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] active:bg-[var(--surface)]'
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-[var(--text-primary)] text-xs">{reading.label}</span>
                      <span className="block text-xs text-[var(--text-secondary)]">{reading.reference}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-[var(--surface-soft)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
                      {i + 1}/{readings.length}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
