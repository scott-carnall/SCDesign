const slidesPrices = {
  4: 16.00,
  5: 16.00,
  5.5: 16.00,
  6.5: 16.00,
  7: 16.00,
  8: 16.00,
  8.5: 16.00,
  9.5: 16.00,
  10: 16.00,
  11: 16.00,
  12: 16.00,
  12.5: 16.00,
  13.5: 16.00
};

document.addEventListener('DOMContentLoaded', () => {
  const sizeSelect = document.getElementById('size-select');
  const customTextInput = document.getElementById('custom-text');
  const priceDisplay = document.getElementById('price-display');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  // Update price based on size selection
  function updatePrice() {
    const size = parseFloat(sizeSelect.value);
    const price = slidesPrices[size];
    priceDisplay.textContent = `£${price.toFixed(2)}`;
  }

  // Add to cart functionality
  function addToCart() {
    const size = sizeSelect.value;
    const customText = customTextInput.value;
    const price = slidesPrices[size];
    const image = 'images/Ducks Slides.png';

    if (!size || customText.length > 2 || isNaN(customText)) {
      alert('Please select a valid size and enter a maximum of 2 digits.');
      return;
    }

    const item = {
      name: 'Slides',
      size,
      customText,
      price,
      image,
      quantity: 1
    };

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Slides added to cart!');
    updateCartCount();
  }

  // Update cart count in the header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('cart-count-number');
    if (countEl) countEl.textContent = cart.length;
  }

  sizeSelect.addEventListener('change', updatePrice);
  addToCartBtn.addEventListener('click', addToCart);

  // Initialize the price display
  updatePrice();
  updateCartCount();
});
