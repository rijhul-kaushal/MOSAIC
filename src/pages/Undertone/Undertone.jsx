import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import rawUndertoneHtml from '@legacy/pages/undertone.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/undertone.css?inline';

const helpMarkup = `
      <div class="option warm">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="warm">
          <h3>WARM</h3>
          <p class="desc">My veins appear <strong>green</strong> or <strong>yellow gold jewelry</strong> looks best on me.</p>
        </label>
      </div>

      <div class="option neutral">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="neutral">
          <h3>NEUTRAL</h3>
          <p class="desc">My veins appear <strong>blue-green</strong> or <strong>all shades of jewelry</strong> look good on me.</p>
        </label>
      </div>

      <div class="option cool">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="cool">
          <h3>COOL</h3>
          <p class="desc">My veins appear <strong>purple</strong> or <strong>silver & platinum jewelry</strong> look best on me.</p>
        </label>
      </div>
`;

const Undertone = () => {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const content = useMemo(() => transformLegacyHtml(rawUndertoneHtml), []);

  useEffect(() => {
    document.title = 'Find My Undertone - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'undertone-page');
  useLegacyLinkNavigation(pageRef);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    const helpText = container.querySelector('#helpText');
    const mainText = container.querySelector('#mainText');
    const undertoneOptions = container.querySelector('#undertoneOptions');
    const prevBtn = container.querySelector('#prevBtn');
    const nextBtn = container.querySelector('#nextBtn');

    if (!helpText || !mainText || !undertoneOptions || !prevBtn || !nextBtn) {
      return undefined;
    }

    const defaultMarkup = undertoneOptions.innerHTML;
    let helpShown = false;

    const handleHelpClick = () => {
      if (!helpShown) {
        mainText.textContent =
          "Unsure? That’s OK! Just ask yourself: What color are the veins on my wrist? What tone of jewelry do I look best in?";
        undertoneOptions.innerHTML = helpMarkup;
        helpText.textContent = "I KNOW MY UNDERTONE";
        helpShown = true;
      } else {
        mainText.textContent = 'Choose the group that best represents your skin tone.';
        undertoneOptions.innerHTML = defaultMarkup;
        helpText.textContent = "HELP, I'M NOT SURE";
        helpShown = false;
      }
    };

    const handlePrev = (event) => {
      event.preventDefault();
      navigate('/find-my-shade');
    };

    const handleNext = (event) => {
      event.preventDefault();
      const selected = container.querySelector('input[name="undertone"]:checked');
      if (selected) {
        const undertoneValue = selected.value.charAt(0).toUpperCase() + selected.value.slice(1);
        window.localStorage.setItem('selectedUndertone', undertoneValue);
        navigate('/find-my-shade/your-shade');
      } else {
        window.alert('Please select an undertone');
      }
    };

    helpText.addEventListener('click', handleHelpClick);
    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    return () => {
      helpText.removeEventListener('click', handleHelpClick);
      prevBtn.removeEventListener('click', handlePrev);
      nextBtn.removeEventListener('click', handleNext);
    };
  }, [navigate]);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Undertone;

