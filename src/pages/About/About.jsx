import { useEffect, useMemo, useRef } from 'react';
import rawAboutHtml from '@legacy/pages/about.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/about.css?inline'; // 1. Imports the CSS

const About = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawAboutHtml), []);

  useEffect(() => {
    document.title = 'About Us | Mosaic';
  }, []);

  useScopedCss(pageStyles, 'about-page'); // 2. Applies the CSS
  useLegacyLinkNavigation(pageRef);

  // 3. This block adds the counter animation JavaScript
  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;

    // Counter animation function from original file
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 16);
    }

    // Start animation when component is ready
    const counters = container.querySelectorAll('.count');
    counters.forEach(counter => {
      animateCounter(counter);
    });

    // We don't need a cleanup function as the animation stops itself
  }, [content]); // Re-run when the HTML content is injected

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default About;