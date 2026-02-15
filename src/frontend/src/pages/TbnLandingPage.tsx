import HeroSection from '../components/landing/HeroSection';
import AppSection from '../components/landing/AppSection';
import SwipeCarouselSection from '../components/landing/SwipeCarouselSection';
import ClosingSection from '../components/landing/ClosingSection';
import TrustedBySection from '../components/landing/TrustedBySection';
import WhoForSection from '../components/landing/WhoForSection';
import FaqSection from '../components/landing/FaqSection';
import FooterNav from '../components/landing/FooterNav';

export default function TbnLandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
      <main className="overflow-x-hidden max-w-full">
        <HeroSection />
        <AppSection />
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
