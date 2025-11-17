import { useCallback, useEffect } from 'react';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/contact.css?inline';

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--primary-color, #3F0A29), var(--twilight-lavender, #94426A));
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 12px 25px rgba(63, 10, 41, 0.25);
    z-index: 1001;
    transform: translateX(120%);
    transition: transform 0.3s ease;
  `;
  toast.textContent = message;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  window.setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    window.setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 2500);
};

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'contact-page');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    showToast('Thank you! Our concierge team will reach out within 24 hours.');
  }, []);

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>We&apos;d Love To Hear From You</h1>
        <p>
          Whether you&apos;re planning a bespoke beauty experience or simply need help finding your perfect products,
          the Mosaic concierge team is here for you every step of the way.
        </p>
        <div className="contact-actions">
          <a href="tel:+18001234567">Call +1 (800) 123-4567</a>
          <a href="mailto:hello@mosaicbeauty.com">Email Us</a>
        </div>
      </section>

      <section className="contact-grid">
        <div className="contact-card">
          <h3>Flagship Atelier</h3>
          <ul>
            <li>19 Mercer Street</li>
            <li>SoHo, New York, NY 10013</li>
            <li>+1 (800) 123-4567</li>
            <li>concierge@mosaicbeauty.com</li>
          </ul>
        </div>
        <div className="contact-card">
          <h3>Hours</h3>
          <ul>
            <li>Monday – Friday: 9:00 AM – 7:00 PM ET</li>
            <li>Saturday: 10:00 AM – 6:00 PM ET</li>
            <li>Sunday: 11:00 AM – 5:00 PM ET</li>
            <li>Virtual consultations available daily</li>
          </ul>
        </div>
        <div className="contact-card">
          <h3>Press & Partnerships</h3>
          <ul>
            <li>press@mosaicbeauty.com</li>
            <li>collaborations@mosaicbeauty.com</li>
            <li>Influencer collective & media kit upon request</li>
          </ul>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send A Message</h2>
        <p>Share a few details and our team will respond within 24 hours.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" placeholder="Your name" required />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" placeholder="Surname" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (___) ___-____" />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us about your event, routine goals, or any questions you might have..."
              required
            />
          </div>
          <button type="submit" className="contact-submit">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;

