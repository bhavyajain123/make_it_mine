
const CART_KEY = "mim-cart";

const catalog = [
    {id:1,name:"Classic Custom T-Shirt",category:"T-Shirts",price:599,oldPrice:799,emoji:"👕",rating:4.8,description:"Your style, your design.",badge:"Bestseller"},
    {id:2,name:"Personalized Photo Mug",category:"Mugs",price:399,oldPrice:499,emoji:"☕",rating:4.7,description:"A little memory in every sip.",badge:"Popular"},
    {id:3,name:"Good Vibes Hoodie",category:"Hoodies",price:999,oldPrice:1299,emoji:"🧥",rating:4.9,description:"Cozy comfort with your touch.",badge:"Trending"},
    {id:4,name:"Custom Phone Case",category:"Phone Cases",price:499,oldPrice:699,emoji:"📱",rating:4.6,description:"Make your everyday a little more you.",badge:"New"},
    {id:5,name:"Minimal Canvas Tote",category:"Tote Bags",price:349,oldPrice:449,emoji:"👜",rating:4.7,description:"Your essentials, your style.",badge:"Eco Pick"},
    {id:6,name:"Personalized Photo Frame",category:"Photo Gifts",price:699,oldPrice:899,emoji:"🖼️",rating:4.9,description:"Keep your favorite moments close.",badge:"Gift Pick"},
    {id:7,name:"Custom Embroidered Cap",category:"Caps",price:299,oldPrice:399,emoji:"🧢",rating:4.5,description:"A little detail that says a lot.",badge:"Popular"},
    {id:8,name:"Memory Cushion",category:"Home Gifts",price:549,oldPrice:749,emoji:"🛋️",rating:4.8,description:"Comfort with a personal touch.",badge:"Gift Idea"},
    {id:9,name:"Personalized Sweatshirt",category:"Hoodies",price:1199,oldPrice:1499,emoji:"👚",rating:4.8,description:"Made for your everyday moments.",badge:"New"},
    {id:10,name:"Custom Travel Mug",category:"Mugs",price:649,oldPrice:799,emoji:"🥤",rating:4.7,description:"Take your favorite memories along.",badge:"Popular"},
    {id:11,name:"Printed Graphic Tee",category:"T-Shirts",price:699,oldPrice:899,emoji:"🎨",rating:4.6,description:"Wear something that feels like you.",badge:"Trending"},
    {id:12,name:"Memory Photo Gift",category:"Photo Gifts",price:899,oldPrice:1099,emoji:"🎁",rating:4.9,description:"A thoughtful gift for someone special.",badge:"Gift Pick"}
];

let appliedCoupon = "";
let cart = loadCart();

function formatPrice(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}

