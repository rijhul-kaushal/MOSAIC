const helpText = document.getElementById('helpText');
const mainText = document.getElementById('mainText');
const undertoneOptions = document.getElementById('undertoneOptions');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let helpShown = false;

helpText.addEventListener('click', () => {
  if (!helpShown) {
    mainText.textContent =
      "Unsure? That’s OK! Just ask yourself: What color are the veins on my wrist? What tone of jewelry do I look best in?";
    undertoneOptions.innerHTML = `
      <div class="option warm">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="warm">
          <h3>WARM</h3>
          <p class="desc">My veins appear <strong>green</strong> or <strong>yellow gold jewelry</strong> looks best on me.</p>
        </label>
      </div>

      <div class="option neutral">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="neutral">
          <h3>NEUTRAL</h3>
          <p class="desc">My veins appear <strong>blue-green</strong> or <strong>all shades of jewelry</strong> look good on me.</p>
        </label>
      </div>

      <div class="option cool">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="cool">
          <h3>COOL</h3>
          <p class="desc">My veins appear <strong>purple</strong> or <strong>silver & platinum jewelry</strong> look best on me.</p>
        </label>
      </div>
    `;
    helpText.textContent = "I KNOW MY UNDERTONE";
    helpShown = true;
  } else {
    mainText.textContent = "Choose the group that best represents your skin tone.";
    undertoneOptions.innerHTML = `
      <div class="option warm">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="warm">
          <h3>WARM</h3>
          <p class="desc">On the yellow-peach-golden side.</p>
        </label>
      </div>

      <div class="option neutral">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="neutral">
          <h3>NEUTRAL</h3>
          <p class="desc">Not too pink, not too yellow — kind of both.</p>
        </label>
      </div>

      <div class="option cool">
        <div class="line"></div>
        <label>
          <input type="radio" name="undertone" value="cool">
          <h3>COOL</h3>
          <p class="desc">On the pink, red, blue side.</p>
        </label>
      </div>
    `;
    helpText.textContent = "HELP, I'M NOT SURE";
    helpShown = false;
  }
});

prevBtn.addEventListener('click', () => {
  window.location.href = "findshade.html"; // link to previous page
});

nextBtn.addEventListener('click', () => {
  window.location.href = "yourshade.html"; // link to next page
});

nextBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="undertone"]:checked');
  if(selected) {
    localStorage.setItem('selectedUndertone', selected.value.charAt(0).toUpperCase() + selected.value.slice(1)); 
    // capitalize first letter to match your shadeData keys: Cool, Warm, Neutral
    window.location.href = "yourshade.html";
  } else {
    alert("Please select an undertone");
  }
});
