import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import rawFindShadeHtml from '@legacy/pages/findshade.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/findshade.css?inline';

const FindShade = () => {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const content = useMemo(() => transformLegacyHtml(rawFindShadeHtml), []);

  useEffect(() => {
    document.title = 'Find My Shade - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'findshade-page');
  useLegacyLinkNavigation(pageRef);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    const slider = container.querySelector('#shadeSlider');
    const track = container.querySelector('#track');
    const carousel = container.querySelector('#carousel');
    const continueButton = container.querySelector('.continue-btn');
    const items = track ? Array.from(track.querySelectorAll('.shade-item')) : [];

    if (!slider || !track || !carousel || !continueButton || items.length === 0) {
      return undefined;
    }

    const getCurrentTranslateX = () => {
      const style = window.getComputedStyle(track);
      const matrix = style.transform || style.webkitTransform;

      if (matrix && matrix !== 'none') {
        const values = matrix.match(/matrix.*\((.+)\)/)[1].split(',').map((value) => value.trim());
        return parseFloat(values[4]);
      }

      return 0;
    };

    const centerIndex = (index) => {
      const item = items[index];
      if (!item) {
        return;
      }

      const carouselRect = carousel.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const carouselCenter = carouselRect.left + carouselRect.width / 2;
      const itemCenter = itemRect.left + itemRect.width / 2;
      const neededDelta = carouselCenter - itemCenter;
      const currentTranslate = getCurrentTranslateX();
      const newTranslate = currentTranslate + neededDelta;

      track.style.transform = `translateX(${newTranslate}px)`;
      items.forEach((element, idx) => {
        element.classList.toggle('active', idx === index);
      });
    };

    const handleSliderInput = () => {
      const index = Number.parseInt(slider.value, 10) - 1;
      centerIndex(index);
    };

    slider.addEventListener('input', handleSliderInput);

    let resizeTimer = 0;
    const handleResize = () => {
      const index = Number.parseInt(slider.value, 10) - 1;
      centerIndex(index);
    };

    const handleResizeDebounced = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(handleResize, 120);
    };

    window.addEventListener('resize', handleResizeDebounced);

    const initialise = () => {
      track.style.transform = 'translateX(0px)';
      requestAnimationFrame(() => {
        const index = Number.parseInt(slider.value, 10) - 1;
        centerIndex(index);
      });
    };

    initialise();

    const handleContinue = (event) => {
      event.preventDefault();
      const sliderValue = Number.parseInt(slider.value, 10);
      let tone = 'Medium';

      if (sliderValue <= 2) {
        tone = 'Light';
      } else if (sliderValue >= 5) {
        tone = 'Medium Deep';
      }

      window.localStorage.setItem('selectedTone', tone);
      navigate('/find-my-shade/undertone');
    };

    continueButton.addEventListener('click', handleContinue);

    return () => {
      slider.removeEventListener('input', handleSliderInput);
      window.removeEventListener('resize', handleResizeDebounced);
      continueButton.removeEventListener('click', handleContinue);
      window.clearTimeout(resizeTimer);
    };
  }, [navigate]);

  return <main ref={pageRef} className="shade-page-background" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default FindShade;

