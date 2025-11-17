import { useEffect, useMemo, useRef } from 'react';
import rawRewardsHtml from '@legacy/pages/rewards.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import useFadeInOnScroll from '@/hooks/useFadeInOnScroll.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/rewards.css?inline';

const userData = {
  points: 2500,
  tier: 'Gold',
  referrals: 3,
  referralCode: 'MOSAIC2025',
};

const redemptionCosts = {
  'discount-5': 500,
  'discount-10': 1000,
  'discount-25': 2500,
  mascara: 800,
  lipstick: 1200,
  consultation: 1500,
  application: 2000,
  tutorial: 2500,
};

const rewardNames = {
  'discount-5': '$5 Off Discount',
  'discount-10': '$10 Off Discount',
  'discount-25': '$25 Off Discount',
  mascara: 'Free Mascara',
  lipstick: 'Free Lipstick',
  consultation: 'Free Makeup Consultation',
  application: 'Free Makeup Application',
  tutorial: 'Free Makeup Tutorial',
};

const createToast = (message, tone = 'success') => {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${tone === 'success' ? '#27ae60' : '#e74c3c'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 1001;
    font-weight: 600;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateX(120%);
    transition: transform 0.3s ease;
  `;
  toast.textContent = message;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  window.setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    window.setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 2500);
};

const Rewards = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawRewardsHtml), []);

  useEffect(() => {
    document.title = 'Rewards - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'rewards-page');
  useLegacyLinkNavigation(pageRef);
  useFadeInOnScroll(pageRef, '.overview-card, .tier-card, .reward-card, .earn-card');

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    let availablePoints = userData.points;
    const redeemedRewards = new Set();

    const pointsElement = container.querySelector('.hero-stats .stat-number');
    const tierElements = container.querySelectorAll('.hero-stats .stat-number');
    const referralStats = container.querySelectorAll('.referral-stat .stat-number');
    const referralCodeElement = container.querySelector('#referralCode');

    if (pointsElement) {
      pointsElement.textContent = userData.points.toLocaleString();
    }
    if (tierElements[1]) {
      tierElements[1].textContent = userData.tier;
    }
    if (referralStats[0]) {
      referralStats[0].textContent = userData.referrals.toString();
    }
    if (referralStats[1]) {
      referralStats[1].textContent = (userData.referrals * 500).toLocaleString();
    }
    if (referralCodeElement) {
      referralCodeElement.textContent = userData.referralCode;
    }

    const updatePointsDisplay = () => {
      if (pointsElement) {
        pointsElement.textContent = availablePoints.toLocaleString();
        pointsElement.style.animation = 'pulse 0.5s ease';
        window.setTimeout(() => {
          pointsElement.style.animation = '';
        }, 500);
      }
    };

    const filterButtons = Array.from(container.querySelectorAll('.filter-btn'));
    const rewardCards = Array.from(container.querySelectorAll('.reward-card'));

    const handleFilterClick = (button) => {
      const filter = button.getAttribute('data-filter');
      rewardCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;
        card.style.display = matches ? 'block' : 'none';
        if (matches) {
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        }
      });
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    };

    const filterHandlers = filterButtons.map((button) => {
      const handler = () => handleFilterClick(button);
      button.addEventListener('click', handler);
      return { button, handler };
    });

    const redeemButtons = Array.from(container.querySelectorAll('.redeem-btn'));

    const handleRedemption = (button) => {
      const rewardId = button.getAttribute('data-reward');
      const cost = redemptionCosts[rewardId];

      if (!cost) {
        return;
      }

      if (redeemedRewards.has(rewardId)) {
        createToast('You have already redeemed this reward.', 'error');
        return;
      }

      if (availablePoints < cost) {
        createToast(`You need ${cost} points to redeem this reward.`, 'error');
        return;
      }

      availablePoints -= cost;
      redeemedRewards.add(rewardId);
      updatePointsDisplay();

      button.textContent = 'Redeemed';
      button.disabled = true;
      button.style.background = '#ccc';
      button.style.cursor = 'not-allowed';

      createToast(`${rewardNames[rewardId] || 'Reward'} redeemed!`);

      const activityList = container.querySelector('.activity-list');
      if (activityList) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.style.animation = 'slideInRight 0.5s ease forwards';
        item.innerHTML = `
          <div class="activity-icon redeemed">
            <i class="fas fa-gift"></i>
          </div>
          <div class="activity-content">
            <h4>Reward Redeemed</h4>
            <p>${rewardNames[rewardId] || 'Reward'}</p>
            <span class="activity-points">-${cost} points</span>
            <span class="activity-date">Just now</span>
          </div>
        `;
        activityList.insertBefore(item, activityList.firstChild);
      }
    };

    const redeemHandlers = redeemButtons.map((button) => {
      const handler = () => handleRedemption(button);
      button.addEventListener('click', handler);
      return { button, handler };
    });

    const shareBtn = container.querySelector('#shareBtn');
    const copyBtn = container.querySelector('#copyBtn');

    const handleShare = async () => {
      const referralCode = userData.referralCode;
      const shareUrl = `${window.location.origin}?ref=${referralCode}`;
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Join Mosaic Rewards',
            text: 'Join me on Mosaic and earn 500 bonus points!',
            url: shareUrl,
          });
        } catch (error) {
          console.error('Share cancelled', error);
        }
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        createToast('Referral link copied to clipboard!');
      }
    };

    const handleCopyCode = async () => {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(userData.referralCode);
        createToast('Referral code copied to clipboard!');
      }
    };

    shareBtn?.addEventListener('click', handleShare);
    copyBtn?.addEventListener('click', handleCopyCode);

    return () => {
      filterHandlers.forEach(({ button, handler }) => button.removeEventListener('click', handler));
      redeemHandlers.forEach(({ button, handler }) => button.removeEventListener('click', handler));
      shareBtn?.removeEventListener('click', handleShare);
      copyBtn?.removeEventListener('click', handleCopyCode);
    };
  }, []);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Rewards;

