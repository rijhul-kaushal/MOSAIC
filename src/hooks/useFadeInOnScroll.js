import { useEffect } from 'react';

const useFadeInOnScroll = (containerRef, selector = '.fade-in', options = { threshold: 0.1 }) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const elements = container.querySelectorAll(selector);
    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      options,
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [containerRef, options, selector]);
};

export default useFadeInOnScroll;

