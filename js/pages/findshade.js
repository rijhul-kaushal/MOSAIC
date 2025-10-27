/* 
 Behavior:
 - When slider changes, compute how much to translate the track so that the selected item's center
   aligns with the carousel center (pixel-perfect).
 - Uses current transform parsing to keep transitions smooth.
 - Adds/removes .active class to toggle blur/opacity/scale.
*/

const slider = document.getElementById('shadeSlider');
const track  = document.getElementById('track');
const items  = Array.from(document.querySelectorAll('.shade-item'));
const carousel = document.getElementById('carousel');

// helper to parse current translateX of track (returns number px)
function getCurrentTranslateX(elem){
  const style = window.getComputedStyle(elem);
  const matrix = style.transform || style.webkitTransform;
  if(matrix && matrix !== 'none'){
    const values = matrix.match(/matrix.*\((.+)\)/)[1].split(',').map(v=>v.trim());
    // matrix(a, b, c, d, tx, ty) -> tx is 5th value
    return parseFloat(values[4]);
  }
  return 0;
}

// center a specific index (0-based)
function centerIndex(index){
  const item = items[index];
  if(!item) return;

  // compute current translate and the pixel delta we need
  const carouselRect = carousel.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();

  // center positions (absolute to viewport)
  const carouselCenter = carouselRect.left + carouselRect.width / 2;
  const itemCenter     = itemRect.left + itemRect.width / 2;

  // delta in px to move the item to carousel center
  const neededDelta = carouselCenter - itemCenter;

  // current translate of track
  const currentTranslate = getCurrentTranslateX(track);

  // new translate
  const newTranslate = currentTranslate + neededDelta;

  // apply transform
  track.style.transform = `translateX(${newTranslate}px)`;

  // set active class
  items.forEach((it, i) => it.classList.toggle('active', i === index));
}

// when slider moves
slider.addEventListener('input', () => {
  const idx = parseInt(slider.value, 10) - 1;
  centerIndex(idx);
});

// init on load: set the right active image
window.addEventListener('load', () => {
  // small delay to ensure layout & measurements are ready
  setTimeout(() => {
    const startIdx = parseInt(slider.value, 10) - 1;
    // reset transform to zero for a reproducible baseline
    track.style.transform = `translateX(0px)`;
    // force reflow then center
    void track.offsetHeight;
    centerIndex(startIdx);
  }, 50);
});

// If window resizes we need to re-center current selected
window.addEventListener('resize', () => {
  const idx = parseInt(slider.value, 10) - 1;
  // small debounce
  clearTimeout(window._shadeResize);
  window._shadeResize = setTimeout(() => centerIndex(idx), 120);
});


// at the bottom of find-shade.js, replace the old Continue code
document.querySelector('.continue-btn').addEventListener('click', () => {
    window.location.href = 'undertone.html';
  });

document.querySelector('.continue-btn').addEventListener('click', () => {
    const sliderValue = parseInt(slider.value, 10); // 1-6
    let tone;
  
    if(sliderValue <= 2) tone = "Light";
    else if(sliderValue <= 4) tone = "Medium";
    else tone = "Medium Deep";
  
    localStorage.setItem('selectedTone', tone); // <-- SAVE the tone
    window.location.href = 'undertone.html';
  });
  
  