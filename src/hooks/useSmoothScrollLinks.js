import { useEffect } from 'react';

const defaultOffsetCalculator = () => {
  const headerHeight = document.querySelector('.main-header')?.offsetHeight ?? 0;
  return headerHeight + 20;
};

const useSmoothScrollLinks = (containerRef, selector, options = {}) => {
  const { additionalOffset = 0, offsetCalculator = defaultOffsetCalculator } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const links = container.querySelectorAll(selector);
    if (!links.length) {
      return undefined;
    }

    const handleClick = (event) => {
      const anchor = event.currentTarget;
      const href = anchor.getAttribute('href');

      if (!href || !href.startsWith('#')) {
        return;
      }

      event.preventDefault();
      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      const offset = offsetCalculator(container) + additionalOffset;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    };

    links.forEach((link) => link.addEventListener('click', handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener('click', handleClick));
    };
  }, [additionalOffset, containerRef, offsetCalculator, selector]);
};

export default useSmoothScrollLinks;

