import { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    // Automatic retry once with cache-busting parameter
    if (retryCount === 0) {
      setRetryCount(1);
      const cacheBuster = `?retry=${Date.now()}`;
      setCurrentSrc(src + cacheBuster);
    } else {
      // After automatic retry fails, show error state
      setIsLoaded(true);
      setHasError(true);
    }
  };

  const handleManualRetry = () => {
    setIsLoaded(false);
    setHasError(false);
    setRetryCount(prev => prev + 1);
    const cacheBuster = `?retry=${Date.now()}`;
    setCurrentSrc(src + cacheBuster);
  };

  return (
    <div className={`bg-black ${className}`} style={style}>
      <div 
        className={`relative w-full bg-black ${wrapperClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        data-testid="media-frame-wrapper"
      >
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="h-12 w-12 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin" />
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-muted-foreground p-4 gap-3">
            <AlertCircle className="h-8 w-8 text-yellow-400/60" />
            <p className="text-sm text-center">Image unavailable</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRetry}
              className="mt-2 border-yellow-400/30 hover:border-yellow-400/50 hover:bg-yellow-400/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={alt}
            className={`transition-opacity duration-300 ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName} ${
              aspectRatio ? 'w-full h-full' : 'max-w-full h-auto block mx-auto'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            data-testid="media-frame-image"
          />
        )}
      </div>
    </div>
  );
}
