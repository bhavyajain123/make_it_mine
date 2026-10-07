
const products = {

    "1": {
        id: 1,
        name: "Classic Custom T-Shirt",
        price: 599,
        oldPrice: 799,
        category: "T-Shirts",
        description: "Design your own personalized T-Shirt with your favourite text, colour and style.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "2": {
        id: 2,
        name: "Personalized Photo Mug",
        price: 399,
        oldPrice: 499,
        category: "Mugs",
        description: "A little memory in every sip. Create a personalized mug for yourself or someone special.",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "3": {
        id: 3,
        name: "Good Vibes Hoodie",
        price: 999,
        oldPrice: 1299,
        category: "Hoodies",
        description: "Cozy comfort with your own personalized touch. Perfect for everyday wear.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "4": {
        id: 4,
        name: "Custom Phone Case",
        price: 499,
        oldPrice: 699,
        category: "Phone Cases",
        description: "Make your phone stand out with a custom design made just for you.",
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "5": {
        id: 5,
        name: "Minimal Canvas Tote",
        price: 349,
        oldPrice: 449,
        category: "Tote Bags",
        description: "A simple and stylish tote bag made for your everyday essentials.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "6": {
        id: 6,
        name: "Personalized Photo Frame",
        price: 699,
        oldPrice: 899,
        category: "Photo Gifts",
        description: "Keep your favourite memories close with a personalized photo frame.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "7": {
        id: 7,
        name: "Custom Embroidered Cap",
        price: 299,
        oldPrice: 399,
        category: "Caps",
        description: "Add your own personality to a classic everyday cap.",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "8": {
        id: 8,
        name: "Memory Cushion",
        price: 549,
        oldPrice: 749,
        category: "Home Gifts",
        description: "Comfort with a personal touch. Create a meaningful cushion design.",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "9": {
        id: 9,
        name: "Personalized Sweatshirt",
        price: 1199,
        oldPrice: 1499,
        category: "Hoodies",
        description: "A personalized sweatshirt made for your everyday moments.",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "10": {
        id: 10,
        name: "Custom Travel Mug",
        price: 649,
        oldPrice: 799,
        category: "Mugs",
        description: "Take your favourite memories with you wherever you go.",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "11": {
        id: 11,
        name: "Printed Graphic Tee",
        price: 699,
        oldPrice: 899,
        category: "T-Shirts",
        description: "Wear something that feels completely like you.",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    "12": {
        id: 12,
        name: "Memory Photo Gift",
        price: 899,
        oldPrice: 1099,
        category: "Photo Gifts",
        description: "A thoughtful personalized gift for someone special.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85",
        images: [
            "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85"
        ]
    }

};

const params = new URLSearchParams(location.search);
const requestedId = params.get("id") || "8";
const product = products[requestedId] || products["8"];
let quantity = 1;
let selectedSize = "M";
let selectedColor = "Black";
let selectedImage = product.image;

const money = value => "₹" + Number(value).toLocaleString("en-IN");
const getCart = () => {
try {
const cart = JSON.parse(localStorage.getItem("mim-cart") || "[]");
return Array.isArray(cart) ? cart : [];
} catch {
return [];
}
};

function updateCartCount() {
const cart = getCart();
document.getElementById("cartCount").textContent = cart.reduce((sum,item) => sum + (Number(item.quantity) || 1),0);
}

function showToast(message) {
const toast = document.getElementById("toast");
toast.textContent = message;
toast.classList.add("show");
clearTimeout(window.toastTimer);
window.toastTimer = setTimeout(() => toast.classList.remove("show"),2600);
}

function renderProduct() {
document.title = product.name + " | MakeItMine";
document.getElementById("productName").textContent = product.name;
document.getElementById("productCategory").textContent = product.category;
document.getElementById("productPrice").textContent = money(product.price);
document.getElementById("oldPrice").textContent = money(product.oldPrice);
document.getElementById("discount").textContent = Math.round((1-product.price/product.oldPrice)*100) + "% OFF";
document.getElementById("productDescription").textContent = product.description;
document.getElementById("crumbName").textContent = product.name;
document.getElementById("mainImage").src = product.image;
document.getElementById("mainImage").alt = product.name;
document.getElementById("thumbnails").innerHTML = product.images.map((src,index) =>
`<button class="thumb ${index===0?"active":""}" data-image="${src}" aria-label="View product image ${index+1}"><img src="${src}" alt=""></button>`
).join("");
document.querySelectorAll(".thumb").forEach(button => {
button.addEventListener("click",() => {
selectedImage = button.dataset.image;
document.getElementById("mainImage").src = selectedImage;
document.querySelectorAll(".thumb").forEach(item => item.classList.toggle("active",item===button));
});
});
}

function renderRelated() {
const related = [
{id:1,name:"Personalized Photo Mug",price:299,image:products["1"].image},
{id:2,name:"Custom Photo Frame",price:699,image:products["2"].image},
{id:3,name:"Personalized Gift Box",price:899,image:products["3"].image},
{id:8,name:"Personalized T-Shirt",price:549,image:products["8"].image}
].filter(item => String(item.id) !== String(product.id));
document.getElementById("relatedGrid").innerHTML = related.map(item => `
<a class="related-card" href="product-detail.html?id=${item.id}">
<img src="${item.image}" alt="${item.name}" loading="lazy">
<div class="related-info"><h3>${item.name}</h3><p>${money(item.price)}</p><button type="button">View Product →</button></div>
</a>`).join("");
}

document.getElementById("colorOptions").addEventListener("click",event => {
const button = event.target.closest(".color-swatch");
if(!button) return;
selectedColor = button.dataset.color;
document.querySelectorAll(".color-swatch").forEach(item => item.classList.toggle("active",item===button));
document.getElementById("selectedColorLabel").textContent = selectedColor;
});

document.getElementById("sizeOptions").addEventListener("click",event => {
const button = event.target.closest(".size-btn");
if(!button) return;
selectedSize = button.dataset.size;
document.querySelectorAll(".size-btn").forEach(item => item.classList.toggle("active",item===button));
});

document.getElementById("decrease").addEventListener("click",() => {
quantity = Math.max(1,quantity-1);
document.getElementById("quantity").textContent = quantity;
});

document.getElementById("increase").addEventListener("click",() => {
quantity = Math.min(10,quantity+1);
document.getElementById("quantity").textContent = quantity;
});

function addProductToCart(goToCart) {
const cart = getCart();
const customText = document.getElementById("customText").value.trim();
const variantId = `${product.id}-${selectedColor}-${selectedSize}-${customText}`;
const existing = cart.find(item => String(item.variantId || "") === variantId);

if(existing) {
existing.quantity = (Number(existing.quantity) || 1) + quantity;
} else {
cart.push({
id:product.id,
variantId,
name:product.name,
price:product.price,
quantity,
image:selectedImage,
color:selectedColor,
size:selectedSize,
customText
});
}

localStorage.setItem("mim-cart",JSON.stringify(cart));
updateCartCount();

if(goToCart) {
location.href = "cart.html";
} else {
showToast(product.name + " added to your cart!");
}
}

document.getElementById("addToCart").addEventListener("click",() => addProductToCart(false));
document.getElementById("buyNow").addEventListener("click",() => addProductToCart(true));

document.getElementById("favoriteBtn").addEventListener("click",event => {
const button = event.currentTarget;
button.classList.toggle("active");
button.textContent = button.classList.contains("active") ? "♥" : "♡";
showToast(button.classList.contains("active") ? "Added to your favourites!" : "Removed from favourites.");
});

document.getElementById("checkDelivery").addEventListener("click",() => {
const pin = document.getElementById("pincode").value.trim();
const result = document.getElementById("deliveryResult");
if(!/^[1-9][0-9]{5}$/.test(pin)) {
result.style.color = "#c23c51";
result.textContent = "Please enter a valid 6-digit PIN code.";
return;
}
result.style.color = "var(--green)";
result.textContent = "PIN code accepted. Delivery estimate is illustrative; actual availability must be confirmed at checkout.";
});

renderProduct();
renderRelated();
updateCartCount();
