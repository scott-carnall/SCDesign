const productGrid = document.getElementById('productGrid');

for (let i = 1; i <= 15; i++) {
  const card = document.createElement('a');
  card.href = `product${i}.html`;
  card.className = 'product-card';

  card.innerHTML = `
    <img src="https://via.placeholder.com/300x200?text=Product+${i}" alt="Product ${i}" class="product-image" />
    <div class="product-info">
      <div class="product-title">Product ${i}</div>
      <div class="product-description">Click to view details</div>
    </div>
  `;

  productGrid.appendChild(card);
}
