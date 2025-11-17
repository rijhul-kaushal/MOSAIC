import { useEffect, useMemo, useRef } from 'react';
import rawMenHtml from '@legacy/pages/men.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';

// --- 1. IMPORT THE HOOKS AND CSS ---
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/men.css?inline'; // This will now load your new file
import { useCart } from '@/context/CartContext.jsx';

const Men = () => {
  const pageRef = useRef(null);
  const { addItem } = useCart(); // Get the addItem function from your cart
  const content = useMemo(() => transformLegacyHtml(rawMenHtml), []);

  useEffect(() => {
    document.title = 'For Men - Mosaic Beauty';
  }, []);

  // --- 2. APPLY THE CSS ---
  useScopedCss(pageStyles, 'men-page');
  useLegacyLinkNavigation(pageRef);

  // --- 3. ADD "ADD TO CART" LOGIC (REVISED) ---
  useEffect(() => {
    const container = pageRef.current;
    if (!container || !addItem) {
      return undefined;
    }

    // This function will handle the click
    const handleAddToCartClick = (event) => {
      const button = event.currentTarget;
      const card = button.closest('.product-card');
      if (!card) return;

      // Find the image and get its src
      const img = card.querySelector('img');
      const image = img ? img.getAttribute('src') : '';

      // Find the product name element and get its text
      const nameEl = card.querySelector('.product-name');
      const name = nameEl ? nameEl.textContent.trim() : 'Product';

      // Extract the price from the button's text content
      // This will get all the numbers from a string like "ADD TO BAG ₹1850"
      const priceString = button.textContent.replace(/[^0-9.]/g, '');
      const price = parseFloat(priceString) || 0;

      // Create a simple ID from the product name
      const id = name.toLowerCase().replace(/\s+/g, '-');

      // Create the product object
      const product = {
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1,
      };

      // Add the item to the cart
      addItem(product);

      // --- Show "Added!" state on the button ---
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    };

    // Find all "Add to Bag" buttons on this page
    // This query comes from your CSS file: .men-page-content .product-card .add-to-bag-btn
    const buttons = container.querySelectorAll('.add-to-bag-btn');

    // Add our new click handler to every button
    buttons.forEach((button) => {
      button.addEventListener('click', handleAddToCartClick);
    });

    // Cleanup: Remove the event listeners when the page changes
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', handleAddToCartClick);
      });
    };
  }, [content, addItem]); // Re-run this logic if the content or addItem function changes

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Men;