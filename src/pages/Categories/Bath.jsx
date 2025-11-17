import { useEffect, useMemo, useRef } from 'react';
import rawBathHtml from '@legacy/pages/categories/bath.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/bath.css?inline';

const Bath = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawBathHtml), []);

  useEffect(() => {
    document.title = 'Bath & Body - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'bath-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Bath;

