
const products = [
    {
        id: 1,
        name: "Classic Custom T-Shirt",
        category: "T-Shirts",
        price: 599,
        oldPrice: 799,
        emoji: "👕",
        rating: "4.8",
        reviews: 120
    },
    {
        id: 2,
        name: "Personalized Photo Mug",
        category: "Mugs",
        price: 399,
        oldPrice: 499,
        emoji: "☕",
        rating: "4.7",
        reviews: 87
    },
    {
        id: 3,
        name: "Good Vibes Hoodie",
        category: "Hoodies",
        price: 999,
        oldPrice: 1299,
        emoji: "🧥",
        rating: "4.9",
        reviews: 96
    },
    {
        id: 4,
        name: "Custom Phone Case",
        category: "Phone Cases",
        price: 499,
        oldPrice: 699,
        emoji: "📱",
        rating: "4.6",
        reviews: 73
    },
    {
        id: 5,
        name: "Minimal Canvas Tote",
        category: "Tote Bags",
        price: 349,
        oldPrice: 449,
        emoji: "👜",
        rating: "4.7",
        reviews: 54
    },
    {
        id: 6,
        name: "Personalized Photo Frame",
        category: "Photo Gifts",
        price: 699,
        oldPrice: 899,
        emoji: "🖼️",
        rating: "4.9",
        reviews: 61
    },
    {
        id: 7,
        name: "Custom Cap",
        category: "Caps",
        price: 299,
        oldPrice: 399,
        emoji: "🧢",
        rating: "4.5",
        reviews: 42
    },
    {
        id: 8,
        name: "Memory Cushion",
        category: "Home Gifts",
        price: 549,
        oldPrice: 749,
        emoji: "🛋️",
        rating: "4.8",
        reviews: 68
    }
];

const money = amount =>
    "₹" + Number(amount).toLocaleString("en-IN");

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("mim-cart") || "[]");
    } catch {
        return [];
    }
}

function updateCartCount() {
    const count = getCart().reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    document.getElementById("cart-count").textContent = count;
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

    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === id);

   if (existing) {
    existing.quantity = Number(existing.quantity || 1) + 1;
} else {
    cart.push({
        ...product,
        quantity: 1,
        customText: ""
    });
}

    localStorage.setItem("mim-cart", JSON.stringify(cart));

    updateCartCount();
    showToast("Product added to your cart!");
}

function productCard(product) {
    return `
        <article class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <div class="product-image">
                    <span>${product.emoji}</span>
                    <button
                        class="heart"
                        type="button"
                        aria-label="Save product"
                        onclick="event.preventDefault();event.stopPropagation();showToast('Wishlist demo!')"
                    >♡</button>
                </div>
            </a>

            <div class="product-info">
                <h3>${product.name}</h3>

                <div class="rating">
                    ★ ${product.rating}
                    <span class="muted">(${product.reviews} reviews)</span>
                </div>

                <div class="price-row">
                    <div class="price">
                        ${money(product.price)}
                        <span class="old-price">${money(product.oldPrice)}</span>
                    </div>
                </div>

                <div class="product-actions">
                    <a
                        class="btn btn-secondary"
                        href="customize.html?id=${product.id}"
                    >Customize</a>

                    <button
                        class="btn"
                        type="button"
                        onclick="addToCart(${product.id})"
                    >Add to cart</button>
                </div>
            </div>
        </article>
    `;
}

function renderProducts(searchTerm = "") {
    const grid = document.getElementById("featured-products");
    const noResults = document.getElementById("no-results");

    const filteredProducts = products.filter(product => {
        const searchableText =
            `${product.name} ${product.category}`.toLowerCase();

        return searchableText.includes(searchTerm.toLowerCase());
    });

    grid.innerHTML = filteredProducts.map(productCard).join("");
    noResults.style.display = filteredProducts.length ? "none" : "block";
}

document.getElementById("search-input").addEventListener("input", event => {
    renderProducts(event.target.value.trim());
});

document.getElementById("newsletter-form").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("newsletter-email").value;

    if (email) {
        showToast("Thanks for joining MakeItMine!");
        event.target.reset();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderProducts();
});
