const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVjY2YyNjBjYzAwMTVjYzBkZDQiLCJpYXQiOjE3MjE5ODAzNjQsImV4cCI6MTcyMzE4OTk2NH0.K87QDaj1lcnZmTv1yvXdlNqmTa8Rasd704rnX7ftOi8';

// Funzione per ottenere i parametri dalla URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    productId: params.get('productId')
  };
}

// Funzione per caricare i dettagli del prodotto
function fetchProductDetails(productId) {
  return fetch(`${API_URL}${productId}`, {
    headers: {
      Authorization: API_TOKEN
    }
  }).then(response => response.json());
}

// Funzione per visualizzare i dettagli del prodotto
function displayProductDetails(product) {
  const productDetailContainer = document.getElementById('product-detail');
  productDetailContainer.innerHTML = `
    <div class="card mb-4 shadow-sm">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
        <p class="card-text"><strong>Price:</strong> ${product.price} crediti</p>
        <a href="index.html" class="btn btn-primary">Back to Home</a>
      </div>
    </div>
  `;
}

// Inizializzare la pagina dei dettagli
const { productId } = getQueryParams();
if (productId) {
  fetchProductDetails(productId)
    .then(displayProductDetails)
    .catch(error => console.error('Error fetching product details:', error));
}
