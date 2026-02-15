import { tbnCopy } from '../../content/tbnCopy';

export default function TrustedBySection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold">
            {tbnCopy.trustedBy.title}
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            {tbnCopy.trustedBy.subtitle}
          </p>

          <div className="pt-6 space-y-6">
            <p className="text-base md:text-lg text-foreground/80">
              {tbnCopy.trustedBy.description}
            </p>

            <div className="grid gap-4 md:grid-cols-3 pt-4">
              {tbnCopy.trustedBy.values.map((value, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-lg font-semibold text-gold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
