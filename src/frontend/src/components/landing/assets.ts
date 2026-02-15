export const carouselAssets = [
  '/assets/IMG_9308.jpeg', // Slide 1: Home Workouts
  '/assets/IMG_9284-1.jpeg', // Slide 2: Workout Videos
  '/assets/IMG_9292-1.jpeg', // Slide 3: Workout Tracker
  '/assets/IMG_9295-1.jpeg', // Slide 4: Calorie Tracker
  '/assets/IMG_9294-1.jpeg', // Slide 5: AI Food Scanner
  '/assets/IMG_9293-1.jpeg', // Slide 6: 200K+ Foods
  '/assets/IMG_9296-1.jpeg', // Slide 7: Activity Tracker
  '/assets/quality_restoration_20260214165854157-1.jpeg', // Slide 8: Body Scanner
];

// Development-only sanity check
if (import.meta.env.DEV) {
  const expectedSlideCount = 8;
  if (carouselAssets.length !== expectedSlideCount) {
    console.warn(
      `[Carousel Assets] Expected ${expectedSlideCount} assets but found ${carouselAssets.length}. ` +
      `This may cause layout issues if not aligned with tbnCopy.carousel.slides.`
    );
  }
}
