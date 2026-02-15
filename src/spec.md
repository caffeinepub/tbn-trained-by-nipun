# Specification

## Summary
**Goal:** Improve landing-page perceived performance and reliability by preloading images on first load, reducing “Image unavailable” occurrences, and optimizing landing-page image bytes without changing URLs.

**Planned changes:**
- Preload all landing-page image URLs referenced in `frontend/src/components/landing/assets.ts` plus the hero image (`/assets/IMG_9304.jpeg`) on initial page open, prioritizing above-the-fold images and deferring the rest to idle/background time so first paint is not blocked.
- Make `MediaFrame` image loading more resilient by automatically retrying once on failure using a cache-busting URL parameter, then showing the existing error overlay only if the retry fails, with a user action to retry again.
- Recompress/optimize the static landing-page image files to reduce total bytes while keeping all existing image paths/URLs unchanged.

**User-visible outcome:** Landing-page carousel and transformation images are already cached before swiping, fewer images get stuck on “Image unavailable,” and the landing page loads faster with the same visuals and URLs.
