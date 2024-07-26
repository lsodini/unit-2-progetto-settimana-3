const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVjY2YyNjBjYzAwMTVjYzBkZDQiLCJpYXQiOjE3MjE5ODAzNjQsImV4cCI6MTcyMzE4OTk2NH0.K87QDaj1lcnZmTv1yvXdlNqmTa8Rasd704rnX7ftOi8';

// Fetch products from the API
function fetchProducts() {
  return fetch(API_URL, {
    headers: {
      Authorization: API_TOKEN
    }
  }).then(response => response.json());
}

// Display products on the homepage
function displayProducts(products) {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';
  products.forEach(product => {
    const productCard = `
      <div class="col-md-4 mb-4">
	  <div class="card shadow-sm">
          <a href="detail.html?productId=${product._id}">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          </a>
          <div class="card-body oro">
		   <a href="detail.html?productId=${product._id}" >
            <h5 class="card-title">${product.name}</h5>
			 </a>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
            <p class="card-text"><strong>Price:</strong> ${product.price} crediti</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="backoffice.html?productId=${product._id}" class="btn btn-sm btn-outline-primary">Edit</a>
                  
				</div>
         <div >
         <a href="#" class="btn-primary btn">BUY</a>
         	</div>
            </div>
          </div>
        </div>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });
}

// Initialize the homepage
if (document.getElementById('product-container')) {
  fetchProducts().then(displayProducts).catch(error => console.error('Error fetching products:', error));
}
