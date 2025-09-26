// esteregg.js
window.addEventListener("DOMContentLoaded", () => {
  // Initialize Konami code listener
  const easterEgg = new Konami(() => {
    const img = document.createElement("img");
    img.src = "/static/images/deepfried_1757435754587.jpeg"; // make sure path matches your project

    // Style for big, centered image
    img.style.position = "fixed";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)"; // perfectly center
    img.style.width = "50vw"; // 50% of viewport width
    img.style.height = "auto"; // maintain aspect ratio
    img.style.zIndex = 9999;
    img.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
    img.style.borderRadius = "10px";
    img.style.transition = "transform 0.5s ease, opacity 0.5s ease"; // smooth animation
    img.style.opacity = "0";

    document.body.appendChild(img);

    // Animate in
    requestAnimationFrame(() => {
      img.style.opacity = "1";
      img.style.transform = "translate(-50%, -50%) scale(1.05)";
    });

    // Animate out after 5 seconds
    setTimeout(() => {
      img.style.opacity = "0";
      img.style.transform = "translate(-50%, -50%) scale(0.95)";
      setTimeout(() => img.remove(), 500); // remove after fade out
    }, 5000);
  });
});
