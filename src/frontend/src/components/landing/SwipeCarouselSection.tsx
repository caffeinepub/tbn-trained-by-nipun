import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tbnCopy } from '../../content/tbnCopy';
import { carouselAssets } from './assets';
import { useAutoAdvanceCarousel } from '../../hooks/useAutoAdvanceCarousel';
import MediaFrame from './MediaFrame';

export default function SwipeCarouselSection() {
  const totalSlides = tbnCopy.carousel.slides.length;
  const { currentIndex, goToSlide, nextSlide, prevSlide, pauseAutoAdvance, resumeAutoAdvance } = 
    useAutoAdvanceCarousel(totalSlides, 5000);

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
      className="scroll-mt-16 py-16 md:py-24 bg-gradient-to-b from-background to-card/30"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={resumeAutoAdvance}
    >
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="relative overflow-hidden">
            {/* Carousel Container */}
            <div
              className="relative h-[700px] md:h-[800px] lg:h-[900px] cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {tbnCopy.carousel.slides.map((slide, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(calc(${offset * 100}% + ${translateX}px))`,
                      opacity: isActive ? 1 : 0.3,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="h-full flex flex-col">
                      {/* Image */}
                      <div className="flex-1 flex items-center justify-center px-4 md:px-8 pt-4">
                        <MediaFrame
                          src={carouselAssets[index]}
                          alt={slide.title}
                          aspectRatio="9/19.5"
                          className="max-w-sm w-full h-full"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 space-y-4 bg-gradient-to-t from-card/80 to-transparent backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl md:text-4xl">{slide.emoji}</span>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                            {slide.title}
                          </h3>
                        </div>
                        
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {slide.description}
                        </p>

                        {slide.features && (
                          <ul className="space-y-2 pt-2">
                            {slide.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm md:text-base text-foreground/80">
                                <span className="text-gold mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <p className="text-base md:text-lg font-medium text-gold pt-2">
                          {slide.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background/90 backdrop-blur-sm rounded-full px-6 py-3 border border-gold/20 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  prevSlide();
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
                className="h-8 w-8 rounded-full hover:bg-gold/20 hover:text-gold"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      goToSlide(index);
                      pauseAutoAdvance();
                      setTimeout(resumeAutoAdvance, 3000);
                    }}
                    className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                      index === currentIndex
                        ? 'w-8 bg-gold'
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
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
                className="h-8 w-8 rounded-full hover:bg-gold/20 hover:text-gold"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
