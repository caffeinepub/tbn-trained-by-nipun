import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { transformationAssets } from './assets';
import { useAutoAdvanceCarousel } from '../../hooks/useAutoAdvanceCarousel';
import MediaFrame from './MediaFrame';

interface TransformationsCarouselSectionProps {
  initialSlide?: number;
  autoAdvance?: boolean;
}

export default function TransformationsCarouselSection({ 
  initialSlide = 0,
  autoAdvance = true 
}: TransformationsCarouselSectionProps) {
  const totalSlides = transformationAssets.length;
  const { currentIndex, goToSlide, nextSlide, prevSlide, pauseAutoAdvance, resumeAutoAdvance } = 
    useAutoAdvanceCarousel(totalSlides, autoAdvance ? 4000 : 0, initialSlide);

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
      className="py-4 md:py-6 bg-card/50 overflow-x-hidden max-w-full"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={resumeAutoAdvance}
    >
      <div className="w-full max-w-full">
        <div className="mx-auto w-full px-2 md:px-4">
          {/* Carousel Container */}
          <div className="carousel-scroll-container w-full max-w-full relative">
            {/* Animated arrow indicator on the right */}
            <div 
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
              aria-hidden="true"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-card/80 to-accent/20 border border-accent/30 shadow-lg animate-nudge-right">
                <ChevronRight className="h-5 w-5 text-accent" />
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
              {/* Slides wrapper */}
              <div className="relative w-full max-w-full overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out w-full"
                  style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`
                  }}
                >
                  {transformationAssets.map((item, index) => (
                    <div
                      key={index}
                      className="w-full max-w-full flex-shrink-0 min-w-0"
                      style={{ flex: '0 0 100%' }}
                      data-slide-index={index}
                      data-active={index === currentIndex ? 'true' : 'false'}
                    >
                      <div className="mx-auto w-full md:w-[90vw] lg:w-[85vw] xl:w-[80vw]">
                        <div className="flex flex-col gap-2 md:gap-3">
                          {/* Transformation Image */}
                          <div 
                            className="w-full max-w-full flex items-center justify-center"
                            data-testid="transformation-image-container"
                          >
                            <MediaFrame
                              src={item.src}
                              alt={item.name || 'Transformation'}
                              aspectRatio={null}
                              className="w-full max-w-full rounded-xl md:rounded-2xl"
                              wrapperClassName="rounded-xl md:rounded-2xl max-w-full"
                              imgClassName="rounded-xl md:rounded-2xl max-w-full h-auto"
                              objectFit="contain"
                              priority={index === currentIndex}
                            />
                          </div>

                          {/* Name Caption - only render if name is non-empty */}
                          {item.name && item.name.trim() && (
                            <div className="text-center px-2 w-full max-w-full">
                              <p 
                                className="text-xl md:text-2xl font-bold text-accent leading-tight break-words"
                                data-testid="transformation-name"
                              >
                                {item.name}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 pt-3 md:pt-4 w-full max-w-full">
            <div className="flex items-center gap-3 md:gap-4 bg-card/90 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-accent/20 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  prevSlide();
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
                className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-accent/20 hover:text-accent text-foreground flex-shrink-0"
                aria-label="Previous transformation"
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
                    className={`h-1.5 md:h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card flex-shrink-0 ${
                      index === currentIndex
                        ? 'w-6 md:w-8 bg-accent'
                        : 'w-1.5 md:w-2 bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Go to transformation ${index + 1}`}
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
                className="h-7 w-7 md:h-8 md:w-8 rounded-full hover:bg-accent/20 hover:text-accent text-foreground flex-shrink-0"
                aria-label="Next transformation"
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
