import { useEffect, useMemo, useRef } from 'react';
import rawHairHtml from '@legacy/pages/categories/hair.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/hair.css?inline';

const Hair = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawHairHtml), []);

  useEffect(() => {
    document.title = 'Hair - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'hair-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Hair;

