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
    
    // Set minimum date to today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    
    // Set maximum date to 3 months from now
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    // Auto-populate duration based on service selection
    serviceSelect.addEventListener('change', function() {
        const selectedService = this.value;
        if (selectedService && serviceDurations[selectedService]) {
            durationSelect.value = serviceDurations[selectedService];
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.type === 'tel' && !isValidPhone(field.value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        });
        
        // Validate date is not in the past
        if (dateInput.value) {
            const selectedDate = new Date(dateInput.value);
            if (selectedDate <= today) {
                showFieldError(dateInput, 'Please select a future date');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#e74c3c';
    }
    
    function clearFieldErrors() {
        const errorMessages = bookingForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const fields = bookingForm.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.style.borderColor = '#e0e0e0';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearFieldErrors();
        
        if (validateForm()) {
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                bookingForm.reset();
            }, 2000);
        }
    });
    
    function showSuccessMessage() {
        // Create success modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 15px;
            text-align: center;
            max-width: 500px;
            margin: 0 1rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;">✓</div>
            <h2 style="font-family: 'Playfair Display', serif; color: var(--primary-color); margin-bottom: 1rem;">Appointment Booked!</h2>
            <p style="color: #666; margin-bottom: 2rem;">Thank you for booking with Mosaic. We'll send you a confirmation email shortly.</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, var(--primary-color), var(--twilight-lavender));
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
            ">Close</button>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and expert cards
    document.querySelectorAll('.service-card, .expert-card, .faq-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click-to-select functionality for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent.toLowerCase();
            let serviceValue = '';
            
            if (serviceName.includes('consultation')) {
                serviceValue = 'consultation';
            } else if (serviceName.includes('application')) {
                serviceValue = 'application';
            } else if (serviceName.includes('skincare')) {
                serviceValue = 'skincare';
            } else if (serviceName.includes('tutorial')) {
                serviceValue = 'tutorial';
            }
            
            if (serviceValue) {
                serviceSelect.value = serviceValue;
                durationSelect.value = serviceDurations[serviceValue];
                
                // Scroll to form
                document.querySelector('.booking-form-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add visual feedback
                this.style.border = '2px solid var(--middle-purple)';
                setTimeout(() => {
                    this.style.border = '1px solid #f0f0f0';
                }, 2000);
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.remove();
            }
        }
    });
    
    // Add form field focus effects
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.parentNode.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
});