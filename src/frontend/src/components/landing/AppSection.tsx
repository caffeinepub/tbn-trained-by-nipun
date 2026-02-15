import { tbnCopy } from '../../content/tbnCopy';
import MediaFrame from './MediaFrame';

export default function AppSection() {
  return (
    <section id="app" className="py-16 md:py-24 bg-card/30 overflow-x-hidden max-w-full">
      <div className="container max-w-full">
        <div className="mx-auto max-w-6xl w-full">
          {/* Text Block - Separate from Image */}
          <div className="mb-12 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground break-words">
              {tbnCopy.app.title}
            </h2>
          </div>

          {/* Image Block with Premium Frame */}
          <div className="flex justify-center px-4 w-full max-w-full">
            <div className="tbn-premium-frame max-w-md w-full">
              <MediaFrame 
                src="/assets/IMG_9304.jpeg" 
                alt="TBN App Dashboard"
                aspectRatio="9/16"
                className="w-full max-w-full"
                objectFit="contain"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
