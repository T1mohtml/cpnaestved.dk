// esteregg.js
window.addEventListener("DOMContentLoaded", () => {
  // Initialize Konami code listener
  const easterEgg = new Konami(() => {
    // Create image
    const img = document.createElement("img");
    img.src = "/static/images/chimken.jpeg"; // path to rubber chicken image
    img.style.position = "fixed";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "30vw";
    img.style.height = "auto";
    img.style.zIndex = 9999;
    img.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
    img.style.borderRadius = "10px";
    img.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    img.style.opacity = "0";

    document.body.appendChild(img);

    // Create sound
    const audio = document.createElement("audio");
    audio.src = "/static/sounds/chimken.mp3"; // path to squeak sound
    audio.play();

    // Animate in
    requestAnimationFrame(() => {
      img.style.opacity = "1";
      img.style.transform = "translate(-50%, -50%) scale(1.1)";
    });

    // Bounce effect
    let scaleUp = true;
    const bounceInterval = setInterval(() => {
      img.style.transform = `translate(-50%, -50%) scale(${scaleUp ? 1.15 : 1.05})`;
      scaleUp = !scaleUp;
    }, 300);

    // Animate out after 5 seconds
    setTimeout(() => {
      clearInterval(bounceInterval);
      img.style.opacity = "0";
      img.style.transform = "translate(-50%, -50%) scale(0.95)";
      setTimeout(() => img.remove(), 500);
    }, 5000);
  });
});
