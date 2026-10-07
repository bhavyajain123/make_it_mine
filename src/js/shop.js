
const products = [
    {id:1,name:"Classic Custom T-Shirt",category:"T-Shirts",price:599,oldPrice:799,emoji:"👕",rating:4.8,stock:true,badge:"Bestseller"},
    {id:2,name:"Personalized Photo Mug",category:"Mugs",price:399,oldPrice:499,emoji:"☕",rating:4.7,stock:true,badge:"Popular"},
    {id:3,name:"Good Vibes Hoodie",category:"Hoodies",price:999,oldPrice:1299,emoji:"🧥",rating:4.9,stock:true,badge:"Trending"},
    {id:4,name:"Custom Phone Case",category:"Phone Cases",price:499,oldPrice:699,emoji:"📱",rating:4.6,stock:true,badge:"New"},
    {id:5,name:"Minimal Canvas Tote",category:"Tote Bags",price:349,oldPrice:449,emoji:"👜",rating:4.7,stock:true,badge:"Eco Pick"},
    {id:6,name:"Personalized Photo Frame",category:"Photo Gifts",price:699,oldPrice:899,emoji:"🖼️",rating:4.9,stock:true,badge:"Gift Pick"},
    {id:7,name:"Custom Embroidered Cap",category:"Caps",price:299,oldPrice:399,emoji:"🧢",rating:4.5,stock:true,badge:"Popular"},
    {id:8,name:"Memory Cushion",category:"Home Gifts",price:549,oldPrice:749,emoji:"🛋️",rating:4.8,stock:false,badge:"Sold Out"},
    {id:9,name:"Personalized Sweatshirt",category:"Hoodies",price:1199,oldPrice:1499,emoji:"👚",rating:4.7,stock:true,badge:"New"},
    {id:10,name:"Custom Travel Mug",category:"Mugs",price:649,oldPrice:799,emoji:"🥤",rating:4.6,stock:true,badge:"Travel Pick"},
    {id:11,name:"Printed Graphic Tee",category:"T-Shirts",price:699,oldPrice:899,emoji:"👕",rating:4.8,stock:true,badge:"Trending"},
    {id:12,name:"Memory Photo Gift",category:"Photo Gifts",price:899,oldPrice:1099,emoji:"🎁",rating:4.9,stock:true,badge:"Gift Pick"}
];

const money = value => "₹" + value.toLocaleString("en-IN");

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("mim-cart") || "[]");
    } catch {
        return [];
    }
}

function updateCartCount() {
    const total = getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
    document.getElementById("cart-count").textContent = total;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product || !product.stock) {
        showToast("This product is currently unavailable.");
        return;
    }

    const cart = getCart();
    const existing = cart.find(item => Number(item.id) === id);

    if (existing) {
        existing.qty = Number(existing.qty || 0) + 1;
    } else {
        cart.push({...product, qty:1, customText:""});
    }

    localStorage.setItem("mim-cart", JSON.stringify(cart));
    updateCartCount();
    showToast("Product added to cart!");
}

function renderProducts() {
    const search = document.getElementById("search-input").value.trim().toLowerCase();
    const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(input => input.value);
    const minValue = document.getElementById("min-price").value;
    const maxValue = document.getElementById("max-price").value;
    const stockOnly = document.getElementById("in-stock").checked;
    const sort = document.getElementById("sort-select").value;

    let filtered = products.filter(product => {
        const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesMin = minValue === "" || product.price >= Number(minValue);
        const matchesMax = maxValue === "" || product.price <= Number(maxValue);
        const matchesStock = !stockOnly || product.stock;

        return matchesSearch && matchesCategory && matchesMin && matchesMax && matchesStock;
    });

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

    document.getElementById("results-count").textContent =
        `Showing ${filtered.length} of ${products.length} products`;

    const grid = document.getElementById("product-grid");

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div>🔎</div>
                <h3>No products found</h3>
                <p>Try changing your search or filters.</p>
                <button class="btn" onclick="resetFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <article class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <div class="product-image">
                    <span>${product.emoji}</span>
                    <span class="product-badge">${product.badge}</span>
                </div>
            </a>

            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>

                <div class="rating">
                    ★ ${product.rating} <span style="color:#737382">/ 5.0</span>
                </div>

                <div class="price-row">
                    <div>
                        <span class="price">${money(product.price)}</span>
                        <span class="old-price">${money(product.oldPrice)}</span>
                    </div>
                </div>

                <div class="product-actions">
                    <a class="btn btn-secondary" href="customize.html?id=${product.id}">Customize</a>
                    <button class="btn" onclick="addToCart(${product.id})" ${!product.stock ? "disabled style='opacity:.5'" : ""}>
                        ${product.stock ? "Add to Cart" : "Sold Out"}
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function resetFilters() {
    document.getElementById("search-input").value = "";
    document.querySelectorAll('input[name="category"]').forEach(input => input.checked = false);
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";
    document.getElementById("in-stock").checked = false;
    document.getElementById("sort-select").value = "featured";
    renderProducts();
}

document.getElementById("search-input").addEventListener("input", renderProducts);

document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener("change", renderProducts);
});

document.getElementById("apply-price").addEventListener("click", () => {
    const min = document.getElementById("min-price").value;
    const max = document.getElementById("max-price").value;

    if (min !== "" && Number(min) < 0 || max !== "" && Number(max) < 0) {
        showToast("Price cannot be negative.");
        return;
    }

    if (min !== "" && max !== "" && Number(min) > Number(max)) {
        showToast("Minimum price cannot exceed maximum price.");
        return;
    }

    renderProducts();
});

document.getElementById("in-stock").addEventListener("change", renderProducts);
document.getElementById("sort-select").addEventListener("change", renderProducts);
document.getElementById("reset-filters").addEventListener("click", resetFilters);

const params = new URLSearchParams(window.location.search);
const requestedCategory = params.get("category");

if (requestedCategory) {
    const categoryMap = {
        tshirt: "T-Shirts",
        hoodie: "Hoodies",
        mug: "Mugs",
        phone: "Phone Cases"
    };

    const category = categoryMap[requestedCategory.toLowerCase()];

    if (category) {
        const checkbox = [...document.querySelectorAll('input[name="category"]')]
            .find(input => input.value === category);

        if (checkbox) checkbox.checked = true;
    }
}

updateCartCount();
renderProducts(); 