function loadCart() {
    try {
        const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (!Array.isArray(stored)) return [];
        return stored.map(item => {
            const product = catalog.find(p => String(p.id) === String(item.id));
            if (!product) return null;
            return {
                ...product,
                ...item,
                id:product.id,
                name:product.name,
                category:product.category,
                price:product.price,
                oldPrice:product.oldPrice,
                emoji:product.emoji,
                quantity:Math.max(1,Math.min(99,Math.floor(Number(item.quantity) || 1)))
            };
        }).filter(Boolean);
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"),2600);
}

function getSubtotal() {
    return cart.reduce((sum,item) => sum + item.price * item.quantity,0);
}

function getQuantity() {
    return cart.reduce((sum,item) => sum + item.quantity,0);
}

function getDiscount(subtotal){

    if(appliedCoupon === "WELCOME10"){
        return Math.round(subtotal * 0.10);
    }

    if(appliedCoupon === "MIM50"){
        return Math.min(50, subtotal);
    }

    if(appliedCoupon === "MINE20"){
        return Math.round(subtotal * 0.20);
    }

    if(appliedCoupon === "FIRST100"){
        return Math.min(100, subtotal);
    }

    if(appliedCoupon === "DESIGNFREE"){
        return Math.min(50, subtotal);
    }

    return 0;
}
function getShipping(subtotal){

    if (subtotal === 0) {
        return 0;
    }

    if (subtotal >= 999) {
        return 0;
    }

    if (appliedCoupon === "FREESHIP") {
        return 0;
    }

    return 49;
}

function renderCart() {
    const itemsContainer = document.getElementById("cartItems");
    const layout = document.getElementById("cartLayout");
    const emptyCart = document.getElementById("emptyCart");
    const subtotal = getSubtotal();
    const quantity = getQuantity();
    const shipping = getShipping(subtotal);
    const discount = getDiscount(subtotal);
    const total = Math.max(0,subtotal + shipping - discount);

    document.getElementById("headerCartCount").textContent = quantity > 99 ? "99+" : quantity;
    document.getElementById("itemsCount").textContent = `${quantity} item${quantity === 1 ? "" : "s"} in your cart`;

    if (cart.length === 0) {
        layout.style.display = "none";
        emptyCart.classList.add("show");
        document.getElementById("clearCartButton").style.visibility = "hidden";
    } else {
        layout.style.display = "grid";
        emptyCart.classList.remove("show");
        document.getElementById("clearCartButton").style.visibility = "visible";

        itemsContainer.innerHTML = cart.map(item => {
            const saving = Math.max(0,item.oldPrice - item.price);
            const customization = item.customization || item.personalization || "";

            return `
                <article class="cart-item">
                    <div class="item-image">${item.emoji}</div>
                    <div class="item-info">
                        <div class="item-category">${item.category}</div>
                        <h3 class="item-name">${escapeHTML(item.name)}</h3>
                        <p class="item-description">${item.description || "A personalized pick, made just for you."}</p>
                        ${customization ? `<div class="item-personalization">Personalization: <strong>${escapeHTML(String(customization))}</strong></div>` : ""}
                        <div class="item-bottom">
                            <div class="quantity-control">
                                <button data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                                <span>${item.quantity}</span>
                                <button data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                            </div>
                            <button class="remove-btn" data-action="remove" data-id="${item.id}">✕ Remove</button>
                        </div>
                    </div>
                    <div class="item-price">
                        <div class="current-price">${formatPrice(item.price * item.quantity)}</div>
                        ${item.oldPrice > item.price ? `<div class="old-price">${formatPrice(item.oldPrice * item.quantity)}</div><div class="savings">Save ${formatPrice(saving * item.quantity)}</div>` : ""}
                    </div>
                </article>
            `;
        }).join("");
    }

    document.getElementById("subtotalValue").textContent = formatPrice(subtotal);
    document.getElementById("shippingValue").innerHTML = shipping === 0
        ? '<span class="free-shipping">FREE</span>'
        : formatPrice(shipping);

    document.getElementById("discountRow").style.display = discount > 0 ? "flex" : "none";
    document.getElementById("discountValue").textContent = "−" + formatPrice(discount);
    document.getElementById("totalValue").textContent = formatPrice(total);
    document.getElementById("checkoutButton").disabled = cart.length === 0;

    document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) return;

    window.location.href = "./checkout.html";
});

    renderRecommendations();
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g,char => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
    }[char]));
}

function renderRecommendations() {
    const recommendations = catalog
        .filter(product => !cart.some(item => item.id === product.id))
        .slice(0,4);

    document.getElementById("recommendGrid").innerHTML = recommendations.map(product => `
        <article class="recommend-card">
            <div class="recommend-image">
                <span class="recommend-tag">${product.badge}</span>
                ${product.emoji}
            </div>
            <h3>${escapeHTML(product.name)}</h3>
            <div class="recommend-price">${formatPrice(product.price)}</div>
            <div class="recommend-rating">★ ${product.rating} <span style="color:#aaa8b7">· Loved by customers</span></div>
            <button class="add-cart-btn" data-add-id="${product.id}">＋ Add to cart</button>
        </article>
    `).join("");
}

document.getElementById("cartItems").addEventListener("click",event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const item = cart.find(product => product.id === id);
    if (!item) return;

    if (button.dataset.action === "increase") {
        if (item.quantity >= 99) {
            showToast("Maximum quantity is 99 per product.");
            return;
        }
        item.quantity++;
    }

    if (button.dataset.action === "decrease") {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    if (button.dataset.action === "remove") {
        cart = cart.filter(product => product.id !== id);
        showToast("Item removed from your cart.");
    }

    saveCart();
    renderCart();
});

