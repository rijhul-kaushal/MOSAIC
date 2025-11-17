import { useEffect, useMemo, useRef } from 'react';
import rawNailsHtml from '@legacy/pages/categories/nails.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/nails.css?inline';

const Nails = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawNailsHtml), []);

  useEffect(() => {
    document.title = 'Nails - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'nails-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Nails;

