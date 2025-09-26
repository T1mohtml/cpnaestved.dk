
const easterEgg = new Konami(() => {
  const img = document.createElement("img");
  img.src = "/static/images/deepfried_1757435754587.jpeg";
  img.style.position = "fixed";
  img.style.bottom = "20px";
  img.style.right = "20px";
  img.style.width = "150px";
  img.style.zIndex = 1000;
  document.body.appendChild(img);

  // Optional: remove after 5 seconds
  setTimeout(() => img.remove(), 5000);
});
