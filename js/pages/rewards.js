/*
    Rewards Page JavaScript for Mosaic Project
    Handles rewards filtering, redemption, referral sharing, and interactive features
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize rewards system
    initializeRewards();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
});

function initializeRewards() {
    // Mock user data - in a real app, this would come from an API
    const userData = {
        points: 2500,
        tier: 'Gold',
        referrals: 3,
        referralCode: 'MOSAIC2025'
    };
    
    // Update UI with user data
    updateUserStats(userData);
    
    // Set up reward filtering
    setupRewardFiltering();
    
    // Set up redemption system
    setupRedemptionSystem();
}

function updateUserStats(userData) {
    // Update hero stats
    const pointsElement = document.querySelector('.hero-stats .stat-number');
    const tierElement = document.querySelectorAll('.hero-stats .stat-number')[1];
    
    if (pointsElement) pointsElement.textContent = userData.points.toLocaleString();
    if (tierElement) tierElement.textContent = userData.tier;
    
    // Update referral stats
    const referralCount = document.querySelector('.referral-stat .stat-number');
    const referralPoints = document.querySelectorAll('.referral-stat .stat-number')[1];
    
    if (referralCount) referralCount.textContent = userData.referrals;
    if (referralPoints) referralPoints.textContent = (userData.referrals * 500).toLocaleString();
    
    // Update referral code
    const referralCodeElement = document.getElementById('referralCode');
    if (referralCodeElement) referralCodeElement.textContent = userData.referralCode;
}

function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterRewards(filter);
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Redeem buttons
    const redeemButtons = document.querySelectorAll('.redeem-btn');
    redeemButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reward = this.getAttribute('data-reward');
            handleRedemption(reward, this);
        });
    });
    
    // Share referral button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareReferralLink);
    }
    
    // Copy referral code button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyReferralCode);
    }
    
    // Tier card interactions
    const tierCards = document.querySelectorAll('.tier-card');
    tierCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('current')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });
}

function setupRewardFiltering() {
    const rewardCards = document.querySelectorAll('.reward-card');
    
    // Store original display states
    rewardCards.forEach(card => {
        card.dataset.originalDisplay = card.style.display || 'block';
    });
}

function filterRewards(filter) {
    const rewardCards = document.querySelectorAll('.reward-card');
    
    rewardCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupRedemptionSystem() {
    // Mock available points
    let availablePoints = 2500;
    
    // Store redemption costs
    const redemptionCosts = {
        'discount-5': 500,
        'discount-10': 1000,
        'discount-25': 2500,
        'mascara': 800,
        'lipstick': 1200,
        'consultation': 1500,
        'application': 2000,
        'tutorial': 2500
    };
    
    // Store redemption state
    window.rewardsData = {
        availablePoints: availablePoints,
        redemptionCosts: redemptionCosts,
        redeemedRewards: []
    };
}

function handleRedemption(rewardId, buttonElement) {
    const rewardsData = window.rewardsData;
    const cost = rewardsData.redemptionCosts[rewardId];
    
    if (!cost) {
        console.error('Invalid reward ID:', rewardId);
        return;
    }
    
    if (rewardsData.availablePoints < cost) {
        showInsufficientPointsModal(cost);
        return;
    }
    
    // Check if already redeemed
    if (rewardsData.redeemedRewards.includes(rewardId)) {
        showAlreadyRedeemedModal();
        return;
    }
    
    // Show confirmation modal
    showRedemptionConfirmation(rewardId, cost, buttonElement);
}

function showRedemptionConfirmation(rewardId, cost, buttonElement) {
    const rewardNames = {
        'discount-5': '$5 Off Discount',
        'discount-10': '$10 Off Discount',
        'discount-25': '$25 Off Discount',
        'mascara': 'Free Mascara',
        'lipstick': 'Free Lipstick',
        'consultation': 'Free Makeup Consultation',
        'application': 'Free Makeup Application',
        'tutorial': 'Free Makeup Tutorial'
    };
    
    const modal = createModal(`
        <div style="text-align: center;">
            <div style="font-size: 4rem; color: var(--middle-purple); margin-bottom: 1rem;">🎁</div>
            <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Redeem Reward</h2>
            <p style="color: #666; margin-bottom: 2rem;">Are you sure you want to redeem <strong>${rewardNames[rewardId]}</strong> for <strong>${cost} points</strong>?</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="confirmRedemption" style="
                    background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">Yes, Redeem</button>
                <button id="cancelRedemption" style="
                    background: #ccc;
                    color: #666;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">Cancel</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('confirmRedemption').addEventListener('click', () => {
        processRedemption(rewardId, cost, buttonElement);
        modal.remove();
    });
    
    document.getElementById('cancelRedemption').addEventListener('click', () => {
        modal.remove();
    });
}

function processRedemption(rewardId, cost, buttonElement) {
    const rewardsData = window.rewardsData;
    
    // Update points
    rewardsData.availablePoints -= cost;
    rewardsData.redeemedRewards.push(rewardId);
    
    // Update UI
    updatePointsDisplay(rewardsData.availablePoints);
    updateButtonState(buttonElement, true);
    
    // Show success message
    showRedemptionSuccess(rewardId);
    
    // Add to activity list
    addActivityItem('redeemed', rewardId, cost);
}

function updatePointsDisplay(points) {
    const pointsElement = document.querySelector('.hero-stats .stat-number');
    if (pointsElement) {
        pointsElement.textContent = points.toLocaleString();
        
        // Add animation
        pointsElement.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            pointsElement.style.animation = '';
        }, 500);
    }
}

function updateButtonState(buttonElement, redeemed) {
    if (redeemed) {
        buttonElement.textContent = 'Redeemed';
        buttonElement.disabled = true;
        buttonElement.style.background = '#ccc';
        buttonElement.style.cursor = 'not-allowed';
    }
}

function showRedemptionSuccess(rewardId) {
    const rewardNames = {
        'discount-5': '$5 Off Discount',
        'discount-10': '$10 Off Discount',
        'discount-25': '$25 Off Discount',
        'mascara': 'Free Mascara',
        'lipstick': 'Free Lipstick',
        'consultation': 'Free Makeup Consultation',
        'application': 'Free Makeup Application',
        'tutorial': 'Free Makeup Tutorial'
    };
    
    const modal = createModal(`
        <div style="text-align: center;">
            <div style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;">✓</div>
            <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Reward Redeemed!</h2>
            <p style="color: #666; margin-bottom: 2rem;">Your <strong>${rewardNames[rewardId]}</strong> has been added to your account. Check your email for details.</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 3000);
}

function showInsufficientPointsModal(requiredPoints) {
    const modal = createModal(`
        <div style="text-align: center;">
            <div style="font-size: 4rem; color: #e74c3c; margin-bottom: 1rem;">⚠</div>
            <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Insufficient Points</h2>
            <p style="color: #666; margin-bottom: 2rem;">You need <strong>${requiredPoints} points</strong> to redeem this reward. Keep shopping to earn more points!</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showAlreadyRedeemedModal() {
    const modal = createModal(`
        <div style="text-align: center;">
            <div style="font-size: 4rem; color: #f39c12; margin-bottom: 1rem;">ℹ</div>
            <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Already Redeemed</h2>
            <p style="color: #666; margin-bottom: 2rem;">You have already redeemed this reward. Check your email for details.</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        margin: 0 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    modalContent.innerHTML = content;
    modal.appendChild(modalContent);
    
    return modal;
}

function shareReferralLink() {
    const referralCode = document.getElementById('referralCode').textContent;
    const shareUrl = `${window.location.origin}?ref=${referralCode}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Join Mosaic Rewards',
            text: 'Join me on Mosaic and earn 500 bonus points!',
            url: shareUrl
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(shareUrl);
        showCopySuccess('Referral link copied to clipboard!');
    }
}

function copyReferralCode() {
    const referralCode = document.getElementById('referralCode').textContent;
    copyToClipboard(referralCode);
    showCopySuccess('Referral code copied to clipboard!');
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showCopySuccess(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1001;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function addActivityItem(type, rewardId, points) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const rewardNames = {
        'discount-5': '$5 Off Discount',
        'discount-10': '$10 Off Discount',
        'discount-25': '$25 Off Discount',
        'mascara': 'Free Mascara',
        'lipstick': 'Free Lipstick',
        'consultation': 'Free Makeup Consultation',
        'application': 'Free Makeup Application',
        'tutorial': 'Free Makeup Tutorial'
    };
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.style.animation = 'slideInRight 0.5s ease forwards';
    
    activityItem.innerHTML = `
        <div class="activity-icon ${type}">
            <i class="fas fa-${type === 'earned' ? 'plus' : 'gift'}"></i>
        </div>
        <div class="activity-content">
            <h4>${type === 'earned' ? 'Points Earned' : 'Reward Redeemed'}</h4>
            <p>${rewardNames[rewardId] || 'Reward'}</p>
            <span class="activity-points">${type === 'earned' ? '+' : '-'}${points} points</span>
            <span class="activity-date">Just now</span>
        </div>
    `;
    
    // Insert at the top of the activity list
    activityList.insertBefore(activityItem, activityList.firstChild);
}

function initializeAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.overview-card, .tier-card, .reward-card, .earn-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});