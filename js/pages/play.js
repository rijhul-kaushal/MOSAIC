document.addEventListener('DOMContentLoaded', () => {
    const cardsGrid = document.getElementById('cardsGrid');
    const resetGameBtn = document.getElementById('resetGameBtn');
    const totalPlaysSpan = document.getElementById('totalPlays');
    const totalWinsSpan = document.getElementById('totalWins');

    const prizeModal = document.getElementById('prizeModal');
    const closeButton = prizeModal.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const prizeImage = document.getElementById('prizeImage');
    const collectPrizeBtn = document.getElementById('collectPrizeBtn');

    let totalPlays = parseInt(localStorage.getItem('scratchGamePlays') || '0');
    let totalWins = parseInt(localStorage.getItem('scratchGameWins') || '0');
    let gameActive = true;
    let cardRevealed = false; // To track if a card has been scratched in the current round

    const prizes = [
        { name: "15% Off Next Order", img: "../assets/images/play/prize_15_off.png", type: "discount" },
        { name: "Free Full-Size Product", img: "../assets/images/play/prize_full_size.png", type: "product" },
        { name: "Free Shipping", img: "../assets/images/play/prize_free_shipping.png", type: "discount" },
        { name: "Try a New Sample", img: "../assets/images/play/prize_sample.png", type: "sample" },
        { name: "20% Off Select Items", img: "../assets/images/play/prize_20_off.png", type: "discount" },
        { name: "No Prize This Time!", img: "../assets/images/play/prize_no_win.png", type: "lose" }, // Losing prize
        { name: "Free Beauty Consultation", img: "../assets/images/play/prize_consultation.png", type: "service" },
        { name: "50 Bonus Reward Points", img: "../assets/images/play/prize_points.png", type: "points" },
        { name: "Exclusive Tutorial Access", img: "../assets/images/play/prize_tutorial.png", type: "access" }
    ];

    function updateStats() {
        totalPlaysSpan.textContent = totalPlays;
        totalWinsSpan.textContent = totalWins;
        localStorage.setItem('scratchGamePlays', totalPlays);
        localStorage.setItem('scratchGameWins', totalWins);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeGame() {
        cardsGrid.innerHTML = ''; // Clear existing cards
        gameActive = true;
        cardRevealed = false; // Reset for new game
        totalPlays++;
        updateStats();

        // Shuffle prizes and assign to cards
        const shuffledPrizes = shuffleArray([...prizes]); // Clone and shuffle prizes

        for (let i = 0; i < 9; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.prizeIndex = i; // Store original index if needed, or prize type
            
            // Assign a specific prize to this card
            const prize = shuffledPrizes[i];
            
            // Create and append prize image, keep it hidden initially
            const prizeImgElement = document.createElement('img');
            prizeImgElement.src = prize.img;
            prizeImgElement.alt = prize.name;
            prizeImgElement.style.display = 'none'; // Initially hidden
            card.appendChild(prizeImgElement);

            card.addEventListener('click', () => revealCard(card, prize));
            cardsGrid.appendChild(card);
        }
    }

    function revealCard(clickedCard, prize) {
        if (!gameActive || cardRevealed) return; // Only one card can be scratched per round

        clickedCard.classList.add('revealed');
        clickedCard.querySelector('img').style.display = 'block'; // Show the prize image
        cardRevealed = true; // Mark a card as revealed

        // Handle prize logic
        if (prize.type !== 'lose') {
            totalWins++;
            updateStats();
            modalTitle.textContent = "Congratulations!";
            modalMessage.textContent = `You won: ${prize.name}!`;
            collectPrizeBtn.style.display = 'block'; // Show collect button for wins
        } else {
            modalTitle.textContent = "Better Luck Next Time!";
            modalMessage.textContent = `You won: ${prize.name}. Don't worry, every play earns you rewards points!`;
            collectPrizeBtn.style.display = 'none'; // Hide collect button for losses
        }
  

        prizeModal.style.display = 'flex'; // Show modal
        gameActive = false; // End the current round
    }

    function closeModal() {
        prizeModal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == prizeModal) {
            closeModal();
        }
    });

    collectPrizeBtn.addEventListener('click', () => {
        // Here you would implement logic to "collect" the prize,
        // e.g., add discount code to user account, credit points, etc.
        showNotification("Prize collected! Check your email or account for details.");
        closeModal();
        // Optionally, reset the game automatically after collecting a prize
        // initializeGame(); 
    });

    resetGameBtn.addEventListener('click', initializeGame);

    // Initial game setup when page loads
    updateStats(); // Display initial stats before the first game increments play count
    // Decrement totalPlays here, as initializeGame will increment it again.
    // This makes sure the first game's 'play' is counted when a fresh game starts on page load.
    totalPlays = Math.max(0, totalPlays - 1); 
    initializeGame();
});

// Helper for temporary notifications (copied from global.js or similar)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification'; // Reusing class name
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: linear-gradient(135deg, var(--primary-color, #3F0A29), var(--twilight-lavender, #94426A));
        color: white; padding: 1rem 2rem; border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 1001; font-weight: 600;
        transform: translateX(120%); transition: transform 0.4s ease-in-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => { if (notification.parentNode) notification.remove(); }, 400);
    }, 3000);
}