document.addEventListener("DOMContentLoaded", () => {
  
  // --- KEEP EXISTING SCROLLER CODE ---
  const productCategories = document.querySelectorAll(".product-category");
  productCategories.forEach((category) => {
    const scroller = category.querySelector(".product-scroller");
    const leftArrow = category.querySelector(".left-arrow");
    const rightArrow = category.querySelector(".right-arrow");

    if (scroller && leftArrow && rightArrow) {
      // Event listener for the right arrow
      rightArrow.addEventListener("click", () => {
        const card = scroller.querySelector(".product-card");
        if (!card) return;
        const cardWidth = card.offsetWidth;
        // Scroll right by the width of one card + its gap (1.5rem = 24px)
        scroller.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      });

      // Event listener for the left arrow
      leftArrow.addEventListener("click", () => {
        const card = scroller.querySelector(".product-card");
        if (!card) return;
        const cardWidth = card.offsetWidth;
        // Scroll left by the width of one card + its gap
        scroller.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
      });
    }
  });

  // --- NEW: Add to Cart Functionality ---
  const addToBagButtons = document.querySelectorAll(".add-to-bag-btn"); // Select all new buttons

  addToBagButtons.forEach(button => {
      button.addEventListener("click", (event) => {
          const card = event.target.closest(".product-card");
          
          // 1. Get Product Info
          const productName = card.querySelector(".product-name").textContent;
          const productPriceText = button.textContent; // Get text directly from button
          const productImgSrc = card.querySelector("img").getAttribute("src");

          // Clean the price text (e.g., "ADD TO BAG ₹800" -> 800)
          const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
          
          // Create a unique ID
          const productId = productName.replace(/\s+/g, '-').toLowerCase();

          const product = {
              id: productId,
              name: productName,
              price: productPrice,
              image: productImgSrc, // Corrected path if necessary
              quantity: 1
          };

          // 2. Add to localStorage using the addToCart function
          addToCart(product);

          // 3. Give user feedback
          const originalText = button.textContent; // Store original text
          button.textContent = "Added!";
          button.style.backgroundColor = "#94426A"; // --twilight-lavender
          button.style.color = "#fff"; // Ensure text is visible
          
          setTimeout(() => {
              button.textContent = originalText; // Revert text
              button.style.backgroundColor = ""; // Revert styles
              button.style.color = ""; 
          }, 2000); // Revert after 2 seconds
      });
  });

  // --- Add to Cart Function (copied from other pages) ---
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
  // --- END Add to Cart Function ---

});