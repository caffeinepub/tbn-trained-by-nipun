import { useState } from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  aspectRatio?: string | null;
  className?: string;
  objectFit?: 'contain' | 'cover';
  wrapperClassName?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export default function MediaFrame({ 
  src, 
  alt, 
  aspectRatio = '9/16',
  className = '',
  objectFit = 'contain',
  wrapperClassName = '',
  imgClassName = '',
  style,
  priority = false
}: MediaFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`bg-black ${className}`} style={style}>
      <div 
        className={`relative w-full bg-black ${wrapperClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        data-testid="media-frame-wrapper"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="h-12 w-12 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin" />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            objectFit === 'cover' ? 'object-cover' : 'object-contain'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName} ${
            aspectRatio ? 'w-full h-full' : 'w-full h-auto'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          data-testid="media-frame-image"
        />
      </div>
    </div>
  );
}
