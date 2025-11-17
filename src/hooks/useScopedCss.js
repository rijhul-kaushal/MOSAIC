import { useEffect } from 'react';

const useScopedCss = (cssContent, key) => {
  useEffect(() => {
    if (!cssContent) {
      return undefined;
    }

    const styleElement = document.createElement('style');
    if (key) {
      styleElement.dataset.pageStyle = key;
    }
    styleElement.textContent = cssContent;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [cssContent, key]);
};

export default useScopedCss;

