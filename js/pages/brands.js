document.addEventListener('DOMContentLoaded', function() {
    // Set up smooth scrolling for navigation
    setupSmoothScrolling();
});

function setupSmoothScrolling() {
    // Smooth scrolling for sub-navigation links
    document.querySelectorAll('.sub-nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href'); // Keep the '#'
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const subNavHeight = document.querySelector('.sub-navbar')?.offsetHeight || 0;
                const totalOffset = headerHeight + subNavHeight + 20; // 20px extra spacing
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - totalOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Optional: Add scroll spy functionality if needed
// function setupScrollSpy() { ... } 
// setupScrollSpy();