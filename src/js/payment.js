
const CART_KEY = "mim-cart";
const CHECKOUT_KEY = "mim-checkout";
let cart = [];
let couponCode = "";
let discountAmount = 0;

const $ = id => document.getElementById(id);
const money = value => "₹" + Math.round(value).toLocaleString("en-IN");

function showToast(message){
const toast=$("toast");
toast.textContent=message;
toast.classList.add("show");
setTimeout(()=>toast.classList.remove("show"),2800);
}

function readStorage(key){
try{return JSON.parse(localStorage.getItem(key)||"null")}catch(error){return null}
}

function getProductName(item){
return item.name||item.title||"Personalized Gift";
}

function getProductPrice(item){
return Number(item.price)||0;
}

function getProductQuantity(item){
return Math.max(1,Number(item.quantity||item.qty)||1);
}

function getProductIcon(item){
const text=getProductName(item).toLowerCase();
if(text.includes("mug")||text.includes("cup"))return "☕";
if(text.includes("shirt")||text.includes("t-shirt"))return "👕";
if(text.includes("frame")||text.includes("photo"))return "🖼️";
if(text.includes("keychain"))return "🔑";
if(text.includes("bouquet")||text.includes("flower"))return "💐";
if(text.includes("box"))return "🎁";
if(text.includes("cushion")||text.includes("pillow"))return "🛋️";
return "🎁";
}

function getSubtotal(){
return cart.reduce((sum,item)=>sum+getProductPrice(item)*getProductQuantity(item),0);
}

function getShipping(subtotal){
return subtotal===0||subtotal>=999?0:49;
}

function getDiscount(subtotal){
if(couponCode==="WELCOME10")return Math.round(subtotal*0.10);
if(couponCode==="MIM50")return Math.min(50,subtotal);
return 0;
}

function getTotal(){
const subtotal=getSubtotal();
return Math.max(0,subtotal+getShipping(subtotal)-getDiscount(subtotal));
}

function renderCart(){
const container=$("orderItems");
container.innerHTML=cart.map((item,index)=>`
<div class="order-item">
<div class="product-image">${getProductIcon(item)}</div>
<div class="product-info">
<h3>${escapeHTML(getProductName(item))}</h3>
<p>Quantity: ${getProductQuantity(item)}</p>
</div>
<div class="product-price">${money(getProductPrice(item)*getProductQuantity(item))}</div>
</div>`).join("");

$("itemCount").textContent=cart.reduce((sum,item)=>sum+getProductQuantity(item),0)+" item(s) in your order";
const subtotal=getSubtotal();
$("subtotal").textContent=money(subtotal);
$("shipping").textContent=getShipping(subtotal)===0?"Free":money(getShipping(subtotal));
$("discount").textContent=discountAmount>0?"−"+money(discountAmount):money(0);
$("total").textContent=money(getTotal());
$("payButtonText").textContent="Continue · "+money(getTotal());
$("emptyCart").style.display=cart.length?"none":"block";
$("paymentLayout").style.display=cart.length?"grid":"none";
}

function escapeHTML(value){
return String(value).replace(/[&<>"']/g,char=>({
"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
})[char]);
}

function renderAddress(){
const details=readStorage(CHECKOUT_KEY);
if(!details||typeof details!=="object")return;

const name=details.name||details.fullName||details.firstName||"Customer";
const address=[
details.address||details.street,
details.city,
details.state,
details.pincode||details.zip,
details.phone
].filter(Boolean).join(", ");

$("deliveryName").textContent=name;
$("deliveryAddress").textContent=address||"Delivery address details are not available. Please confirm your address.";
}

function refreshDiscount(){
discountAmount=getDiscount(getSubtotal());
renderCart();
}

document.querySelectorAll(".payment-option").forEach(option=>{
option.addEventListener("click",()=>{
const method=option.dataset.method;
const radio=option.querySelector('input[type="radio"]');
radio.checked=true;

document.querySelectorAll(".payment-option").forEach(item=>{
item.classList.toggle("selected",item===option);
});

document.querySelectorAll(".payment-details").forEach(details=>{
details.classList.toggle("active",details.id==="details-"+method);
});

$("payButtonText").textContent=(method==="cod"?"Place Order · ":"Continue · ")+money(getTotal());
});
});

$("applyCoupon").addEventListener("click",()=>{
const code=$("couponInput").value.trim().toUpperCase();
const subtotal=getSubtotal();

if(!code){
$("couponMessage").style.color="#c24141";
$("couponMessage").textContent="Please enter a coupon code.";
return;
}

if(subtotal===0){
$("couponMessage").style.color="#c24141";
$("couponMessage").textContent="Add products to your cart first.";
return;
}

if(code==="WELCOME10"){
couponCode=code;
}else if(code==="MIM50"){
couponCode=code;
}else{
couponCode="";
discountAmount=0;
$("couponMessage").style.color="#c24141";
$("couponMessage").textContent="Invalid coupon. Try WELCOME10 or MIM50.";
renderCart();
return;
}

discountAmount=getDiscount(subtotal);
$("couponMessage").style.color="#13835d";
$("couponMessage").textContent=code+" applied successfully!";
renderCart();
});

