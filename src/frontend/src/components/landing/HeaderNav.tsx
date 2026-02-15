import TbnLogo from './TbnLogo';

export default function HeaderNav() {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <a 
          href="#hero" 
          onClick={handleLogoClick}
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl"
        >
          <TbnLogo size="sm" />
        </a>
      </div>
    </header>
  );
}
