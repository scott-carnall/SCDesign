function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById('cart-count-number');
  if (countEl) countEl.textContent = cart.length;
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

function renderCartPage() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = ''; // Clear before render

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    const itemTotal = item.price * (item.quantity || 1);
    total += itemTotal;

    div.innerHTML = `
      <img src="${item.image || 'images/default.png'}" alt="${item.name}" class="cart-item-image" />
      <div class="cart-item-details">
        <strong>${item.name}</strong><br />
        ${item.design ? `Design: ${item.design}<br />` : ''}
        ${item.size ? `Size: ${item.size}<br />` : ''}
        ${item.number ? `Number: ${item.number}<br />` : ''}
        ${item.surname ? `Surname: ${item.surname}<br />` : ''}
        ${item.insert ? `Insert: ${item.insert}<br />` : ''}
        Price: £${item.price.toFixed(2)}<br />
        <label>Qty:
          <select data-index="${index}" class="qty-select">
            ${[1,2,3,4,5].map(qty => `
              <option value="${qty}" ${item.quantity == qty ? 'selected' : ''}>${qty}</option>
            `).join('')}
          </select>
        </label>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  

  attachQtyListeners();
  
  function attachQtyListeners() {
  document.querySelectorAll('.qty-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const index = e.target.getAttribute('data-index');
      const cart = getCart();
      cart[index].quantity = parseInt(e.target.value, 10);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartPage();
      updateCartCount();
    });
  });
}

  // Grand total
  const totalEl = document.createElement('div');
  totalEl.className = 'cart-total';
  totalEl.textContent = `Grand Total: £${total.toFixed(2)}`;
  cartContainer.appendChild(totalEl);

  totalEl.innerHTML = `<h3>Grand Total: £${total.toFixed(2)}</h3>`;

// PayPal container
  const paypalContainer = document.createElement('div');
  paypalContainer.id = 'paypal-button-container';
  cartContainer.appendChild(paypalContainer);

  // Render PayPal button
  renderPayPalButton(total);
}

function renderPayPalButton(total) {
  if (typeof paypal === "undefined") return;
  document.getElementById('paypal-button-container').innerHTML = '';

  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
        localStorage.removeItem('cart');
        updateCartCount();
        renderCartPage();
      });
    }
  }).render('#paypal-button-container');
}

window.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCartPage();
});
