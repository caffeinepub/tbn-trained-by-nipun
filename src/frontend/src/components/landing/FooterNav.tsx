import { Heart } from 'lucide-react';
import TbnLogo from './TbnLogo';

export default function FooterNav() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'tbn-app';

  const navLinks = [
    { label: 'App', href: '#app' },
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <TbnLogo size="md" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Your Complete Fitness Ecosystem. Made for busy people who want to get fit without going to the gym.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors focus-visible:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Attribution */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Built With</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Built with <Heart className="h-4 w-4 text-gold fill-gold" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-xs text-center text-muted-foreground">
            © {currentYear} TBN (Trained By Nipun). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
