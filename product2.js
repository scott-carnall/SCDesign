const deskpadPrices = {
  small: 8.00,
  medium: 10.00,
  large: 11.00,
  xlarge: 12.00
};

document.addEventListener('DOMContentLoaded', () => {
  const sizeSelect = document.getElementById('size-select');
  const priceDisplay = document.getElementById('price-display');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  function updatePrice() {
    const size = sizeSelect.value;
    const price = deskpadPrices[size];
    priceDisplay.textContent = `£${price.toFixed(2)}`;
  }

  function addToCart() {
    const size = sizeSelect.value;
    const price = deskpadPrices[size];
    const image = 'images/Desk.png';

    const item = {
      name: 'Deskpad',
      size,
      price,
      image,
      quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Deskpad added to cart!');
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('cart-count-number');
    if (countEl) countEl.textContent = cart.length;
  }

  sizeSelect.addEventListener('change', updatePrice);
  addToCartBtn.addEventListener('click', addToCart);

  updatePrice();
  updateCartCount();
});