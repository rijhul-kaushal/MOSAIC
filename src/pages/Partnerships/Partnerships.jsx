import { useEffect, useMemo, useRef } from 'react';
import rawPartnershipsHtml from '@legacy/pages/partnerships.html?raw';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/partnerships.css?inline';

const Partnerships = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawPartnershipsHtml), []);

  useEffect(() => {
    document.title = 'Partnerships - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'partnerships-page');
  useLegacyLinkNavigation(pageRef);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Partnerships;

