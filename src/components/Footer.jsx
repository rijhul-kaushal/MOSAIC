import { Link } from 'react-router-dom';

const Footer = () => {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>SHOP</h3>
          <ul>
            <li>
              <Link to={{ pathname: '/', hash: '#bestsellers' }}>Bestsellers</Link>
            </li>
            <li>
              <a href="#">Subscribe and Save</a>
            </li>
            <li>
              <Link to="/rewards">Rewards</Link>
            </li>
            <li>
              <a href="#">Refer a Friend</a>
            </li>
            <li>
              <a href="#">Gift Cards</a>
            </li>
            <li>
              <a href="#">Find a Store</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>HELP</h3>
          <ul>
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <Link to="/find-my-shade">Find My Shade</Link>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Track Package</a>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>ABOUT</h3>
          <ul>
            <li>
              <a href="#">Our Mission</a>
            </li>
            <li>
              <a href="#">Recycling</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Affiliates</a>
            </li>
            <li>
              <a href="#">Mosaic Icons</a>
            </li>
            <li>
              <a href="#">Clean at Mosaic</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>PROMOTION DETAILS</h3>
          <ul>
            <li>
              <a href="#">Mosaic Promotions</a>
            </li>
            <li>
              <a href="#">Student Discounts</a>
            </li>
            <li>
              <a href="#">Teacher Discounts</a>
            </li>
            <li>
              <a href="#">Win the Website</a>
            </li>
          </ul>
        </div>
        <div className="footer-column commitments">
          <h3>COMMITMENTS</h3>
          <img src="/assets/images/footer/bunny.png" alt="Leaping Bunny Certified" />
          <img src="/assets/images/footer/earth.png" alt="For the Planet" />
          <img src="/assets/images/footer/accessibility.png" alt="Accessibility" />
        </div>
        <div className="footer-newsletter">
          <h3>10% OFF YOUR FIRST ORDER</h3>
          <p>Be the first to hear about product launches, exclusive sales, and more news.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder="Email" required aria-label="Enter your email for newsletter" />
            <button type="submit" className="newsletter-btn">
              SEND
            </button>
          </form>
          <div className="social-links">
            <a href="#">IG</a>
            <a href="#">FB</a>
            <a href="#">TikTok</a>
            <a href="#">YT</a>
            <a href="#">Pin</a>
            <a href="#">TW</a>
          </div>
        </div>
      </div>
      <div className="copyright-bar">
        <p>© 2025 Mosaic Beauty All rights reserved</p>
        <div className="legal-links">
          <a href="#">Privacy</a> | <a href="#">Terms</a> | <a href="#">CA Privacy</a> |{' '}
          <a href="#">Do Not Sell or Share My Personal Information</a> | <a href="#">Accessibility</a> |{' '}
          <a href="#">Sitemap</a> | <a href="#">Warranty</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

