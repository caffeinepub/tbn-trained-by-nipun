import { tbnCopy } from '../../content/tbnCopy';

export default function ClosingSection() {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {tbnCopy.closing.headline}
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            {tbnCopy.closing.subheadline}
          </p>

          <div className="pt-6 space-y-4">
            <p className="text-lg md:text-xl text-foreground/90">
              {tbnCopy.closing.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
