import { useMemo } from 'react';
import HeaderNav from '../components/landing/HeaderNav';
import HeroSection from '../components/landing/HeroSection';
import SwipeCarouselSection from '../components/landing/SwipeCarouselSection';
import ClosingSection from '../components/landing/ClosingSection';
import TrustedBySection from '../components/landing/TrustedBySection';
import WhoForSection from '../components/landing/WhoForSection';
import FaqSection from '../components/landing/FaqSection';
import FooterNav from '../components/landing/FooterNav';
import { useLandingImagePreload } from '../hooks/useLandingImagePreload';
import { carouselAssets, transformationAssets } from '../components/landing/assets';

export default function TbnLandingPage() {
  // Build preload lists
  const { highPriorityUrls, allUrls } = useMemo(() => {
    const heroImage = '/assets/IMG_9304.jpeg';
    const firstCarouselImage = carouselAssets[0];
    
    // High priority: hero + first carousel slide
    const highPriority = [heroImage, firstCarouselImage];
    
    // All images: hero + carousel + transformations
    const all = [
      heroImage,
      ...carouselAssets,
      ...transformationAssets.map(t => t.src)
    ];
    
    return {
      highPriorityUrls: highPriority,
      allUrls: all
    };
  }, []);

  // Preload images on mount
  useLandingImagePreload({ highPriorityUrls, allUrls });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
      <HeaderNav />
      <main className="overflow-x-hidden max-w-full">
        <HeroSection />
        <SwipeCarouselSection />
        <ClosingSection />
        <TrustedBySection />
        <WhoForSection />
        <FaqSection />
      </main>
      <FooterNav />
    </div>
  );
}
