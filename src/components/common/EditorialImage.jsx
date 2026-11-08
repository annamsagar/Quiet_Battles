import React, { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop';

export const EditorialImage = ({
  src,
  alt = 'QUIET BATTLES™ Editorial Fashion',
  className = '',
  aspectRatio = 'aspect-[3/4]',
  overlay = false,
  zoomOnHover = false,
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#151515] ${aspectRatio} ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
      )}

      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${zoomOnHover ? 'group-hover:scale-105 group-hover:filter group-hover:brightness-105' : ''}`}
      />

      {/* Subtle Luxury Film Grain / Shadow Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
