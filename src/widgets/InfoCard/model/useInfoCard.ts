import { useEffect, useState } from 'react';

export const useInfoCard = (initialValue: number) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      const htmlHasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(htmlHasDarkClass || media.matches);
    };

    updateTheme();
    media.addEventListener('change', updateTheme);

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      media.removeEventListener('change', updateTheme);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let frame: number;
    const duration = 1000;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * initialValue);
      setAnimatedValue(current);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [initialValue]);

  return { animatedValue, isDark };
};