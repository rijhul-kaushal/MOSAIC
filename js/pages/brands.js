/*
    Brands Page JavaScript for Mosaic Project
    Handles product scroller functionality similar to eyes page
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product scrollers
    initializeProductScrollers();
    
    // Set up smooth scrolling for navigation
    setupSmoothScrolling();
});

function initializeProductScrollers() {
    // Get all product scrollers
    const scrollers = document.querySelectorAll('.product-scroller');
    
    scrollers.forEach(scroller => {
        const container = scroller.closest('.product-scroller-container');
        const leftArrow = container.querySelector('.left-arrow');
        const rightArrow = container.querySelector('.right-arrow');
        
        // Add click event listeners for arrows
        if (leftArrow) {
            leftArrow.addEventListener('click', () => scrollLeft(scroller));
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => scrollRight(scroller));
        }
        
        // Add touch/swipe support for mobile
        addTouchSupport(scroller);
    });
}

function scrollLeft(scroller) {
    const scrollAmount = 280; // Width of one product card + gap
    scroller.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
}

function scrollRight(scroller) {
    const scrollAmount = 280; // Width of one product card + gap
    scroller.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function addTouchSupport(scroller) {
    let startX = 0;
    let scrollLeft = 0;
    
    scroller.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });
    
    scroller.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const x = e.touches[0].pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scroller.scrollLeft = scrollLeft - walk;
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling for sub-navigation links
    document.querySelectorAll('.sub-nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const subNavHeight = document.querySelector('.sub-navbar').offsetHeight;
                const totalOffset = headerHeight + subNavHeight + 20; // 20px extra spacing
                
                const targetPosition = targetElement.offsetTop - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll spy functionality to highlight active section
function setupScrollSpy() {
    const sections = document.querySelectorAll('.product-category');
    const navLinks = document.querySelectorAll('.sub-nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 200; // Offset for header
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize scroll spy
setupScrollSpy();

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .sub-nav-links a.active {
        color: var(--middle-purple);
        border-bottom: 2px solid var(--middle-purple);
    }
`;
document.head.appendChild(style);