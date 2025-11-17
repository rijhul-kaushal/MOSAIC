import { useEffect, useMemo, useRef } from 'react';
import rawPlayHtml from '@legacy/pages/play.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/play.css?inline';

const prizes = [
  { name: '15% Off Next Order', img: '/assets/images/play/prize_15_off.png', type: 'discount' },
  { name: 'Free Full-Size Product', img: '/assets/images/play/prize_full_size.png', type: 'product' },
  { name: 'Free Shipping', img: '/assets/images/play/prize_free_shipping.png', type: 'discount' },
  { name: 'Try a New Sample', img: '/assets/images/play/prize_sample.png', type: 'sample' },
  { name: '20% Off Select Items', img: '/assets/images/play/prize_20_off.png', type: 'discount' },
  { name: 'No Prize This Time!', img: '/assets/images/play/prize_no_win.png', type: 'lose' },
  { name: 'Free Beauty Consultation', img: '/assets/images/play/prize_consultation.png', type: 'service' },
  { name: '50 Bonus Reward Points', img: '/assets/images/play/prize_points.png', type: 'points' },
  { name: 'Exclusive Tutorial Access', img: '/assets/images/play/prize_tutorial.png', type: 'access' },
];

const showNotification = (message) => {
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
  }, 100);

  window.setTimeout(() => {
    notification.style.transform = 'translateX(120%)';
    window.setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400);
  }, 3000);
};

const Play = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawPlayHtml), []);

  useEffect(() => {
    document.title = 'Play & Win - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'play-page');
  useLegacyLinkNavigation(pageRef);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    const cardsGrid = container.querySelector('#cardsGrid');
    const resetGameBtn = container.querySelector('#resetGameBtn');
    const totalPlaysSpan = container.querySelector('#totalPlays');
    const totalWinsSpan = container.querySelector('#totalWins');
    const prizeModal = container.querySelector('#prizeModal');
    const closeButton = prizeModal?.querySelector('.close-button');
    const modalTitle = container.querySelector('#modalTitle');
    const modalMessage = container.querySelector('#modalMessage');
    const prizeImage = container.querySelector('#prizeImage');
    const collectPrizeBtn = container.querySelector('#collectPrizeBtn');

    if (!cardsGrid || !resetGameBtn || !totalPlaysSpan || !totalWinsSpan || !prizeModal || !closeButton) {
      return undefined;
    }

    let totalPlays = Number.parseInt(window.localStorage.getItem('scratchGamePlays') || '0', 10);
    let totalWins = Number.parseInt(window.localStorage.getItem('scratchGameWins') || '0', 10);
    let gameActive = true;
    let cardRevealed = false;

    const updateStats = () => {
      totalPlaysSpan.textContent = totalPlays.toString();
      totalWinsSpan.textContent = totalWins.toString();
      window.localStorage.setItem('scratchGamePlays', totalPlays.toString());
      window.localStorage.setItem('scratchGameWins', totalWins.toString());
    };

    const shuffleArray = (array) => {
      const clone = [...array];
      for (let i = clone.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
      }
      return clone;
    };

    const closeModal = () => {
      prizeModal.style.display = 'none';
    };

    const revealCard = (card, prize) => {
      if (!gameActive || cardRevealed) {
        return;
      }

      card.classList.add('revealed');
      const img = card.querySelector('img');
      if (img) {
        img.style.display = 'block';
      }

      cardRevealed = true;

      if (prize.type !== 'lose') {
        totalWins += 1;
        updateStats();
        if (collectPrizeBtn) {
          collectPrizeBtn.style.display = 'block';
        }
        if (modalTitle) {
          modalTitle.textContent = 'Congratulations!';
        }
        if (modalMessage) {
          modalMessage.textContent = `You won: ${prize.name}!`;
        }
      } else {
        if (collectPrizeBtn) {
          collectPrizeBtn.style.display = 'none';
        }
        if (modalTitle) {
          modalTitle.textContent = 'Better Luck Next Time!';
        }
        if (modalMessage) {
          modalMessage.textContent = `You won: ${prize.name}. Don't worry, every play earns you rewards points!`;
        }
      }

      // if (prizeImage) {
      //   prizeImage.src = prize.img;
      //   prizeImage.alt = prize.name;
      // }

      prizeModal.style.display = 'flex';
      gameActive = false;
    };

    const initializeGame = () => {
      cardsGrid.innerHTML = '';
      gameActive = true;
      cardRevealed = false;
      totalPlays += 1;
      updateStats();

      const shuffledPrizes = shuffleArray(prizes);
      for (let i = 0; i < 9; i += 1) {
        const card = document.createElement('div');
        card.className = 'card';
        const prize = shuffledPrizes[i];

        const prizeImageElement = document.createElement('img');
        prizeImageElement.src = prize.img;
        prizeImageElement.alt = prize.name;
        prizeImageElement.style.display = 'none';
        card.appendChild(prizeImageElement);

        const handleCardClick = () => revealCard(card, prize);
        card.addEventListener('click', handleCardClick);

        cardsGrid.appendChild(card);
      }
    };

    const handleCollectPrize = () => {
      showNotification('Prize collected! Check your email or account for details.');
      closeModal();
    };

    const handleModalClick = (event) => {
      if (event.target === prizeModal) {
        closeModal();
      }
    };

    closeButton.addEventListener('click', closeModal);
    prizeModal.addEventListener('click', handleModalClick);
    resetGameBtn.addEventListener('click', initializeGame);
    collectPrizeBtn?.addEventListener('click', handleCollectPrize);

    updateStats();
    totalPlays = Math.max(0, totalPlays - 1);
    initializeGame();

    return () => {
      closeButton.removeEventListener('click', closeModal);
      prizeModal.removeEventListener('click', handleModalClick);
      resetGameBtn.removeEventListener('click', initializeGame);
      collectPrizeBtn?.removeEventListener('click', handleCollectPrize);
    };
  }, []);

  return (
    <div className="page-background-wrapper">
      <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Play;