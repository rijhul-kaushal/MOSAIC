import { useEffect, useMemo, useRef } from 'react';
import rawBrandsHtml from '@legacy/pages/brands.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import useSmoothScrollLinks from '@/hooks/useSmoothScrollLinks.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/brands.css?inline';

const brandsOffsetCalculator = () => {
  const headerHeight = document.querySelector('.main-header')?.offsetHeight ?? 0;
  const subNavHeight = document.querySelector('.sub-navbar')?.offsetHeight ?? 0;
  return headerHeight + subNavHeight + 20;
};

const Brands = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawBrandsHtml), []);

  useEffect(() => {
    document.title = 'Brands - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'brands-page');
  useLegacyLinkNavigation(pageRef);
  useSmoothScrollLinks(pageRef, '.sub-nav-links a', { offsetCalculator: brandsOffsetCalculator });

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Brands;

