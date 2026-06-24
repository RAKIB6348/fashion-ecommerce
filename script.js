const products = [
    {
        id: 1,
        name: "Oversized Hoodie",
        price: 1890,
        category: "hoodie",
        img: "https://picsum.photos/id/29/600/800"
    },
    {
        id: 2,
        name: "Premium Sneakers",
        price: 3290,
        category: "sneakers",
        img: "https://picsum.photos/id/160/600/800"
    },
    {
        id: 3,
        name: "Denim Jacket",
        price: 2590,
        category: "men",
        img: "https://picsum.photos/id/201/600/800"
    },
    {
        id: 4,
        name: "Summer Dress",
        price: 2190,
        category: "women",
        img: "https://picsum.photos/id/30/600/800"
    },
    {
        id: 5,
        name: "Cargo Pants",
        price: 1490,
        category: "men",
        img: "https://picsum.photos/id/1015/600/800"     // ✅ Fixed
    },
    {
        id: 6,
        name: "Crop Top",
        price: 990,
        category: "women",
        img: "https://picsum.photos/id/1005/600/800"      // ✅ Fixed
    },
    {
        id: 7,
        name: "Running Shoes",
        price: 2890,
        category: "sneakers",
        img: "https://picsum.photos/id/201/600/800"
    },
    {
        id: 8,
        name: "Streetwear Hoodie",
        price: 2190,
        category: "hoodie",
        img: "https://picsum.photos/id/29/600/800"
    },
];

let cart = [];

const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const themeToggle = document.getElementById('themeToggle');

// Render Products
function renderProducts(filteredProducts) {
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg';
        div.innerHTML = `
      <img src="${product.img}" class="w-full h-80 object-cover">
      <div class="p-5">
        <h3 class="font-semibold text-lg">${product.name}</h3>
        <p class="text-pink-600 font-bold text-xl mt-2">৳${product.price}</p>
        <button class="add-to-cart w-full mt-4 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-medium">
          Add to Cart
        </button>
      </div>
    `;
        div.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
        productGrid.appendChild(div);
    });
}

// Add to Cart
function addToCart(product) {
    cart.push(product);
    updateCart();

    // Animation
    const notification = document.createElement('div');
    notification.className = "fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl";
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemHTML = `
      <div class="flex gap-4">
        <img src="${item.img}" class="w-20 h-20 object-cover rounded-2xl">
        <div class="flex-1">
          <h4 class="font-medium">${item.name}</h4>
          <p class="text-pink-600">৳${item.price}</p>
        </div>
        <button class="text-red-500" onclick="removeFromCart(${index})">×</button>
      </div>`;
        cartItems.innerHTML += itemHTML;
    });

    cartTotal.textContent = `৳${total}`;
}

// Remove from Cart
window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
};

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
        renderProducts(filtered);
    });
});

// Cart Sidebar
document.getElementById('cartBtn').addEventListener('click', () => {
    cartSidebar.classList.toggle('translate-x-full');
});

document.getElementById('closeCart').addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
});

// Dark Mode
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.innerHTML = isDark ? `<i class="fas fa-sun"></i>` : `<i class="fas fa-moon"></i>`;
});

// Initialize
renderProducts(products);