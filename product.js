const prices = {
  quackattack: { small: 13.00, medium: 15.00, large: 18.00 },
  dark: { small: 13.00, medium: 15.00, large: 18.00 },
  stickerbomb: { small: 13.00, medium: 15.00, large: 18.00 }
};

const designImages = {
  quackattack: 'images/quackattack.png',
  dark: 'images/dark.png',
  stickerbomb: 'images/stickerbomb.png'
};

document.addEventListener('DOMContentLoaded', () => {
  const designSelect = document.getElementById('design-select');
  const sizeSelect = document.getElementById('size-select');
  const priceDisplay = document.getElementById('price-display');
  const mainImage = document.getElementById('mainImage');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const thumbnails = document.querySelectorAll('.thumbnail');

  function updatePrice() {
    const design = designSelect.value;
    const size = sizeSelect.value;
    const price = prices[design][size];
    priceDisplay.textContent = `£${price.toFixed(2)}`;
  }

  function updateImage() {
    const design = designSelect.value;
    mainImage.src = designImages[design];
  }

  function addToCart() {
    const design = designSelect.value;
    const size = sizeSelect.value;
    const price = prices[design][size];
    const image = designImages[design];

    const item = {
      name: 'Custom Blanket',
      design,
      size,
      price,
      image,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${item.name} added to cart!`);
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('cart-count-number');
    if (countEl) countEl.textContent = cart.length;
  }

  designSelect.addEventListener('change', () => {
    updatePrice();
    updateImage();
  });

  sizeSelect.addEventListener('change', updatePrice);
  addToCartBtn.addEventListener('click', addToCart);

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const design = thumb.getAttribute('data-design');
      designSelect.value = design;
      updatePrice();
      updateImage();
    });
  });

  updatePrice();
  updateImage();
  updateCartCount();
});
