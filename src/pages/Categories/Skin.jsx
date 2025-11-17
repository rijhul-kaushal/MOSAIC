import { useEffect, useMemo, useRef } from 'react';
import rawSkinHtml from '@legacy/pages/categories/skin.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/skin.css?inline';

const Skin = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawSkinHtml), []);

  useEffect(() => {
    document.title = 'Skin - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'skin-page');
  useCategoryInteractions(pageRef);
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Skin;

