import { useEffect, useMemo, useRef } from 'react';
import rawTutorialsHtml from '@legacy/pages/tutorials.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import useFadeInOnScroll from '@/hooks/useFadeInOnScroll.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/tutorials.css?inline';

const Tutorials = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawTutorialsHtml), []);

  useEffect(() => {
    document.title = 'Tutorials - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'tutorials-page');
  useLegacyLinkNavigation(pageRef);
  useFadeInOnScroll(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Tutorials;

