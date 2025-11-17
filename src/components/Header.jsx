import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext.jsx'; // This import is crucial

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { itemCount } = useCart(); // This line gets the number from your cart
  const location = useLocation();

  const closeNav = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    closeNav();
  }, [location.pathname]);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isNavOpen]);

  return (
    <header className="main-header">
      <div className="header-top">
        <Link to="/" className="logo">
          <img src="/assets/images/logos/main-logo.png" alt="Mosaic Logo" className="brand-logo" />
          <h1>MOSAIC</h1>
        </Link>
        
        {/* THIS IS THE MODIFIED CART LINK */}
        <Link to="/cart" className="cart-icon" aria-label={`Cart with ${itemCount} items`}>
          🛒
          {/* This span only appears if items are in the cart */}
          {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
        </Link>
        
        <button
          type="button"
          className={`nav-toggle ${isNavOpen ? 'open' : ''}`}
          aria-label="toggle navigation"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="hamburger" />
        </button>
      </div>
      <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><NavLink to="/#bestsellers" onClick={closeNav}>Bestsellers</NavLink></li>
          <li><NavLink to="/categories" onClick={closeNav}>Categories</NavLink></li>
          <li><NavLink to="/brands" onClick={closeNav}>Brands</NavLink></li>
          <li><NavLink to="/men" onClick={closeNav}>Men</NavLink></li>
          <li><NavLink to="/tutorials" onClick={closeNav}>Tutorials</NavLink></li>
          <li><NavLink to="/bookings" onClick={closeNav}>Bookings</NavLink></li>
          <li><NavLink to="/find-my-shade" onClick={closeNav}>Find My Shade</NavLink></li>
          <li><NavLink to="/rewards" onClick={closeNav}>Rewards</NavLink></li>
          <li><NavLink to="/play" onClick={closeNav}>Play</NavLink></li>
          <li><NavLink to="/about" onClick={closeNav}>About Us</NavLink></li>
          <li><NavLink to="/login" onClick={closeNav}>Sign In</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;