

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("mim-cart") || "[]");
    } catch {
        return [];
    }
}

function updateCartCount() {
    const cart = getCart();
const total = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
);
    document.getElementById("cart-count").textContent = total;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formMessage = document.getElementById("form-message");

    formMessage.textContent = "Thank you for your message! This demo form does not send data to a server.";
    formMessage.style.display = "block";

    showToast("Message form submitted in demo mode.");
    this.reset();
});

document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && this.value.trim()) {
        window.location.href = "shop.html?search=" + encodeURIComponent(this.value.trim());
    }
});

updateCartCount();
