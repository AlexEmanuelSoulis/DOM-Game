// Cache DOM elements
let hudName     = document.querySelector("#hudName");
let username    = document.querySelector("#inputUsername");
let startBtn    = document.querySelector("#start");
let screenGame  = document.querySelector("#screenGame");
let screenPortal= document.querySelector("#screenPortal"); // the login screen
let triesEl     = document.querySelector("#hudScore");

// Persistent tries counter (doesn't reset every click)
let triesCount = 0;

// Switch screens & update HUD on Start
if (startBtn) {
  startBtn.addEventListener("click", (e) => {
    // Prevent form submit/reload if the button is inside a form
    e.preventDefault();

    const name = (username?.value || "").trim();

    // Validate raw name (not the "Welcome, ..." string)
    if (name.length < 3) {
      console.log("Le pseudo doit avoir au moins 3 caractères.");
      return;
    }

    // Update HUD name
    hudName.textContent = `Welcome, ${name}`;

    // Show game, hide portal
    screenGame?.classList.remove("hidden");
    screenPortal?.classList.add("hidden");

    // Update tries
    triesCount += 1;
    triesEl.textContent = `Number of tries: ${triesCount}`;

    console.log("Game screen toggled");
  });
}


let backBtn = document.querySelector("#back");
// Switch back to portal screen
if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    // Prevent form submit/reload if the button is inside a form
    e.preventDefault();

    // Hide game, show portal
    screenGame?.classList.add("hidden");
    screenPortal?.classList.remove("hidden");

    console.log("Back to portal screen");
  });
}
// Update tries on every click
backBtn.addEventListener("click", () => {
  triesCount = 0;
  startBtn.style.display = "none"; // Hide the start button by default
  });

