import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories.css?inline';

const categories = [
  {
    id: 'complexion',
    name: 'Complexion',
    description: 'Flawless skin starts with the right foundation.',
    image: '/assets/images/categories/complexion.png',
    to: '/categories/complexion',
    className: 'item-1',
  },
  {
    id: 'eyes',
    name: 'Eyes',
    description: 'Enhance your gaze with stunning eye makeup.',
    image: '/assets/images/categories/eye.jpg',
    to: '/categories/eyes',
    className: 'item-2',
  },
  {
    id: 'lips-cheeks',
    name: 'Lips & Cheeks',
    description: 'Bold lips and a touch of blush. Pure beauty.',
    image: '/assets/images/categories/lips-cheek.jpg',
    to: '/categories/lips',
    className: 'item-3',
  },
  {
    id: 'tools',
    name: 'Tools & Brushes',
    description: 'Your perfect application starts here.',
    image: '/assets/images/categories/brush.jpg',
    to: '/categories/tools',
    className: 'item-4',
  },
  {
    id: 'skin',
    name: 'Skin',
    description: 'Nourish and protect for a healthy glow.',
    image: '/assets/images/categories/skin.jpeg',
    to: '/categories/skin',
    className: 'item-5',
  },
  {
    id: 'nails',
    name: 'Nails',
    description: 'Express your style with vibrant nail colors.',
    image: '/assets/images/categories/nails.jpg',
    to: '/categories/nails',
    className: 'item-6',
  },
  {
    id: 'hair',
    name: 'Hair',
    description: 'Care for your hair with our best products.',
    image: '/assets/images/categories/hair.jpg',
    to: '/categories/hair',
    className: 'item-7',
  },
  {
    id: 'bath',
    name: 'Bath & Body',
    description: 'Indulge in a luxurious, self-care ritual.',
    image: '/assets/images/categories/bath.jpg',
    to: '/categories/bath',
    className: 'item-8',
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    description: 'Discover your signature scent with us.',
    image: '/assets/images/categories/fragrance.jpg',
    to: '/categories/fragrance',
    className: 'item-9',
  },
];

const Categories = () => {
  useEffect(() => {
    document.title = 'Mosaic | Shop by Category';
  }, []);

  useScopedCss(pageStyles, 'categories-page');

  return (
    <main>
      <section className="categories-section">
        <div className="intro-text">
          <h2>Shop by Category</h2>
          <p>
            Explore our thoughtfully curated collections and discover your next beauty essential. From flawless finishes
            to captivating colors, find exactly what you&apos;re looking for.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} to={category.to} className={`category-card ${category.className}`}>
              <img src={category.image} alt={category.name} />
              <div className="card-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>Shop Now &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Categories;