$("cardNumber").addEventListener("input",event=>{
let value=event.target.value.replace(/\D/g,"").slice(0,16);
event.target.value=value.replace(/(.{4})/g,"$1 ").trim();
});

$("cardExpiry").addEventListener("input",event=>{
let value=event.target.value.replace(/\D/g,"").slice(0,4);
if(value.length>2)value=value.slice(0,2)+"/"+value.slice(2);
event.target.value=value;
});

$("cardCvv").addEventListener("input",event=>{
event.target.value=event.target.value.replace(/\D/g,"").slice(0,4);
});

function validatePayment(method){
if(method==="upi"){
const upi=$("upiId").value.trim();
if(!/^[\w.-]{2,256}@[a-zA-Z0-9.-]{2,64}$/.test(upi)){
showToast("Please enter a valid UPI ID.");
$("upiId").focus();
return false;
}
}

if(method==="card"){
const name=$("cardName").value.trim();
const number=$("cardNumber").value.replace(/\D/g,"");
const expiry=$("cardExpiry").value.trim();
const cvv=$("cardCvv").value.trim();

if(name.length<2){showToast("Please enter the cardholder name.");$("cardName").focus();return false;}
if(!/^\d{16}$/.test(number)){showToast("Enter a valid 16-digit demo card number.");$("cardNumber").focus();return false;}
if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)){showToast("Enter expiry in MM/YY format.");$("cardExpiry").focus();return false;}
const month=Number(expiry.slice(0,2));
const year=2000+Number(expiry.slice(3));
const now=new Date();
if(year<now.getFullYear()||(year===now.getFullYear()&&month<now.getMonth()+1)){showToast("This card expiry date has passed.");$("cardExpiry").focus();return false;}
if(!/^\d{3,4}$/.test(cvv)){showToast("Enter a valid CVV.");$("cardCvv").focus();return false;}
}

if(method==="netbanking"&&!$("bank").value){
showToast("Please select your bank.");
$("bank").focus();
return false;
}

return true;
}

$("payButton").addEventListener("click",()=>{
if(cart.length===0){
showToast("Your cart is empty.");
return;
}

const method=document.querySelector('input[name="paymentMethod"]:checked').value;

if(!validatePayment(method))return;

if(method!=="cod"){
showToast("Real payment is not enabled. Connect a payment gateway to accept payments.");
return;
}

const orderId = "MIM-" + Date.now().toString().slice(-6);

const checkoutDetails = readStorage(CHECKOUT_KEY) || {};

const order = {
    id: orderId,
    orderId: orderId,

    items: cart,

    subtotal: getSubtotal(),
    shipping: getShipping(getSubtotal()),
    discount: getDiscount(getSubtotal()),
    total: getTotal(),

    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Order Placed",
    stage: 0,

    createdAt: new Date().toISOString(),

    customer: {
        name: checkoutDetails.name || checkoutDetails.fullName || "Customer",
        address: checkoutDetails.address || checkoutDetails.street || "",
        city: checkoutDetails.city || "",
        state: checkoutDetails.state || "",
        pincode: checkoutDetails.pincode || checkoutDetails.zip || "",
        phone: checkoutDetails.phone || ""
    },

    products: cart.map(item => ({
        name: item.name || item.title || "Personalized Product",
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        icon: item.icon || "🎁"
    })),

    events: [
        {
            title: "Order Placed",
            description: "We've received your order successfully.",
            time: "Just now"
        },
        {
            title: "Order Confirmed",
            description: "Your order has been confirmed.",
            time: "Awaiting update"
        },
        {
            title: "Shipped",
            description: "Your package will be shipped soon.",
            time: "Awaiting update"
        },
        {
            title: "Out for Delivery",
            description: "Your package will be delivered soon.",
            time: "Awaiting update"
        },
        {
            title: "Delivered",
            description: "Your order will be delivered soon.",
            time: "Awaiting update"
        }
    ]
};

try {
    const orders = JSON.parse(
        localStorage.getItem("marketmine_orders") || "[]"
    );

    orders.unshift(order);

    localStorage.setItem(
        "marketmine_orders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "marketmine_order_id",
        orderId
    );

    localStorage.setItem(
        "marketmine_order_status",
        "Order Placed"
    );

    localStorage.setItem(
        "mim-last-order",
        JSON.stringify(order)
    );

    localStorage.setItem(
        "mim-order-" + orderId,
        JSON.stringify(order)
    );

} catch (error) {
    showToast("Unable to save this demo order in your browser.");
    return;
}

$("paymentLayout").style.display="none";
$("emptyCart").style.display="none";
$("successScreen").style.display="block";
$("successOrderId").textContent=orderId;
$("successMessage").textContent="Your demo Cash on Delivery order has been created. No online payment was processed.";

localStorage.removeItem(CART_KEY);

window.scrollTo({
    top:0,
    behavior:"smooth"
});
});

function init(){
    const stored=readStorage(CART_KEY);

    cart=Array.isArray(stored)
        ? stored.filter(
            item => item && typeof item==="object" && getProductPrice(item)>0
        )
        : [];

    renderAddress();
    renderCart();
}

init();