document.getElementById("clearCartButton").addEventListener("click",() => {
    if (cart.length === 0) return;
    if (!confirm("Are you sure you want to remove all items from your cart?")) return;

    cart = [];
    appliedCoupon = "";
    document.getElementById("couponInput").value = "";
    document.getElementById("couponMessage").textContent = "";
    saveCart();
    renderCart();
    showToast("Your cart has been cleared.");
});

function applyCoupon(code) {

    const input = document.getElementById("couponInput");
    const message = document.getElementById("couponMessage");
    const normalized = code.trim().toUpperCase();

    message.className = "coupon-message";

    if (cart.length === 0) {
        message.textContent =
            "Add an item to your cart before applying a coupon.";
        message.classList.add("error");
        return;
    }

    if (normalized === "WELCOME10") {

        appliedCoupon = normalized;

        message.textContent =
            "Success! 10% discount applied to your order.";

        message.classList.add("success");

    } else if (normalized === "MIM50") {

        appliedCoupon = normalized;

        message.textContent =
            "Success! ₹50 off has been applied to your order.";

        message.classList.add("success");

    } else if (normalized === "MINE20") {

        appliedCoupon = normalized;

        message.textContent =
            "Success! 20% discount applied to your order.";

        message.classList.add("success");

    } else if (normalized === "FIRST100") {

        appliedCoupon = normalized;

        message.textContent =
            "Success! ₹100 off has been applied to your order.";

        message.classList.add("success");

    } else if (normalized === "DESIGNFREE") {

        appliedCoupon = normalized;

        message.textContent =
            "Success! ₹50 customization discount applied.";

        message.classList.add("success");

    } else if (normalized === "FREESHIP") {

        appliedCoupon = normalized;

        message.textContent =
            "Success! Free shipping applied to your order.";

        message.classList.add("success");

    } else {

        appliedCoupon = "";

        message.textContent =
            "That coupon code isn't valid. Try MINE20, FIRST100, DESIGNFREE or FREESHIP.";

        message.classList.add("error");

        renderCart();
        return;
    }

    input.value = normalized;
    renderCart();
}

document.getElementById("applyCouponButton").addEventListener("click",() => {
    applyCoupon(document.getElementById("couponInput").value);
});

document.getElementById("couponInput").addEventListener("keydown",event => {
    if (event.key === "Enter") {
        event.preventDefault();
        applyCoupon(event.target.value);
    }
});

document.getElementById("useCouponButton").addEventListener("click",() => {
    document.getElementById("couponInput").value = "WELCOME10";
    applyCoupon("WELCOME10");
});

document.getElementById("recommendGrid").addEventListener("click",event => {
    const button = event.target.closest("[data-add-id]");
    if (!button) return;

    const id = Number(button.dataset.addId);
    const product = catalog.find(item => item.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        if (existing.quantity >= 99) {
            showToast("Maximum quantity is 99 per product.");
            return;
        }
        existing.quantity++;
    } else {
        cart.push({...product,quantity:1});
    }

    saveCart();
    renderCart();
    showToast(`${product.name} added to your cart.`);
});

document.getElementById("checkoutButton").addEventListener("click",() => {
    if (cart.length === 0) {
        showToast("Your cart is empty.");
        return;
    }

    const checkoutData = {
        items:cart.map(item => ({
            id:item.id,
            name:item.name,
            price:item.price,
            quantity:item.quantity,
            customization:item.customization || item.personalization || ""
        })),
        subtotal:getSubtotal(),
        shipping:getShipping(getSubtotal()),
        discount:getDiscount(getSubtotal()),
        total:getSubtotal() + getShipping(getSubtotal()) - getDiscount(getSubtotal()),
        coupon:appliedCoupon
    };

    sessionStorage.setItem("mim-checkout",JSON.stringify(checkoutData));

    if (document.getElementById("checkoutButton").dataset.checkoutPage) {
        window.location.href = document.getElementById("checkoutButton").dataset.checkoutPage;
    } else {
        showToast("Cart is ready! Connect your checkout page to continue.");
    }
});

renderCart();
