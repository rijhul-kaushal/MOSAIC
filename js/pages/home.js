document.addEventListener('DOMContentLoaded', () => {
    // --- Keep existing video start time logic ---
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.currentTime = 3; 
    }

    // --- NEW: Add to Cart Functionality for Bestsellers ---
    const bestsellerSection = document.getElementById('bestsellers');
    if (bestsellerSection) {
        const addToBagButtons = bestsellerSection.querySelectorAll(".add-to-bag-btn");

        addToBagButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const card = event.target.closest(".product-card");
                
                // 1. Get Product Info from Bestseller Card
                const productName = card.querySelector(".product-name").textContent.replace(/<br>/g, '').trim(); // Remove potential <br> tags
                const productPriceText = card.querySelector(".add-to-bag-btn").textContent;
                const productImgSrc = card.querySelector("img").getAttribute("src");

                // Clean the price text (e.g., "ADD TO BAG ₹1999" -> 1999)
                const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
                
                // Create a unique ID 
                const productId = productName.replace(/\s+/g, '-').toLowerCase();

                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImgSrc,
                    quantity: 1
                };

                // 2. Add to localStorage using the same function
                addToCart(product);

                // 3. Give user feedback (change button text temporarily)
                const originalText = button.textContent; // Store original text
                button.textContent = "Added!";
                button.style.backgroundColor = "#94426A"; // --twilight-lavender
                button.style.color = "#fff"; // Ensure text is visible
                
                setTimeout(() => {
                    button.textContent = originalText; // Revert text
                    button.style.backgroundColor = ""; // Revert color
                    button.style.color = ""; 
                }, 2000); // Revert after 2 seconds
            });
        });
    }

    // --- Add to Cart Function (copied from eyes.js) ---
    function addToCart(productToAdd) {
        // Get existing cart from localStorage, or create an empty array
        let cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];

        // Check if product is already in cart
        const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

        if (existingProductIndex > -1) {
            // If it exists, just increase quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If it's new, add it to the cart
            cart.push(productToAdd);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("mosaicCart", JSON.stringify(cart));
        console.log("Cart updated:", JSON.parse(localStorage.getItem("mosaicCart"))); // Optional: Check console
    }
});