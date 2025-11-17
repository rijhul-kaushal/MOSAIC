import { useEffect, useMemo, useRef } from 'react';
import rawBookingsHtml from '@legacy/pages/bookings.html?raw';
import useLegacyLinkNavigation from '@/hooks/useLegacyLinkNavigation.js';
import useFadeInOnScroll from '@/hooks/useFadeInOnScroll.js';
import transformLegacyHtml from '@/utils/legacyHtml.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/bookings.css?inline';

const serviceDurations = {
  consultation: '60',
  application: '90',
  skincare: '45',
  tutorial: '120',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const createSuccessModal = () => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 2.5rem;
    border-radius: 10px;
    text-align: center;
    max-width: 450px;
    margin: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: scale(0.9);
    transition: transform 0.3s ease;
  `;

  content.innerHTML = `
    <div style="font-size: 3rem; color: #27ae60; margin-bottom: 1rem;">✓</div>
    <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Appointment Booked!</h2>
    <p style="color: #666; margin-bottom: 1.5rem; font-size: 0.95rem;">Thank you! We've received your request and will send a confirmation email shortly.</p>
    <button class="modal-close-btn" style="
      background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
    ">Close</button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    content.style.transform = 'scale(1)';
  });

  return { modal, content };
};

const Bookings = () => {
  const pageRef = useRef(null);
  const content = useMemo(() => transformLegacyHtml(rawBookingsHtml), []);

  useEffect(() => {
    document.title = 'Bookings - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'bookings-page');
  useLegacyLinkNavigation(pageRef);
  useFadeInOnScroll(pageRef, '.service-card, .expert-card, .faq-item');

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    const form = container.querySelector('#bookingForm');
    const serviceSelect = container.querySelector('#service');
    const durationSelect = container.querySelector('#duration');
    const dateInput = container.querySelector('#date');
    const serviceCards = Array.from(container.querySelectorAll('.service-card'));

    if (dateInput) {
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 1);
      dateInput.min = minDate.toISOString().split('T')[0];

      const maxDate = new Date(today);
      maxDate.setMonth(today.getMonth() + 3);
      dateInput.max = maxDate.toISOString().split('T')[0];
    }

    const handleServiceChange = (event) => {
      const selectedService = event.target.value;
      if (selectedService && serviceDurations[selectedService]) {
        durationSelect.value = serviceDurations[selectedService];
      }
    };

    const handleServiceCardClick = (card) => {
      const heading = card.querySelector('h3')?.textContent.toLowerCase() ?? '';
      let serviceValue = '';

      if (heading.includes('consultation')) serviceValue = 'consultation';
      else if (heading.includes('application')) serviceValue = 'application';
      else if (heading.includes('skincare')) serviceValue = 'skincare';
      else if (heading.includes('tutorial')) serviceValue = 'tutorial';

      if (serviceValue) {
        serviceSelect.value = serviceValue;
        durationSelect.value = serviceDurations[serviceValue] ?? '';
        serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        const formSection = container.querySelector('.booking-form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const showFieldError = (field, message) => {
      field.classList.add('input-error');
      const group = field.closest('.form-group');
      if (!group) {
        return;
      }

      const existingError = group.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = message;
      field.insertAdjacentElement('afterend', error);
    };

    const clearErrors = () => {
      container.querySelectorAll('.error-message').forEach((error) => error.remove());
      container.querySelectorAll('.input-error').forEach((input) => input.classList.remove('input-error'));
    };

    const validateForm = () => {
      if (!form) {
        return false;
      }

      clearErrors();
      let isValid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required.');
          isValid = false;
          return;
        }

        if (field.type === 'email' && !emailRegex.test(field.value)) {
          showFieldError(field, 'Please enter a valid email address.');
          isValid = false;
          return;
        }

        if (field.type === 'tel' && (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 7)) {
          showFieldError(field, 'Please enter a valid phone number.');
          isValid = false;
        }
      });

      if (dateInput?.value) {
        const selected = new Date(`${dateInput.value}T00:00:00`);
        const minimum = new Date(`${dateInput.min}T00:00:00`);
        if (selected < minimum) {
          showFieldError(dateInput, 'Please select a date from tomorrow onwards.');
          isValid = false;
        }
      }

      return isValid;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!validateForm()) {
        const firstError = container.querySelector('.input-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Booking...';
      submitBtn.disabled = true;

      window.setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();

        const { modal, content } = createSuccessModal();

        const closeModal = () => {
          modal.style.opacity = '0';
          content.style.transform = 'scale(0.9)';
          window.setTimeout(() => {
            if (modal.parentNode) {
              modal.remove();
            }
          }, 300);
        };

        const closeButton = modal.querySelector('.modal-close-btn');
        closeButton?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeModal();
          }
        });
      }, 1500);
    };

    serviceSelect?.addEventListener('change', handleServiceChange);
    const cardHandlers = serviceCards.map((card) => {
      const handler = () => handleServiceCardClick(card);
      card.addEventListener('click', handler);
      return { card, handler };
    });
    form?.addEventListener('submit', handleSubmit);

    return () => {
      serviceSelect?.removeEventListener('change', handleServiceChange);
      cardHandlers.forEach(({ card, handler }) => {
        card.removeEventListener('click', handler);
      });
      form?.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return <main ref={pageRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Bookings;

