// Retrieve selected options from previous pages
const tone = localStorage.getItem('selectedTone');
const undertone = localStorage.getItem('selectedUndertone');

console.log("Tone:", tone);
console.log("Undertone:", undertone);

// CORRECTED IMAGE PATHS in shadeData
const shadeData = {
    "Light-Cool": { name: "110C Porcelain Glow", img: "../assets/images/find-my-shade/110C.jpeg" },
    "Light-Neutral": { name: "120N Vanilla Veil", img: "../assets/images/find-my-shade/120N.jpeg" },
    "Light-Warm": { name: "130W Soft Cream", img: "../assets/images/find-my-shade/130W.jpeg" },
    "Medium-Cool": { name: "240C Rosy Petal", img: "../assets/images/find-my-shade/240C.jpeg" },
    "Medium-Neutral": { name: "250N Golden Sand", img: "../assets/images/find-my-shade/250N.jpeg" },
    "Medium-Warm": { name: "260W Honey Beige", img: "../assets/images/find-my-shade/260W.jpeg" },
    "Medium Deep-Cool": { name: "420C Mocha Rose", img: "../assets/images/find-my-shade/420C.jpeg" },
    "Medium Deep-Neutral": { name: "425N Caramel Beige", img: "../assets/images/find-my-shade/425N.jpeg" },
    "Medium Deep-Warm": { name: "430W Amber Honey", img: "../assets/images/find-my-shade/430W.jpeg" },
  };

const key = `${tone}-${undertone}`;
const result = shadeData[key];

// Update page content
if (result) {
  document.getElementById('shadeName').textContent = result.name;
  // Make sure the image element exists before setting src
  const shadeImageElement = document.getElementById('shadeImage');
  if (shadeImageElement) {
    shadeImageElement.src = result.img;
  } else {
    console.error("Element with ID 'shadeImage' not found.");
  }
} else {
  // Make sure the name element exists before setting textContent
  const shadeNameElement = document.getElementById('shadeName');
  if (shadeNameElement) {
    shadeNameElement.textContent = "No match found";
  } else {
    console.error("Element with ID 'shadeName' not found.");
  }
  // Optionally hide or change the image placeholder if no match
  const shadeImageElement = document.getElementById('shadeImage');
   if (shadeImageElement) {
       shadeImageElement.style.display = 'none'; // Hide image if no match
   }
}

// Navigation buttons (Make sure the functions exist)
function goBack() {
  window.location.href = "undertone.html";
}

function finishSelection() {
  showNotification("Thank you! Your perfect shade has been found 💕"); // Use showNotification
  // Optional: Redirect after notification shows
  // setTimeout(() => {
  //     window.location.href = "../index.html"; // Redirect to homepage for example
  // }, 2000); 
}

// --- ADDED: showNotification Function --- (Assuming it might be needed here too)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification'; // Reusing class name
    notification.textContent = message;
    // Basic styling (copy styles from global.js or cart.js if needed)
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: linear-gradient(135deg, var(--primary-color, #3F0A29), var(--twilight-lavender, #94426A));
        color: white; padding: 1rem 2rem; border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 1001; font-weight: 600;
        transform: translateX(120%); transition: transform 0.4s ease-in-out;
    `;
    document.body.appendChild(notification);
    // Animate in
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => { if (notification.parentNode) notification.remove(); }, 400);
    }, 3000);
}