import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, AlertTriangle } from 'lucide-react';

export const ImagePreview = ({ url, label = 'Image Preview' }) => {
  const [hasError, setHasError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!url || typeof url !== 'string' || !url.trim()) {
      setIsValid(false);
      setHasError(false);
      return;
    }
    setHasError(false);
    setIsValid(true);
  }, [url]);

  if (!url) {
    return (
      <div className="p-4 bg-[#0A0A0A] border border-dashed border-[#333333] flex flex-col items-center justify-center text-center text-neutral-500 min-h-[140px]">
        <ImageIcon size={24} className="mb-2 opacity-50" />
        <span className="text-xs font-mono">No image URL specified</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <span className="text-[10px] uppercase font-mono tracking-widest text-[#A7A29B]">
        {label}
      </span>
      <div className="relative aspect-[16/10] bg-[#0A0A0A] border border-[#333333] overflow-hidden flex items-center justify-center">
        {hasError ? (
          <div className="flex flex-col items-center justify-center text-rose-400 p-4 text-center">
            <AlertTriangle size={20} className="mb-1" />
            <span className="text-xs font-mono">Unable to load image from URL</span>
          </div>
        ) : (
          <img
            src={url}
            alt="Preview"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};
