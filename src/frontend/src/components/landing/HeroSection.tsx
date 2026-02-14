import { tbnCopy } from '../../content/tbnCopy';
import TbnLogo from './TbnLogo';

export default function HeroSection() {
  return (
    <section id="hero" className="scroll-mt-16 relative overflow-hidden bg-gradient-to-b from-background via-background to-card/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <TbnLogo size="xl" />
          </div>

          {/* Problem Statement */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {tbnCopy.hero.problem.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {tbnCopy.hero.problem.description}
            </p>
          </div>

          {/* Truth Statement */}
          <div className="space-y-3 py-6">
            <p className="text-xl md:text-2xl font-semibold text-gold">
              {tbnCopy.hero.truth}
            </p>
            <p className="text-lg md:text-xl text-foreground/90">
              {tbnCopy.hero.solution}
            </p>
          </div>

          {/* Supporting Line */}
          <p className="text-base md:text-lg text-muted-foreground italic">
            {tbnCopy.hero.supportingLine}
          </p>

          {/* Main Headline */}
          <div className="space-y-3 pt-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
              {tbnCopy.hero.headline}
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80">
              {tbnCopy.hero.subheadline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
