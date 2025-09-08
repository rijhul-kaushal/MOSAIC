document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');

    // Function to animate a single counter
    const animateCounter = (counter, speedModifier, callback) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        // The speed is now based on the total target value divided by a dynamic modifier
        const increment = Math.ceil(target / (200 * speedModifier)); 

        const updateCount = () => {
            if (count < target) {
                count += increment;
                // Ensure we don't go past the target
                counter.innerText = count > target ? target : count;
                setTimeout(updateCount, 15);
            } else {
                // Animation is complete, so run the callback to start the next one
                counter.innerText = target;
                if (callback) {
                    callback();
                }
            }
        };
        updateCount();
    };

    // Chain the animations together
    // The second argument in animateCounter is the speed modifier. 
    // A higher number makes it slower, a lower number makes it faster.
    
    // Animate the first counter (Years of Innovation) - this will be slow
    animateCounter(counters[0], 2, () => {
        // Once the first counter is done, animate the second (Unique Products) - this will be faster
        animateCounter(counters[1], 1, () => {
            // Once the second counter is done, animate the third (Happy Customers) - this will be even faster
            animateCounter(counters[2], 0.5); 
        });
    });
});

// Lightbox for Gallery
const galleryImages = document.querySelectorAll(".gallery img");
galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("lightbox");
    overlay.innerHTML = `<img src="${img.src}" alt="">`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", () => overlay.remove());
  });
});