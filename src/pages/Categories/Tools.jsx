import { useEffect, useMemo, useRef } from 'react';
import rawToolsHtml from '@legacy/pages/categories/tools.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/tools.css?inline';

const Tools = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawToolsHtml), []);

  useEffect(() => {
    document.title = 'Tools & Brushes - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'tools-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Tools;

