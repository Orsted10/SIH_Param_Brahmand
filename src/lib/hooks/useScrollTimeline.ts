import { useEffect, useRef } from 'react';

export function useScrollTimeline() {
  const scrollProgress = useRef(0);
  const targetScrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        targetScrollProgress.current = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    let frameId: number;
    const update = () => {
      // Smooth interpolation (damping)
      scrollProgress.current += (targetScrollProgress.current - scrollProgress.current) * 0.08;
      
      // Update global CSS variable for typography/UI interpolation without React re-renders
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.current.toString());
      
      frameId = requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Return a getter function for Three.js animation loop to call directly without causing React renders
  return {
    getProgress: () => scrollProgress.current,
    getTargetProgress: () => targetScrollProgress.current
  };
}
