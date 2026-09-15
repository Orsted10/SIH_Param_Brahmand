import React, { useEffect, useRef, useState } from 'react';

interface AnimatedHeadingProps {
  lines: string[];
  delay?: number;         // ms before animation starts
  charDelay?: number;     // ms between each character
  className?: string;
  style?: React.CSSProperties;
}

/**
 * VEX-style character-by-character animated heading (Prompt 7 spec)
 * Each character slides in from the left with a staggered delay.
 */
export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  lines,
  delay = 200,
  charDelay = 28,
  className = '',
  style,
}) => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  let globalIndex = 0;

  return (
    <div className={className} style={style}>
      {lines.map((line, li) => {
        const chars = Array.from(line);
        return (
          <div key={li} className="overflow-hidden block" style={{ whiteSpace: 'nowrap' }}>
            {chars.map((ch, ci) => {
              const idx = globalIndex++;
              const charMs = delay + idx * charDelay;
              const isSpace = ch === ' ';
              return (
                <span
                  key={ci}
                  className="inline-block"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? 'none' : 'translateX(-20px)',
                    transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${charMs}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${charMs}ms`,
                    whiteSpace: isSpace ? 'pre' : 'normal',
                  }}
                >
                  {isSpace ? '\u00a0' : ch}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

interface MaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Prompt 1 mask-reveal: text rises out from underneath a clipping rect.
 */
export const MaskReveal: React.FC<MaskRevealProps> = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ paddingTop: '0.15em', marginTop: '-0.15em' }}>
      <div
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;   // vertical offset in px
}

/**
 * Prompt 7 FadeIn component — opacity + optional Y translate.
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children, delay = 0, duration = 1000, className = '', y = 20,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-opacity transition-transform ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${y}px)`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </div>
  );
};

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Prompt 3 blur-reveal: blur-up entrance animation (like Lithos hero).
 */
export const BlurReveal: React.FC<BlurRevealProps> = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        filter: visible ? 'blur(0)' : 'blur(14px)',
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 1s ease ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
