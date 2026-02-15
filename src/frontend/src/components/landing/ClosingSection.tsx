import { tbnCopy } from '../../content/tbnCopy';
import TransformationsCarouselSection from './TransformationsCarouselSection';

export default function ClosingSection() {
  return (
    <>
      <section className="py-16 md:py-24 bg-card/50">
        <div className="mx-auto w-[95%] sm:w-[92%] max-w-7xl px-4 sm:px-6">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {tbnCopy.closing.headline}
            </h2>
            
            <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
              <div className="font-bold max-w-full break-words">
                {tbnCopy.closing.subheadline.line1}
              </div>
              <div className="font-bold text-center mt-2">
                {tbnCopy.closing.subheadline.line2}
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-lg md:text-xl text-foreground/90">
                {tbnCopy.closing.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Carousel - directly below the description */}
      <TransformationsCarouselSection />
    </>
  );
}
