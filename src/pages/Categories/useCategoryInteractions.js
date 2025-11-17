import { useEffect } from 'react';
import { useCart } from '@/context/CartContext.jsx';

const normaliseId = (value) =>
  value
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') ?? `product-${Date.now()}`;

export const useCategoryInteractions = (containerRef) => {
  const { addItem } = useCart();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const cleanupFns = [];

    container.querySelectorAll('.product-category').forEach((section) => {
      const scroller = section.querySelector('.product-scroller');
      const leftArrow = section.querySelector('.left-arrow');
      const rightArrow = section.querySelector('.right-arrow');

      if (!scroller || !leftArrow || !rightArrow) {
        return;
      }

      const scrollByCard = (direction) => {
        const card = scroller.querySelector('.product-card');
        if (!card) {
          return;
        }
        const cardWidth = card.getBoundingClientRect().width;
        scroller.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' });
      };

      const handleLeft = () => scrollByCard(-1);
      const handleRight = () => scrollByCard(1);

      leftArrow.addEventListener('click', handleLeft);
      rightArrow.addEventListener('click', handleRight);

      cleanupFns.push(() => {
        leftArrow.removeEventListener('click', handleLeft);
        rightArrow.removeEventListener('click', handleRight);
      });
    });

    container.querySelectorAll('.product-card .add-to-bag-btn').forEach((button) => {
      const originalLabel = button.textContent;

      const handleClick = (event) => {
        const card = event.currentTarget.closest('.product-card');
        if (!card) {
          return;
        }

        const name =
          card.querySelector('.product-name')?.textContent.replace(/\s+/g, ' ').trim() ?? 'Product';
        const priceText = originalLabel;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const image = card.querySelector('img')?.getAttribute('src') ?? '';
        const id = normaliseId(name);

        addItem({
          id,
          name,
          price,
          image,
          quantity: 1,
        });

        button.textContent = 'Added to Bag!';
        button.style.backgroundColor = '#94426A';

        window.setTimeout(() => {
          button.textContent = originalLabel;
          button.style.backgroundColor = '';
        }, 2000);
      };

      button.addEventListener('click', handleClick);
      cleanupFns.push(() => {
        button.removeEventListener('click', handleClick);
      });
    });

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [addItem, containerRef]);
};

export default useCategoryInteractions;

