import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const isExternalLink = (href) => /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');

const useLegacyLinkNavigation = (containerRef) => {
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const handleClick = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#') || isExternalLink(href)) {
        return;
      }

      event.preventDefault();
      navigate(href);
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [containerRef, navigate]);
};

export default useLegacyLinkNavigation;

