document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartEmptyMessage = document.getElementById("cart-empty-message");
    const subtotalElement = document.getElementById("summary-subtotal");
    const totalElement = document.getElementById("summary-total");
    const taxElement = document.getElementById("summary-tax");

    function loadCartItems() {
        // Load the cart from localStorage
        const cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];

        if (cart.length === 0) {
            // If it's empty, show the "empty" message
            cartEmptyMessage.style.display = "block";
            
            // Clear any old items that might be showing
            const existingItems = cartItemsContainer.querySelectorAll(".cart-item");
            existingItems.forEach(item => item.remove());

            // Set totals to 0
            updateTotals(0);

        } else {
            // If we have items, hide the "empty" message
            cartEmptyMessage.style.display = "none";
            
            // Clear only the old items
            const existingItems = cartItemsContainer.querySelectorAll(".cart-item");
            existingItems.forEach(item => item.remove());
            
            let currentSubtotal = 0;

            // Loop through each item in the cart and create HTML for it
            cart.forEach((item, index) => {
                const itemSubtotal = item.price * item.quantity;
                currentSubtotal += itemSubtotal;

                const cartItemHTML = `
                    <div class="cart-item" data-id="${item.id}" style="animation-delay: ${index * 0.1}s">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">₹${item.price.toFixed(2)}</span>
                        </div>
                        <div class="item-quantity">
                            <label>Qty:</label>
                            <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input">
                        </div>
                        <button class="item-remove-btn">Remove</button>
                    </div>
                `;
                // Add the new HTML to the page
                cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
            });

            // Update the totals in the summary box
            updateTotals(currentSubtotal);
        }

        // Add event listeners for the new "Remove" and "Quantity" inputs
        addCartEventListeners();
    }

    function updateTotals(subtotal) {
        const tax = subtotal * 0.18; // 18% tax
        const total = subtotal + tax;
        
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    function addCartEventListeners() {
        // Find all "Remove" buttons
        const removeButtons = document.querySelectorAll(".item-remove-btn");
        removeButtons.forEach(button => {
            // Remove old listener to prevent duplicates (safe-guard)
            button.removeEventListener("click", handleRemoveItem);
            // Add new listener
            button.addEventListener("click", handleRemoveItem);
        });

        // Find all quantity inputs
        const quantityInputs = document.querySelectorAll(".quantity-input");
        quantityInputs.forEach(input => {
            // Remove old listener
            input.removeEventListener("change", handleUpdateQuantity);
            // Add new listener
            input.addEventListener("change", handleUpdateQuantity);
        });
    }

    // --- Helper functions to handle events ---
    function handleRemoveItem(event) {
        const cartItemElement = event.target.closest(".cart-item");
        const itemId = cartItemElement.dataset.id;
        removeItemFromCart(itemId);
    }

    function handleUpdateQuantity(event) {
        const cartItemElement = event.target.closest(".cart-item");
        const itemId = cartItemElement.dataset.id;
        const newQuantity = parseInt(event.target.value);
        updateItemQuantity(itemId, newQuantity);
    }
    // --- End Helper functions ---


    function removeItemFromCart(itemId) {
        let cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];
        // Create a new cart *without* the item we want to remove
        cart = cart.filter(item => item.id !== itemId);
        // Save the new smaller cart
        localStorage.setItem("mosaicCart", JSON.stringify(cart));
        // Reload the page to show the changes
        loadCartItems();
    }

    function updateItemQuantity(itemId, newQuantity) {
        if (newQuantity < 1) {
            removeItemFromCart(itemId);
            return;
        }
        let cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQuantity;
        }
        localStorage.setItem("mosaicCart", JSON.stringify(cart));
        loadCartItems();
    }

    // Add functionality for recommended products
    function addRecommendedProductListeners() {
        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.recommended-card');
                const productName = card.querySelector('h4').textContent;
                const productPrice = card.querySelector('.recommended-price').textContent.replace('₹', '').replace(',', '');
                const productImage = card.querySelector('img').src;
                
                // Add to cart
                addToCart({
                    id: Date.now().toString(),
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: 1,
                    image: productImage
                });
                
                // Show success message
                //showNotification(`${productName} added to cart!`);
            });
        });
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];
        
        // Check if product already exists
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem("mosaicCart", JSON.stringify(cart));
        loadCartItems(); // Refresh the cart display
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add checkout button functionality
    function addCheckoutListener() {
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                const cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];
                if (cart.length === 0) {
                    showNotification('Your cart is empty!');
                    return;
                }
                
                // For now, just show a message. In a real app, this would redirect to checkout
                showNotification('Checkout functionality coming soon!');
            });
        }
    }

    // Add smooth animations for cart items
    function addCartItemAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .cart-item {
                opacity: 0;
                transform: translateY(20px);
                animation: slideInUp 0.6s ease forwards;
            }
            
            @keyframes slideInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize everything
    loadCartItems();
    addRecommendedProductListeners();
    addCheckoutListener();
    addCartItemAnimations();
});