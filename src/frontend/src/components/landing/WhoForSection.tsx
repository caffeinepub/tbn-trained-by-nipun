import { Check } from 'lucide-react';
import { tbnCopy } from '../../content/tbnCopy';

export default function WhoForSection() {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {tbnCopy.whoFor.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {tbnCopy.whoFor.checklist.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-gold/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-gold" />
                  </div>
                </div>
                <p className="text-base md:text-lg text-foreground/90">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-6 pt-8">
            <div className="space-y-3">
              {tbnCopy.whoFor.noNeed.map((item, index) => (
                <p key={index} className="text-xl md:text-2xl font-semibold text-foreground">
                  {item}
                </p>
              ))}
            </div>

            <p className="text-2xl md:text-3xl font-bold text-gold pt-4">
              {tbnCopy.whoFor.justConsistency}
            </p>

            <p className="text-lg md:text-xl text-muted-foreground pt-6">
              {tbnCopy.whoFor.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
