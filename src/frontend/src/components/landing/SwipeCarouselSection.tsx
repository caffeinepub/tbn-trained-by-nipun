import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tbnCopy } from '../../content/tbnCopy';
import { carouselAssets } from './assets';
import { useAutoAdvanceCarousel } from '../../hooks/useAutoAdvanceCarousel';
import MediaFrame from './MediaFrame';

interface SwipeCarouselSectionProps {
  initialSlide?: number;
  autoAdvance?: boolean;
}

export default function SwipeCarouselSection({ 
  initialSlide = 0,
  autoAdvance = true 
}: SwipeCarouselSectionProps) {
  const totalSlides = tbnCopy.carousel.slides.length;
  const { currentIndex, goToSlide, nextSlide, prevSlide, pauseAutoAdvance, resumeAutoAdvance } = 
    useAutoAdvanceCarousel(totalSlides, autoAdvance ? 5000 : 0, initialSlide);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    pauseAutoAdvance();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.pageX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setTranslateX(0);
    resumeAutoAdvance();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].pageX);
    pauseAutoAdvance();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].pageX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setTranslateX(0);
    resumeAutoAdvance();
  };

  return (
    <section 
      id="features" 
      className="pt-4 pb-8 md:pt-8 md:pb-16 bg-black md:min-h-[90vh] flex flex-col justify-center overflow-x-hidden max-w-full"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={resumeAutoAdvance}
    >
      <div className="w-full max-w-full flex-1 flex flex-col justify-center py-4 overflow-x-hidden">
        <div className="mx-auto max-w-4xl w-full px-4">
          {/* App Features Heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400">
              App Features
            </h2>
          </div>

          {/* Carousel Container - Horizontally scrollable wrapper with animated arrow indicator */}
          <div className="carousel-scroll-container w-full max-w-full relative">
            {/* Animated arrow indicator on the right */}
            <div 
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 pr-2"
              aria-hidden="true"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-black/80 to-yellow-400/20 border border-yellow-400/30 shadow-lg animate-nudge-right">
                <ChevronRight className="h-5 w-5 text-yellow-400" />
              </div>
            </div>

            <div
              className="relative cursor-grab active:cursor-grabbing select-none w-full max-w-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Slides wrapper - constrained flex container */}
              <div className="relative w-full max-w-full overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out w-full"
                  style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`
                  }}
                >
                  {tbnCopy.carousel.slides.map((slide, index) => (
                    <div
                      key={index}
                      className="w-full max-w-full flex-shrink-0 min-w-0"
                      style={{ flex: '0 0 100%' }}
                      data-slide-index={index}
                      data-active={index === currentIndex ? 'true' : 'false'}
                    >
                      {/* Layout matching IMG_9310: large image on top, left-aligned text below */}
                      <div className="mx-auto max-w-md w-full">
                        <div className="flex flex-col gap-2 md:gap-3">
                          {/* Image at top - larger, taking more vertical space */}
                          <div 
                            className="w-full max-w-full flex items-center justify-center"
                            data-testid="carousel-image-container"
                          >
                            <div className="w-full max-w-full max-h-[65vh] flex items-center justify-center">
                              <MediaFrame
                                src={carouselAssets[index]}
                                alt={slide.title}
                                aspectRatio="9/16"
                                className="w-full max-w-full rounded-xl md:rounded-2xl"
                                wrapperClassName="rounded-xl md:rounded-2xl max-h-[65vh] max-w-full"
                                imgClassName="rounded-xl md:rounded-2xl"
                                objectFit="contain"
                                priority={index === currentIndex}
                              />
                            </div>
                          </div>

                          {/* Text content below image - left-aligned with consistent padding */}
                          <div className="space-y-2 md:space-y-3 px-2 w-full max-w-full">
                            {/* Title - left-aligned */}
                            <h3 
                              className="text-2xl md:text-3xl font-bold text-yellow-400 leading-tight break-words"
                              data-testid="carousel-slide-title"
                            >
                              {slide.emoji} {slide.title}
                            </h3>
                            
                            {/* Description - left-aligned with preserved line breaks and tighter leading */}
                            <p 
                              className="text-base md:text-lg text-white font-medium leading-snug whitespace-pre-line break-words"
                              data-testid="carousel-slide-description"
                            >
                              {slide.description}
                            </p>

                            {/* Bullet points - only if features exist, with larger yellow circular markers */}
                            {slide.features && slide.features.length > 0 && (
                              <ul className="space-y-2 md:space-y-2.5 pt-1 w-full" data-testid="carousel-bullet-list">
                                {slide.features.map((feature, i) => (
                                  <li 
                                    key={i} 
                                    className="flex items-start gap-3 text-base md:text-lg text-white w-full"
                                    data-testid="carousel-bullet-item"
                                  >
                                    <span className="flex-shrink-0 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400 mt-2" aria-hidden="true"></span>
                                    <span className="leading-snug break-words flex-1 min-w-0">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Tagline if present - left-aligned */}
                            {slide.tagline && (
                              <p className="text-base md:text-lg font-semibold text-yellow-400 pt-1 break-words leading-snug">
                                {slide.tagline}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls - Below Content */}
          <div className="flex items-center justify-center gap-4 pt-6 md:pt-8 w-full max-w-full">
            <div className="flex items-center gap-3 md:gap-4 bg-zinc-900/90 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-yellow-400/20 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  prevSlide();
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
                className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-yellow-400/20 hover:text-yellow-400 text-white flex-shrink-0"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>

              <div className="flex gap-1.5 md:gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      goToSlide(index);
                      pauseAutoAdvance();
                      setTimeout(resumeAutoAdvance, 3000);
                    }}
                    className={`h-1.5 md:h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black flex-shrink-0 ${
                      index === currentIndex
                        ? 'w-6 md:w-8 bg-yellow-400'
                        : 'w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  nextSlide();
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
                className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-yellow-400/20 hover:text-yellow-400 text-white flex-shrink-0"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
