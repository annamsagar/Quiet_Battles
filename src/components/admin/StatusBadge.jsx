import React from 'react';

export const StatusBadge = ({ status = 'published' }) => {
  const isPublished = status === 'published';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border rounded ${
        isPublished
          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
          : 'bg-amber-950/40 text-amber-400 border-amber-800/50'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isPublished ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
      />
      <span>{status}</span>
    </span>
  );
};
