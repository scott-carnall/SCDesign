window.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const fullImage = thumb.getAttribute("data-full");
      mainImage.src = fullImage;
    });
  });
});
