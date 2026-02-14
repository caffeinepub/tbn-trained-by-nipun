interface TbnLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-10',
  md: 'h-16',
  lg: 'h-24 md:h-28',
  xl: 'h-32 md:h-40 lg:h-48',
};

export default function TbnLogo({ size = 'md', className = '' }: TbnLogoProps) {
  return (
    <div className={`tbn-logo-frame inline-block ${className}`}>
      <img 
        src="/assets/IMG_7410.jpeg" 
        alt="TBN Logo" 
        className={`${sizeMap[size]} w-auto object-contain`}
      />
    </div>
  );
}
