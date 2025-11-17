import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import rawYourShadeHtml from '@legacy/pages/yourshade.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/yourshade.css?inline';

const shadeData = {
  'Light-Cool': { name: '110C Porcelain Glow', img: '/assets/images/find-my-shade/110C.jpeg' },
  'Light-Neutral': { name: '120N Vanilla Veil', img: '/assets/images/find-my-shade/120N.jpeg' },
  'Light-Warm': { name: '130W Soft Cream', img: '/assets/images/find-my-shade/130W.jpeg' },
  'Medium-Cool': { name: '240C Rosy Petal', img: '/assets/images/find-my-shade/240C.jpeg' },
  'Medium-Neutral': { name: '250N Golden Sand', img: '/assets/images/find-my-shade/250N.jpeg' },
  'Medium-Warm': { name: '260W Honey Beige', img: '/assets/images/find-my-shade/260W.jpeg' },
  'Medium Deep-Cool': { name: '420C Mocha Rose', img: '/assets/images/find-my-shade/420C.jpeg' },
  'Medium Deep-Neutral': { name: '425N Caramel Beige', img: '/assets/images/find-my-shade/425N.jpeg' },
  'Medium Deep-Warm': { name: '430W Amber Honey', img: '/assets/images/find-my-shade/430W.jpeg' },
};

const createNotification = (message) => {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--primary-color, #3F0A29), var(--twilight-lavender, #94426A));
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    font-weight: 600;
    transform: translateX(120%);
    transition: transform 0.4s ease-in-out;
  `;

  document.body.appendChild(notification);
  window.setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 50);

  window.setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    window.setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400);
  }, 3000);
};

const YourShade = () => {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const content = useMemo(() => transformLegacyHtml(rawYourShadeHtml), []);

  useEffect(() => {
    document.title = 'Your Shade - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'yourshade-page');
  useLegacyLinkNavigation(pageRef);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    const tone = window.localStorage.getItem('selectedTone') ?? 'Medium';
    const undertone = window.localStorage.getItem('selectedUndertone') ?? 'Neutral';
    const key = `${tone}-${undertone}`;
    const result = shadeData[key];

    const shadeNameElement = container.querySelector('#shadeName');
    const shadeImageElement = container.querySelector('#shadeImage');
    const backButton = container.querySelector('#backBtn');
    const finishButton = container.querySelector('#finishBtn');

    if (result) {
      if (shadeNameElement) {
        shadeNameElement.textContent = result.name;
      }
      if (shadeImageElement) {
        shadeImageElement.src = result.img;
        shadeImageElement.style.display = 'block';
      }
    } else {
      if (shadeNameElement) {
        shadeNameElement.textContent = 'No match found';
      }
      if (shadeImageElement) {
        shadeImageElement.style.display = 'none';
      }
    }

    const handleBack = (event) => {
      event.preventDefault();
      navigate('/find-my-shade/undertone');
    };

    const handleFinish = (event) => {
      event.preventDefault();
      createNotification('Thank you! Your perfect shade has been found 💕');
      window.setTimeout(() => {
        navigate('/');
      }, 2000);
    };

    if (backButton) {
      backButton.addEventListener('click', handleBack);
    }

    if (finishButton) {
      finishButton.addEventListener('click', handleFinish);
    }

    return () => {
      if (backButton) {
        backButton.removeEventListener('click', handleBack);
      }
      if (finishButton) {
        finishButton.removeEventListener('click', handleFinish);
      }
    };
  }, [navigate]);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default YourShade;

