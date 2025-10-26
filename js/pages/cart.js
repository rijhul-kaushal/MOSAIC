document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartEmptyMessage = document.getElementById("cart-empty-message");
    const subtotalElement = document.getElementById("summary-subtotal");
    const totalElement = document.getElementById("summary-total");

    function loadCartItems() {
        // Load the cart from localStorage
        const cart = JSON.parse(localStorage.getItem("mosaicCart")) || [];

        // **THE FIX IS HERE:**
        // We now check the cart length FIRST.
        if (cart.length === 0) {
            // If it's empty, just show the "empty" message.
            cartEmptyMessage.style.display = "block";
            
            // Clear any old items that might be showing
            const existingItems = cartItemsContainer.querySelectorAll(".cart-item");
            existingItems.forEach(item => item.remove());

            // Set totals to 0
            subtotalElement.textContent = `₹0.00`;
            totalElement.textContent = `₹0.00`;

        } else {
            // If we have items, hide the "empty" message
            cartEmptyMessage.style.display = "none";
            
            // Clear only the old items
            const existingItems = cartItemsContainer.querySelectorAll(".cart-item");
            existingItems.forEach(item => item.remove());
            
            let currentSubtotal = 0;

            // Loop through each item in the cart and create HTML for it
            cart.forEach(item => {
                const itemSubtotal = item.price * item.quantity;
                currentSubtotal += itemSubtotal;

                const cartItemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">₹${item.price.toFixed(2)}</span>
                        </div>
                        <div class="item-quantity">
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        </div>
                        <button class="item-remove-btn">Remove</button>
                    </div>
                `;
                // Add the new HTML to the page
                cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
            });

            // Update the totals in the summary box
            subtotalElement.textContent = `₹${currentSubtotal.toFixed(2)}`;
            totalElement.textContent = `₹${currentSubtotal.toFixed(2)}`; // Assuming free shipping
        }

        // Add event listeners for the new "Remove" and "Quantity" inputs
        addCartEventListeners();
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

    // --- This is the first thing that runs ---
    loadCartItems();
});