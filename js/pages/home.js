// This script handles functionality specific to the home page.

// Function to set the video start time.
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('.hero-video');
    
    // Set the current time to 3 seconds, delaying the start.
    if (heroVideo) {
        heroVideo.currentTime = 3; 
    }
});