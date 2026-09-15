import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'reveal-mask' | 'zoom-in' | 'draw-line' | 'slide-right' | 'slide-left';
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  // Variant Classes
  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-12 blur-sm';
      case 'reveal-mask':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full';
      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100 filter-none'
          : 'opacity-0 scale-90 blur-sm';
      case 'draw-line':
        return isVisible
          ? 'scale-x-100 opacity-100'
          : 'scale-x-0 opacity-0 origin-left';
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-12';
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-12';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all cubic-bezier-[0.16,1,0.3,1] ${getVariantStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
