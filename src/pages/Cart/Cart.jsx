import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext.jsx';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/cart.css?inline';

const recommendedProducts = [
  {
    id: 'recommended-pillow-talk-lipstick',
    name: 'Pillow Talk Lipstick',
    price: 2500,
    image: '/assets/images/categories/nails/nailprod2.avif',
  },
  {
    id: 'recommended-easy-blur-foundation',
    name: 'Easy Blur Foundation',
    price: 3200,
    image: '/assets/images/categories/complexion/loreal.avif',
  },
  {
    id: 'recommended-tira-mascara',
    name: 'Tira Mascara',
    price: 1800,
    image: '/assets/images/products/tira_mascara.jpg',
  },
];

const formatCurrency = (value) => `₹${value.toFixed(2)}`;

const Cart = () => {
  const { items, subtotal, tax, total, updateItemQuantity, removeItem, addItem } = useCart();

  useEffect(() => {
    document.title = 'Your Cart - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'cart-page');

  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    if (Number.isNaN(quantity) || quantity < 1) {
      removeItem(id);
    } else {
      updateItemQuantity(id, quantity);
    }
  };

  const handleAddRecommended = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const hasItems = items.length > 0;

  return (
    <main>
      <section className="cart-hero">
        <div className="hero-content">
          <h1>Your Shopping Cart</h1>
          <p>Review your selected beauty essentials and proceed to checkout</p>
        </div>
      </section>

      <section className="cart-page-content">
        <div className="container">
          <div className="cart-container">
            <div className="cart-items-section">
              <h2>Cart Items</h2>
              <div className="cart-items-list" id="cart-items-container">
                {!hasItems && (
                  <div className="cart-empty" id="cart-empty-message">
                    <div className="empty-cart-icon">
                      <img
                        src="/assets/images/categories/complexion/comp1.jpg"
                        alt="Empty Cart"
                        className="cart-icon-image"
                      />
                    </div>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven&apos;t added any items to your cart yet.</p>
                    <Link to="/" className="cta-button">
                      Start Shopping
                    </Link>
                  </div>
                )}

                {hasItems &&
                  items.map((item) => (
                    <div key={item.id} className="cart-item" data-id={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">{formatCurrency(item.price)}</span>
                      </div>
                      <div className="item-quantity">
                        <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          value={item.quantity}
                          min="1"
                          max="10"
                          className="quantity-input"
                          onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                        />
                      </div>
                      <button type="button" className="item-remove-btn" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span id="summary-subtotal">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span id="summary-tax">{formatCurrency(tax)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span id="summary-total">{formatCurrency(total)}</span>
                  </div>
                </div>
                <button type="button" className="checkout-btn" disabled={!hasItems}>
                  Proceed to Checkout
                </button>
                <div className="security-badges">
                  <div className="security-badge">
                    <i className="fas fa-lock" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="security-badge">
                    <i className="fas fa-truck" />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recommended-products">
        <div className="container">
          <h2>You Might Also Like</h2>
          <div className="recommended-grid">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="recommended-card">
                <div className="recommended-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="recommended-content">
                  <h4>{product.name}</h4>
                  <p className="recommended-price">{formatCurrency(product.price)}</p>
                  <button type="button" className="add-to-cart-btn" onClick={() => handleAddRecommended(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;

