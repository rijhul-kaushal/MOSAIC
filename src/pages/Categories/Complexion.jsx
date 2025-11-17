import { useEffect, useMemo, useRef } from 'react';
import rawComplexionHtml from '@legacy/pages/categories/complexion.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/complexion.css?inline';

const Complexion = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawComplexionHtml), []);

  useEffect(() => {
    document.title = 'Complexion - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'complexion-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Complexion;

