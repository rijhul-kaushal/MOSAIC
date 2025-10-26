document.addEventListener("DOMContentLoaded", () => {

    // --- Fade-in effect for content ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is on screen (intersecting)
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                
                // We don't need to watch it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch each of our fade-in elements
    fadeElements.forEach(el => {
        observer.observe(el);
    });

});