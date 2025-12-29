// Sample product data
const products = [
    { id: 1, name: 'Smartphone', category: 'Electronics', price: 25000, originalPrice: 35000, icon: '📱', rating: 4.5 },
    { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 5000, originalPrice: 8000, icon: '🎧', rating: 4.3 },
    { id: 3, name: 'Laptop', category: 'Electronics', price: 80000, originalPrice: 120000, icon: '💻', rating: 4.7 },
    { id: 4, name: 'Designer T-Shirt', category: 'Fashion', price: 1500, originalPrice: 2500, icon: '👕', rating: 4.2 },
    { id: 5, name: 'Blue Jeans', category: 'Fashion', price: 2000, originalPrice: 3500, icon: '👖', rating: 4.4 },
    { id: 6, name: 'Running Shoes', category: 'Fashion', price: 4000, originalPrice: 6500, icon: '👟', rating: 4.6 },
    { id: 7, name: 'Sofa Set', category: 'Home & Living', price: 45000, originalPrice: 70000, icon: '🛋️', rating: 4.5 },
    { id: 8, name: 'Dining Table', category: 'Home & Living', price: 25000, originalPrice: 40000, icon: '🪑', rating: 4.3 },
    { id: 9, name: 'Wall Clock', category: 'Home & Living', price: 1500, originalPrice: 2500, icon: '⏰', rating: 4.1 },
    { id: 10, name: 'Basketball', category: 'Sports', price: 2500, originalPrice: 4000, icon: '🏀', rating: 4.4 },
    { id: 11, name: 'Cricket Bat', category: 'Sports', price: 3500, originalPrice: 5500, icon: '🏏', rating: 4.3 },
    { id: 12, name: 'Yoga Mat', category: 'Sports', price: 1200, originalPrice: 2000, icon: '🧘', rating: 4.5 }
];

let cart = [];
let filteredProducts = [...products];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// Render products to the grid
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-rating">⭐ ${product.rating}</div>
                <div class="product-price">
                    <span class="current-price">Rs ${product.price.toLocaleString()}</span>
                    <span class="original-price">Rs ${product.originalPrice.toLocaleString()}</span>
                    <span class="product-discount">-${discount}%</span>
                </div>
                <button class="product-button" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter products by category
function filterByCategory(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    renderProducts();
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = `Cart (${totalItems})`;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ffc400; color: white; padding: 15px 20px; border-radius: 4px; z-index: 1000; animation: slideIn 0.3s ease;';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Category filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.nav-item');
    categoryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'];
            if (index < categories.length) {
                filterByCategory(categories[index]);
            }
        });
    });
});
