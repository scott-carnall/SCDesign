const price = 8.00;

const designImages = {
  Stickerbomb: 'images/stickerbombphone.png',
  Jersey: 'images/jersey.png'
};

const phoneModels = {
  Apple: [/* ...models... */],
  Samsung: [/* ...models... */],
  Google: [/* ...models... */]
};

const designSelect = document.getElementById('design');
const brandSelect = document.getElementById('brand');
const phoneSelect = document.getElementById('phone');
const priceDisplay = document.querySelector('.price');
const mainImage = document.getElementById('mainImage');
const addToCartBtn = document.getElementById('addToCartBtn');
const thumbnails = document.querySelectorAll('.thumbnail');

// Update main image based on selected design
function updateMainImage() {
  const design = designSelect.value;
  mainImage.src = designImages[design];
  mainImage.alt = `${design} Phone Case`;
}

// Populate phone model dropdown based on brand
function updatePhoneModels() {
  const brand = brandSelect.value;
  const models = phoneModels[brand] || [];

  phoneSelect.innerHTML = '<option value="" disabled selected>Select Phone Model</option>';

  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model;
    option.textContent = model;
    phoneSelect.appendChild(option);
  });
}

// Add to cart logic
function addToCart() {
  const design = designSelect.value;
  const brand = brandSelect.value;
  const phoneModel = phoneSelect.value;

  if (!brand || !phoneModel) {
    alert("Please select both a phone brand and model.");
    return;
  }

  const item = {
    name: 'Custom Phone Case',
    design,
    phoneModel,
    price,
    image: designImages[design],
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${item.name} added to cart!`);
  updateCartCount();
}

// Update cart count bubble
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countEl = document.getElementById('cart-count-number');
  if (countEl) countEl.textContent = cart.length;
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  updateMainImage();
  updateCartCount();

  designSelect.addEventListener('change', updateMainImage);
  brandSelect.addEventListener('change', updatePhoneModels);
  addToCartBtn.addEventListener('click', addToCart);

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.src;
      const design = src.includes("stickerbomb") ? "Stickerbomb" : "Jersey";
      designSelect.value = design;
      updateMainImage();
    });
  });
});