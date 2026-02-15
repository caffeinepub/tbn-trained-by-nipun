# Specification

## Summary
**Goal:** Tighten the layout and typography in the landing page swipe carousel and add a subtle animated right-arrow hint to indicate users can swipe to the next slide.

**Planned changes:**
- In `frontend/src/components/landing/SwipeCarouselSection.tsx`, slightly reduce the vertical gap between the carousel image block and the carousel text block while keeping the image-above-text (mobile-first) flow and leaving all carousel copy unchanged.
- In `frontend/src/components/landing/SwipeCarouselSection.tsx`, slightly reduce line spacing (leading) within the carousel text block (title/description/bullets/tagline) without harming readability or causing collisions, and without changing any copy.
- In `frontend/src/components/landing/SwipeCarouselSection.tsx`, add a visually subtle, non-interactive, continuously animated right-side arrow indicator consistent with the black + gold theme that does not overlap slide content or existing controls, does not create horizontal overflow, and is marked as decorative for accessibility.

**User-visible outcome:** The carousel content appears tighter (less whitespace and slightly tighter text), and users see a subtle animated right-arrow hint indicating they can swipe/scroll to view the next slide.
