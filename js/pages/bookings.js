/*
    Bookings Page JavaScript for Mosaic Project
    Handles form validation, service selection, and booking functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const serviceSelect = document.getElementById('service');
    const durationSelect = document.getElementById('duration');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    
    // Service to duration mapping
    const serviceDurations = {
        'consultation': 60,
        'application': 90,
        'skincare': 45,
        'tutorial': 120
    };
    
    // Set minimum date to today + 1 day
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start bookings from tomorrow
    const minDateString = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDateString;
    
    // Set maximum date to 3 months from now
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    // Auto-populate duration based on service selection
    if (serviceSelect && durationSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            if (selectedService && serviceDurations[selectedService]) {
                durationSelect.value = serviceDurations[selectedService];
                 // Trigger change event to potentially update time slots if needed later
                durationSelect.dispatchEvent(new Event('change'));
            } else {
                 durationSelect.value = ""; // Reset duration if no service selected
            }
        });
    }

    // --- FORM VALIDATION LOGIC ---
    function validateForm() {
        clearFieldErrors(); // Clear previous errors first
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            // Check if field is empty
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required.');
                isValid = false;
            } 
            // Check email format
            else if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email address (e.g., name@example.com).');
                isValid = false;
            } 
            // Check phone format (simple check for digits, allows optional '+', spaces, hyphens)
            else if (field.type === 'tel' && !isValidPhone(field.value)) {
                showFieldError(field, 'Please enter a valid phone number (digits, optional +, spaces, hyphens).');
                isValid = false;
            }
            // Check date validity (not in the past or too far in future)
             else if (field.type === 'date' && field.value) {
                const selectedDate = new Date(field.value + 'T00:00:00'); // Ensure comparison is based on date only
                const minDate = new Date(minDateString + 'T00:00:00'); 
                if (selectedDate < minDate) {
                     showFieldError(field, 'Please select a date from tomorrow onwards.');
                     isValid = false;
                }
                 // Max date validation is usually handled by the input's max attribute
            }
        });
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('input-error'); // Add error class for styling
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Remove existing error message if present
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert error message after the input field
        field.parentNode.insertBefore(errorElement, field.nextSibling); 
    }
    
    function clearFieldErrors() {
        const errorMessages = bookingForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = bookingForm.querySelectorAll('.input-error');
        errorFields.forEach(field => {
            field.classList.remove('input-error');
        });
    }
    
    function isValidEmail(email) {
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple regex allows digits, +, spaces, hyphens, parentheses
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        // Basic check for at least 7 digits to avoid very short numbers
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7; 
    }
    
    // --- END FORM VALIDATION LOGIC ---
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default submission
            
            // Validate the form before proceeding
            if (validateForm()) {
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Booking...';
                submitBtn.disabled = true;
                
                // Simulate API call or form processing
                console.log("Form is valid, simulating submission..."); 
                setTimeout(() => {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showSuccessMessage();
                    
                    // Reset form fields
                    bookingForm.reset();
                    // Manually reset duration if needed as it might be auto-populated
                    if (durationSelect) durationSelect.value = ""; 

                }, 1500); // Simulate network delay
            } else {
                 console.log("Form validation failed.");
                 // Optionally scroll to the first error
                 const firstError = bookingForm.querySelector('.input-error');
                 if (firstError) {
                     firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 }
            }
        });
    }
    
    function showSuccessMessage() {
        // Create success modal (using existing structure)
        const modal = document.createElement('div');
        modal.className = 'modal'; // Ensure you have basic modal styles or add inline styles
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6); display: flex; align-items: center;
            justify-content: center; z-index: 1001; opacity: 0; transition: opacity 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white; padding: 2.5rem; border-radius: 10px; text-align: center;
            max-width: 450px; margin: 1rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transform: scale(0.9); transition: transform 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #27ae60; margin-bottom: 1rem;">✓</div>
            <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Appointment Booked!</h2>
            <p style="color: #666; margin-bottom: 1.5rem; font-size: 0.95rem;">Thank you! We've received your request and will send a confirmation email shortly.</p>
            <button class="modal-close-btn" style="
                background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
                color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 6px;
                font-size: 0.9rem; font-weight: 600; cursor: pointer; text-transform: uppercase;
            ">Close</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animate modal in
         setTimeout(() => {
             modal.style.opacity = '1';
             modalContent.style.transform = 'scale(1)';
         }, 50); // Small delay to allow CSS transition

        // Close button functionality
        modal.querySelector('.modal-close-btn').addEventListener('click', () => {
             modal.style.opacity = '0';
             modalContent.style.transform = 'scale(0.9)';
             setTimeout(() => modal.remove(), 300); // Remove after animation
        });

         // Optional: Auto-close after a few seconds
         /*
         setTimeout(() => {
             if (modal.parentNode) {
                  modal.style.opacity = '0';
                  modalContent.style.transform = 'scale(0.9)';
                  setTimeout(() => modal.remove(), 300);
             }
         }, 5000); 
         */
    }
    
    // Add smooth scrolling for anchor links (if any on this page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
             try {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (error) {
                 console.warn(`Could not find element for smooth scroll: ${targetId}`);
            }
        });
    });
    
    // Add animation to service cards on scroll (Fade-in effect)
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it's fully in view
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe cards needing fade-in
    document.querySelectorAll('.service-card, .expert-card, .faq-item').forEach(card => {
        card.classList.add('fade-in-element'); // Add class to apply initial styles via CSS
        observer.observe(card);
    });
    
    
    // Add click-to-select functionality for service cards (if needed)
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            if (!serviceSelect) return; // Only run if select exists

            const serviceName = this.querySelector('h3')?.textContent.toLowerCase() || '';
            let serviceValue = '';
            
            // Map service name (or part of it) to the select option value
            if (serviceName.includes('consultation')) serviceValue = 'consultation';
            else if (serviceName.includes('application')) serviceValue = 'application';
            else if (serviceName.includes('skincare')) serviceValue = 'skincare';
            else if (serviceName.includes('tutorial')) serviceValue = 'tutorial';
            
            if (serviceValue) {
                serviceSelect.value = serviceValue;
                // Trigger change event to update duration
                serviceSelect.dispatchEvent(new Event('change')); 
                
                // Scroll to form smoothly
                const formSection = document.querySelector('.booking-form-section');
                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Add keyboard navigation support (Close modal with Escape)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal');
            if (modal) {
                 modal.style.opacity = '0';
                 modal.querySelector('div').style.transform = 'scale(0.9)'; // Use inner div for transform
                 setTimeout(() => modal.remove(), 300);
            }
        }
    });

});

// Add CSS for error states and fade-in animation directly in JS (or move to bookings.css)
const style = document.createElement('style');
style.textContent = `
    .form-group .error-message {
        color: #e74c3c; /* Red color for errors */
        font-size: 0.85rem;
        margin-top: 4px;
    }
    .form-group .input-error {
        border-color: #e74c3c !important; /* Force red border */
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2); /* Optional: add red glow */
    }
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);