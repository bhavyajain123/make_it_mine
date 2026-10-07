
        const CART_KEY = "mim-cart";
        const CHECKOUT_KEY = "mim-checkout";
        const ORDER_KEY = "mim-orders";
        const FREE_SHIPPING_LIMIT = 999;
        const SHIPPING_FEE = 49;

        const catalog = {
            1: { name: "Personalized Photo Mug", price: 299, emoji: "☕" },
            2: { name: "Custom Name Necklace", price: 599, emoji: "📿" },
            3: { name: "Memory Photo Frame", price: 449, emoji: "🖼️" },
            4: { name: "Personalized Cushion", price: 499, emoji: "🛋️" },
            5: { name: "Custom Gift Box", price: 799, emoji: "🎁" },
            6: { name: "Personalized Notebook", price: 249, emoji: "📔" },
            7: { name: "Custom Phone Case", price: 399, emoji: "📱" },
            8: { name: "Personalized T-Shirt", price: 549, emoji: "👕" },
            9: { name: "Photo Keychain", price: 199, emoji: "🔑" },
            10: { name: "Custom LED Lamp", price: 899, emoji: "💡" },
            11: { name: "Personalized Bottle", price: 349, emoji: "🧴" },
            12: { name: "Couple Gift Set", price: 999, emoji: "💝" }
        };

        let cart = readCart();
        let activeCoupon = null;
        let subtotalAmount = 0;
        let shippingAmount = 0;
        let discountAmount = 0;
        let totalAmount = 0;
        let toastTimer;

        const checkoutSection = document.getElementById("checkoutSection");
        const emptyState = document.getElementById("emptyState");
        const successState = document.getElementById("successState");
        const summaryItems = document.getElementById("summaryItems");
        const checkoutForm = document.getElementById("checkoutForm");
        const placeOrderBtn = document.getElementById("placeOrderBtn");
        const couponInput = document.getElementById("couponInput");
        const couponMessage = document.getElementById("couponMessage");

        function readCart() {
            try {
                const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
                return Array.isArray(value) ? value : [];
            } catch {
                return [];
            }
        }

        function getProduct(item) {
            const id = Number(item.id ?? item.productId);
            const base = catalog[id] || {};

            const price = Number(item.price ?? base.price ?? 0);
            const quantity = Math.floor(Number(item.quantity ?? item.qty ?? 1));

            return {
                id,
                name: String(item.name ?? item.title ?? base.name ?? "Personalized Gift"),
                price: Number.isFinite(price) && price >= 0 ? price : 0,
                quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
                emoji: item.emoji ?? base.emoji ?? "🎁",
                image: typeof item.image === "string" ? item.image :
                    typeof item.img === "string" ? item.img : ""
            };
        }

        function formatPrice(amount) {
            return "₹" + Math.round(amount).toLocaleString("en-IN");
        }

        function showToast(message) {
            const toast = document.getElementById("toast");
            toast.textContent = message;
            toast.classList.add("show");
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
        }

        function renderCart() {
            cart = readCart();

            const items = cart.map(getProduct);
            const hasItems = items.length > 0;

            checkoutSection.hidden = !hasItems;
            emptyState.hidden = hasItems;
            successState.hidden = true;

            if (!hasItems) {
                return;
            }

            summaryItems.replaceChildren();

            items.forEach(item => {
                const row = document.createElement("div");
                row.className = "summary-item";

                const imageBox = document.createElement("div");
                imageBox.className = "item-image";

                if (item.image && /^https?:\/\//i.test(item.image)) {
                    const img = document.createElement("img");
                    img.src = item.image;
                    img.alt = item.name;
                    img.loading = "lazy";
                    img.onerror = () => {
                        imageBox.textContent = item.emoji;
                    };
                    imageBox.appendChild(img);
                } else {
                    imageBox.textContent = item.emoji;
                }

                const quantity = document.createElement("span");
                quantity.className = "item-quantity";
                quantity.textContent = item.quantity;
                imageBox.appendChild(quantity);

                const details = document.createElement("div");
                details.className = "item-details";

                const name = document.createElement("h3");
                name.textContent = item.name;

                const description = document.createElement("p");
                description.textContent = formatPrice(item.price) + " each";

                details.append(name, description);

                const price = document.createElement("div");
                price.className = "item-price";
                price.textContent = formatPrice(item.price * item.quantity);

                row.append(imageBox, details, price);
                summaryItems.appendChild(row);
            });

            const count = items.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById("itemCount").textContent =
                count + (count === 1 ? " item in your order" : " items in your order");

            calculateTotals();
        }

        function calculateTotals() {
            const items = cart.map(getProduct);

            subtotalAmount = items.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            );

            shippingAmount = subtotalAmount === 0 ||
                subtotalAmount >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_FEE;

            discountAmount = 0;

            if (activeCoupon === "WELCOME10") {
                discountAmount = Math.round(subtotalAmount * 0.10);
            } else if (activeCoupon === "MIM50") {
                discountAmount = Math.min(50, subtotalAmount);
            }

            totalAmount = Math.max(
                0, subtotalAmount + shippingAmount - discountAmount
            );

            document.getElementById("subtotal").textContent =
                formatPrice(subtotalAmount);

            document.getElementById("shipping").textContent =
                shippingAmount === 0 && subtotalAmount > 0
                    ? "FREE"
                    : formatPrice(shippingAmount);

            document.getElementById("discount").textContent =
                "−" + formatPrice(discountAmount);

            document.getElementById("discountLine").hidden =
                discountAmount === 0;

            document.getElementById("total").textContent =
                formatPrice(totalAmount);

            placeOrderBtn.textContent =
                "Place Order · " + formatPrice(totalAmount);

            const progress = Math.min(
                100, subtotalAmount / FREE_SHIPPING_LIMIT * 100
            );

            document.getElementById("shippingProgress").style.width =
                progress + "%";

            const remaining = Math.max(0, FREE_SHIPPING_LIMIT - subtotalAmount);

            document.getElementById("shippingHint").firstChild.textContent =
                subtotalAmount >= FREE_SHIPPING_LIMIT
                    ? "🎉 You unlocked free shipping!"
                    : "Add " + formatPrice(remaining) +
                      " more to unlock free shipping.";

            if (activeCoupon) {
                couponMessage.textContent =
                    activeCoupon + " applied successfully!";
                couponMessage.className = "coupon-message success";
            }
        }

        document.getElementById("applyCoupon").addEventListener("click", () => {
            const code = couponInput.value.trim().toUpperCase();

            if (!code) {
                couponMessage.textContent = "Please enter a promo code.";
                couponMessage.className = "coupon-message error";
                return;
            }

            if (code !== "WELCOME10" && code !== "MIM50") {
                activeCoupon = null;
                couponMessage.textContent = "Invalid promo code. Please try again.";
                couponMessage.className = "coupon-message error";
                calculateTotals();
                return;
            }

            activeCoupon = code;
            couponInput.value = code;
            calculateTotals();
            showToast("Promo code applied!");
        });

        couponInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("applyCoupon").click();
            }
        });

        checkoutForm.addEventListener("submit", event => {
            event.preventDefault();

            cart = readCart();

            if (!cart.length) {
                showToast("Your cart is empty.");
                renderCart();
                return;
            }

            if (!checkoutForm.reportValidity()) {
                return;
            }

            const formData = new FormData(checkoutForm);
            const details = Object.fromEntries(formData.entries());

            details.giftMessage = document.getElementById("giftMessage").value.trim();
            details.paymentMethod = checkoutForm.querySelector(
                'input[name="paymentMethod"]:checked'
            ).value;

            if (details.paymentMethod === "upi") {
                const proceed = confirm(
                    "Online payment is not connected yet. No money will be charged. " +
                    "Continue with saving this demo order?"
                );

                if (!proceed) {
                    return;
                }
            }

            const orderId = "MIM-" + Date.now().toString().slice(-8);

            const order = {
                orderId,
                createdAt: new Date().toISOString(),
                customer: details,
                items: cart.map(getProduct),
                subtotal: subtotalAmount,
                shipping: shippingAmount,
                discount: discountAmount,
                coupon: activeCoupon,
                total: totalAmount,
                paymentMethod: details.paymentMethod,
                status: "Demo order"
            };

            try {
                sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(order));

                let orders = [];

                try {
                    const existing = JSON.parse(
                        localStorage.getItem(ORDER_KEY) || "[]"
                    );

                    if (Array.isArray(existing)) {
                        orders = existing;
                    }
                } catch {
                    orders = [];
                }

                orders.push(order);
                localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
            } catch {
                showToast("Could not save your order in this browser.");
                return;
            }

            checkoutSection.hidden = true;
            emptyState.hidden = true;
            successState.hidden = false;

            document.getElementById("orderNumber").textContent =
                "Order ID: " + orderId;

            document.getElementById("successPaymentText").textContent =
                "Payment method: " +
                (details.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "UPI / Online Payment selected");

            localStorage.removeItem(CART_KEY);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        renderCart();
   