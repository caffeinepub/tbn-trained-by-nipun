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

// Transformation photos carousel with names
export const transformationAssets = [
  { src: '/assets/quality_restoration_20260215131917797-1.jpeg', name: 'Dr. Sakshi' },
  { src: '/assets/IMG_1243-1.jpeg', name: 'Er. Shubham' },
  { src: '/assets/IMG_1245-1.jpeg', name: 'Bindiya - Working Woman' },
  { src: '/assets/IMG_1244-1.jpeg', name: 'Abha - Corporate Professional' },
  { src: '/assets/FA56354F-6223-4844-933C-9B9E7EA31806-1.jpeg', name: 'Uday - Manager' },
  { src: '/assets/B2F37900-801E-478B-8203-2D4D4B92106D-1.jpeg', name: 'Harshal - Business Owner' },
  { src: '/assets/quality_restoration_20251122155053193-1.jpeg', name: 'Dr. Gauri' },
  { src: '/assets/quality_restoration_20251124165416610-1.jpeg', name: 'Dr. Sagar' },
  { src: '/assets/B3597C3F-2850-43A4-9A43-BF060367A3AE-1.jpeg', name: 'Manmeet' },
  { src: '/assets/6D5D52B1-AC14-4525-B9C4-352D5C57C737-1.jpeg', name: 'Dr. Tushar' },
  { src: '/assets/A7B25DAD-D3CF-4A7B-ADAA-A2E73B9C018E-1.jpeg', name: 'Dr. Arun' },
  { src: '/assets/collage_export_7A9AC881-668E-423A-A8F3-B9B5C8A4B1BB-1.jpeg', name: 'Dr Gauri' },
  { src: '/assets/collage_export_8BBDEFED-8722-46B8-AD18-29A87123C7F9-1.jpeg', name: 'Vishal' },
  { src: '/assets/IMG_9331-1.jpeg', name: 'Sunny - Business owner' },
  { src: '/assets/IMG_9332.jpeg', name: 'Corporate Professional' },
  { src: '/assets/quality_restoration_20260215163855145.jpeg', name: 'Rupali - Operations Manager' },
  { src: '/assets/IMG_9339.jpeg', name: 'Navnoor - Business Owner' },
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

  // Guard against accidentally including removed transformation images
  const excludedTransformations = [
    '55FD9B9A-CD5A-430A-8AAE-0FB51B9B9E64-1.jpeg',
    'IMG_1955-1.jpeg'
  ];
  
  const hasExcludedImage = transformationAssets.some(item => 
    excludedTransformations.some(excluded => item.src.includes(excluded))
  );
  
  if (hasExcludedImage) {
    console.error(
      '[Transformation Assets] WARNING: Excluded transformation images detected! ' +
      'The following images should NOT be in transformationAssets: ' +
      excludedTransformations.join(', ')
    );
  }
}
