import { useEffect, useMemo, useRef } from 'react';
import rawLipsHtml from '@legacy/pages/categories/lips.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/lips.css?inline';

const Lips = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawLipsHtml), []);

  useEffect(() => {
    document.title = 'Lips & Cheeks - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'lips-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Lips;

