import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext.jsx';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/home.css?inline';

const heroVideoSrc = '/assets/videos/rare.mp4';

const brandHighlights = [
  {
    id: 'fenty-beauty',
    name: 'Fenty Beauty',
    description: 'Up to 30% Off on Bestsellers!',
    image: '/assets/images/brands/fenty_1.jpg',
    to: '/brands',
  },
  {
    id: 'benefit-cosmetics',
    name: 'Benefit Cosmetics',
    description: 'Foundation @ 15% Off',
    image: '/assets/images/brands/benefit_1.jpg',
    to: '/brands',
  },
  {
    id: 'kiko-milano',
    name: 'Kiko Milano',
    description: '3 Step Skincare Ritual',
    image: '/assets/images/brands/kiko_milano_1.jpg',
    to: '/brands',
  },
];

const bestsellerProducts = [
  {
    id: 'fenty-hella-thicc-volumizing-mascara-mini',
    name: 'FENTY BEAUTY Hella Thicc Volumizing Mascara Mini(6.5ml)',
    description: 'The ultimate long-lasting color.',
    price: 1999,
    image: '/assets/images/products/tira_mascara.jpg',
  },
  {
    id: 'soft-focus-blurring-powdered-blush',
    name: 'Soft Focus Blurring Powdered Blush',
    description: 'Blendable, highly pigmented shades.',
    price: 2500,
    image: '/assets/images/products/ilia.jpg',
  },
  {
    id: 'lip-contour-lip-stain',
    name: 'Lip Contour Lip Stain For 12-Hour Wear',
    description: 'Flawless coverage, smudge-proof.',
    price: 1850,
    image: '/assets/images/products/lip_contour.jpg',
  },
];

const formatPriceLabel = (price) => `ADD TO BAG ₹${price}`;

const Home = () => {
  const videoRef = useRef(null);
  const { addItem } = useCart();
  const [buttonStates, setButtonStates] = useState({});

  useScopedCss(pageStyles, 'home-page');

  useEffect(() => {
    document.title = 'Mosaic | Clean, Skin-Centric Beauty';
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3;
    }
  }, []);

  const productButtonText = useMemo(
    () =>
      bestsellerProducts.reduce(
        (acc, product) => ({
          ...acc,
          [product.id]: formatPriceLabel(product.price),
        }),
        {},
      ),
    [],
  );

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setButtonStates((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    window.setTimeout(() => {
      setButtonStates((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 2000);
  };

  return (
    <main>
      <section className="hero-section" id="hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          // poster="/assets/images/play/photo.jpg"
        >
          <source src={heroVideoSrc} type="video/mp4" />
          <img src="/assets/images/play/photo.jpg" alt="Clean, Skin-Centric Beauty" />
        </video>
        <div className="hero-content">
          <h2>
            Clean, Skin-
            <br />
            Centric Beauty™
          </h2>
          <a href="#bestsellers" className="cta-button">
            Shop Bestsellers
          </a>
        </div>
      </section>

      <section className="promo-brand-section">
        <div className="promo-banner">
          <div className="promo-text">
            <span className="discount-text">Extra 20% Off</span>
            <p>On Your First App Purchase</p>
          </div>
          <button type="button" className="promo-code-btn">
            USE CODE EXTRA20%
          </button>
        </div>
        <br />
        <br />
        <br />
        <h2>Explore Our Top Brands</h2>
        <p className="section-subtitle">A-listers to obsess over</p>
        <div className="brands-grid">
          {brandHighlights.map((brand) => (
            <article key={brand.id} className="brand-card">
              <img src={brand.image} alt={brand.name} />
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <Link to={brand.to} className="brand-shop-link">
                Explore more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bestsellers-section" id="bestsellers">
        <h2>Our Bestsellers</h2>
        <div className="product-grid">
          {bestsellerProducts.map((product) => {
            const isAdded = Boolean(buttonStates[product.id]);
            return (
              <article key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <button
                  type="button"
                  className="add-to-bag-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  {isAdded ? 'Added!' : productButtonText[product.id]}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="join-our-team-section">
        <div className="team-content">
          <h2>Grow With Us</h2>
          <p>Discover career opportunities at Mosaic and help us shape the future of clean beauty.</p>
          <Link to="/partnerships" className="cta-link">
            Know more &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;

