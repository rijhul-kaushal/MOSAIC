document.addEventListener("DOMContentLoaded", () => {
    
    // --- Re-using the scroller code from the previous plan ---
    const productCategories = document.querySelectorAll(".product-category");
    productCategories.forEach((category) => {
        const scroller = category.querySelector(".product-scroller");
        const leftArrow = category.querySelector(".left-arrow");
        const rightArrow = category.querySelector(".right-arrow");

        if (scroller && leftArrow && rightArrow) {
            rightArrow.addEventListener("click", () => {
                const cardWidth = scroller.querySelector(".product-card").offsetWidth;
                scroller.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
            });
            leftArrow.addEventListener("click", () => {
                const cardWidth = scroller.querySelector(".product-card").offsetWidth;
                scroller.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
            });
        }
    });

    // --- NEW: Add to Cart Functionality ---
    const addToBagButtons = document.querySelectorAll(".add-to-bag-btn");

    addToBagButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".product-card");
            
            // 1. Get Product Info
            const productName = card.querySelector(".product-name").textContent;
            const productPriceText = card.querySelector(".add-to-bag-btn").textContent;
            const productImgSrc = card.querySelector("img").getAttribute("src");

            // Clean the price text (e.g., "BUY FOR ₹3100" -> 3100)
            const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
            
            // Create a unique ID (using the name for simplicity)
            const productId = productName.replace(/\s+/g, '-').toLowerCase();

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImgSrc,
                quantity: 1
            };

            // 2. Add to localStorage
            addToCart(product);

            // 3. Give user feedback
            button.textContent = "Added to Bag!";
            button.style.backgroundColor = "#94426A"; // --twilight-lavender
            setTimeout(() => {
                button.textContent = productPriceText; // Revert text
                button.style.backgroundColor = ""; // Revert color
            }, 2000);
        });
    });

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
    }
});