import { useState } from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}

export default function MediaFrame({ 
  src, 
  alt, 
  aspectRatio = '9/16',
  className = '' 
}: MediaFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`tbn-media-frame ${className}`}>
      <div 
        className="tbn-media-inner"
        style={{ aspectRatio }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
}
