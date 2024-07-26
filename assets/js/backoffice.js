const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVjY2YyNjBjYzAwMTVjYzBkZDQiLCJpYXQiOjE3MjE5ODAzNjQsImV4cCI6MTcyMzE4OTk2NH0.K87QDaj1lcnZmTv1yvXdlNqmTa8Rasd704rnX7ftOi8';

function handleFormSubmit(event) {
  event.preventDefault();
  const productId = document.getElementById('productId').value;
  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    brand: document.getElementById('brand').value,
    price: parseFloat(document.getElementById('price').value),
    imageUrl: document.getElementById('imageUrl').value
  };

  if (productId) {
    // modifica di un prodotto esistente
    updateProduct(productId, product)
      .then(data => {
        alert('Product updated successfully!');
        resetForm();
      })
      .catch(error => {
        console.error('Error updating product:', error);
        alert('Error updating product. Please try again.');
      });
  } else {
    // Creazione di un nuovo prodotto
    createProduct(product)
      .then(data => {
        alert('Product created successfully!');
        resetForm();
      })
      .catch(error => {
        console.error('Error creating product:', error);
        alert('Error creating product. Please try again.');
      });
  }
}

function createProduct(product) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_TOKEN
    },
    body: JSON.stringify(product)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });
}

function updateProduct(productId, product) {
  return fetch(`${API_URL}${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_TOKEN
    },
    body: JSON.stringify(product)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });
}

function deleteProduct(productId) {
  return fetch(`${API_URL}${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: API_TOKEN
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });
}

function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('productId').value = '';
  document.getElementById('delete-btn').style.display = 'none';
  document.getElementById('submit-btn').textContent = 'Add Product';
}

function loadProductDetails(productId) {
  fetch(`${API_URL}${productId}`, {
    headers: {
      Authorization: API_TOKEN
    }
  }).then(response => response.json())
    .then(product => {
      document.getElementById('productId').value = product._id;
      document.getElementById('name').value = product.name;
      document.getElementById('description').value = product.description;
      document.getElementById('brand').value = product.brand;
      document.getElementById('price').value = product.price;
      document.getElementById('imageUrl').value = product.imageUrl;
      document.getElementById('submit-btn').textContent = 'Update Product';
      document.getElementById('delete-btn').style.display = 'inline-block';
    })
    .catch(error => console.error('Error loading product details:', error));
}

document.getElementById('product-form').addEventListener('submit', handleFormSubmit);
document.getElementById('delete-btn').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete this product?')) {
    const productId = document.getElementById('productId').value;
    if (productId) {
      deleteProduct(productId)
        .then(() => {
          alert('Product deleted successfully!');
          resetForm();
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          alert('Error deleting product. Please try again.');
        });
    }
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Are you sure you want to reset the form? All unsaved changes will be lost.')) {
    resetForm();
  }
});

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  if (productId) {
    loadProductDetails(productId);
  }
};
