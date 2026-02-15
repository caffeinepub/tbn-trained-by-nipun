import { useEffect, useRef } from 'react';

interface PreloadOptions {
  highPriorityUrls?: string[];
  allUrls: string[];
}

/**
 * Preloads images for the landing page to improve perceived performance.
 * High-priority images load immediately, others are queued in the background.
 */
export function useLandingImagePreload({ highPriorityUrls = [], allUrls }: PreloadOptions) {
  const preloadedRef = useRef(new Set<string>());

  useEffect(() => {
    const preloadImage = (url: string, priority: 'high' | 'low' = 'low'): Promise<void> => {
      // Skip if already preloaded
      if (preloadedRef.current.has(url)) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const img = new Image();
        
        // Set priority hints
        if (priority === 'high') {
          img.fetchPriority = 'high';
        }
        
        img.onload = () => {
          preloadedRef.current.add(url);
          resolve();
        };
        
        img.onerror = () => {
          // Still mark as attempted to avoid retry loops
          preloadedRef.current.add(url);
          resolve();
        };
        
        img.src = url;
      });
    };

    // Preload high-priority images immediately
    const highPriorityPromises = highPriorityUrls.map(url => preloadImage(url, 'high'));

    // After high-priority images start loading, queue the rest
    Promise.all(highPriorityPromises).then(() => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleBackgroundPreload = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 2000 });
        } else {
          setTimeout(callback, 100);
        }
      };

      scheduleBackgroundPreload(() => {
        // Preload remaining images that aren't high priority
        const remainingUrls = allUrls.filter(url => !highPriorityUrls.includes(url));
        remainingUrls.forEach(url => preloadImage(url, 'low'));
      });
    });
  }, [highPriorityUrls, allUrls]);
}
