import { tbnCopy } from '../../content/tbnCopy';
import MediaFrame from './MediaFrame';

export default function AppSection() {
  return (
    <section id="app" className="scroll-mt-16 py-16 md:py-24 bg-card/30">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground">
            {tbnCopy.app.title}
          </h2>

          <div className="flex justify-center">
            <MediaFrame 
              src="/assets/IMG_9304.jpeg" 
              alt="TBN App Dashboard"
              aspectRatio="9/19.5"
              className="max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
