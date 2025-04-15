const prices = {
  home: 5.00,
  away: 5.00,
  third: 5.00
};

const designImages = {
  home: 'images/hometowel.png',
  away: 'images/awaytowel.png',
  third: 'images/thirdtowel.png'
};

document.addEventListener('DOMContentLoaded', () => {
  const designSelect = document.getElementById('design-select');
  const surnameInput = document.getElementById('surname-input');
  const numberInput = document.getElementById('number-input');
  const priceDisplay = document.getElementById('price-display');
  const mainImage = document.getElementById('mainImage');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const thumbnails = document.querySelectorAll('.thumbnail');

  function updateImage() {
    const design = designSelect.value;
    mainImage.src = designImages[design];
  }

  function addToCart() {
    const design = designSelect.value;
    const surname = surnameInput.value.trim();
    const number = numberInput.value.trim();
    const price = prices[design];
    const image = designImages[design];

    const item = {
      name: `Visor Towel (${design})`,
      design,
      surname,
      number,
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

  designSelect.addEventListener('change', updateImage);

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const design = thumb.getAttribute('data-design');
      designSelect.value = design;
      updateImage();
    });
  });

  addToCartBtn.addEventListener('click', addToCart);

  updateImage();
  updateCartCount();
});
