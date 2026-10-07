const demoOrders = {

    MIM1024: {
        date: "October 1, 2026",
        delivery: "October 8, 2026",
        status: "In Transit",
        stage: 2,
        message: "Your package has left our facility and is on its way.",
        payment: "UPI",
        paymentStatus: "Paid",
        subtotal: 1098,
        shipping: 0,
        discount: 100,
        total: 998,

        address:
            "Aarav Sharma, 24 Green Park, New Delhi, Delhi 110016",

        products: [
            {
                name: "Personalized Photo Mug",
                detail: "White · Custom photo · Qty 1",
                price: 349,
                icon: "☕"
            },
            {
                name: "Personalized T-Shirt",
                detail: "Black · Size M · Qty 1",
                price: 549,
                icon: "👕"
            },
            {
                name: "Custom Gift Box",
                detail: "Purple theme · Qty 1",
                price: 200,
                icon: "🎁"
            }
        ],

        events: [
            {
                title: "Order Placed",
                description: "We've received your order successfully.",
                time: "Oct 1, 2026 · 10:25 AM"
            },
            {
                title: "Order Confirmed",
                description: "Your order details have been confirmed.",
                time: "Oct 1, 2026 · 11:10 AM"
            },
            {
                title: "Shipped",
                description: "Your package has been dispatched from our facility.",
                time: "Oct 2, 2026 · 9:30 AM"
            },
            {
                title: "Out for Delivery",
                description: "Your package will be delivered soon.",
                time: "Awaiting update"
            },
            {
                title: "Delivered",
                description: "Your order has reached its destination.",
                time: "Awaiting update"
            }
        ]
    },

    MIM1025: {
        date: "September 29, 2026",
        delivery: "October 3, 2026",
        status: "Delivered",
        stage: 4,
        message: "Your personalized gift has been delivered!",
        payment: "Card",
        paymentStatus: "Paid",
        subtotal: 749,
        shipping: 49,
        discount: 0,
        total: 798,

        address:
            "Priya Verma, 15 Rose Avenue, Noida, Uttar Pradesh 201301",

        products: [
            {
                name: "Personalized Photo Frame",
                detail: "Wood finish · 8 × 10 inch · Qty 1",
                price: 499,
                icon: "🖼️"
            },
            {
                name: "Personalized Keychain",
                detail: "Engraved initials · Qty 1",
                price: 250,
                icon: "🔑"
            }
        ],

        events: [
            {
                title: "Order Placed",
                description: "We've received your order successfully.",
                time: "Sep 29, 2026 · 2:15 PM"
            },
            {
                title: "Order Confirmed",
                description: "Your order details have been confirmed.",
                time: "Sep 29, 2026 · 2:40 PM"
            },
            {
                title: "Shipped",
                description: "Your package has left our facility.",
                time: "Sep 30, 2026 · 9:00 AM"
            },
            {
                title: "Out for Delivery",
                description: "The delivery partner is on the way.",
                time: "Oct 3, 2026 · 10:15 AM"
            },
            {
                title: "Delivered",
                description: "Your order was delivered successfully.",
                time: "Oct 3, 2026 · 1:20 PM"
            }
        ]
    }

};




const money = value => {
    return "₹" + Math.round(Number(value) || 0).toLocaleString("en-IN");
};


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function readStorage(key) {

    try {
        return JSON.parse(
            localStorage.getItem(key) || "null"
        );
    } catch (error) {
        console.error("Storage error:", error);
        return null;
    }
}




const trackForm =
    document.getElementById("trackForm");

const result =
    document.getElementById("result");

const emptyState =
    document.getElementById("emptyState");

const toast =
    document.getElementById("toast");




function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}




function demoOrder(id) {

    const input =
        document.getElementById("orderId");

    if (input) {
        input.value = id;
    }

    showOrder(id);
}




function findStoredOrder(id) {

  
    const orders =
        readStorage("marketmine_orders");

    if (Array.isArray(orders)) {

        const order = orders.find(item => {

            const savedId = String(
                item?.id ||
                item?.orderId ||
                item?.order ||
                ""
            )
                .trim()
                .toUpperCase();

            return savedId === id;
        });

        if (order) {
            return order;
        }
    }


    

    const mimOrders =
        readStorage("mim-orders");

    if (Array.isArray(mimOrders)) {

        const order = mimOrders.find(item => {

            const savedId = String(
                item?.id ||
                item?.orderId ||
                item?.order ||
                ""
            )
                .trim()
                .toUpperCase();

            return savedId === id;
        });

        if (order) {
            return order;
        }
    }


    

    const lastOrder =
        readStorage("mim-last-order");

    if (lastOrder) {

        const savedId = String(
            lastOrder.id ||
            lastOrder.orderId ||
            lastOrder.order ||
            ""
        )
            .trim()
            .toUpperCase();

        if (savedId === id) {
            return lastOrder;
        }
    }



    const individualOrder =
        readStorage("mim-order-" + id);

    if (individualOrder) {

        const savedId = String(
            individualOrder.id ||
            individualOrder.orderId ||
            individualOrder.order ||
            ""
        )
            .trim()
            .toUpperCase();

        if (savedId === id) {
            return individualOrder;
        }
    }


    return null;
}



function showOrder(rawId) {

    const id = String(rawId || "")
        .trim()
        .toUpperCase();


    if (!id) {

        result.style.display = "none";
        emptyState.style.display = "block";

        return;
    }


    let order = null;


   

  order = findStoredOrder(id);

if (!order && demoOrders[id]) {
    order = demoOrders[id];
}


    

    if (!order) {

        result.style.display = "none";
        emptyState.style.display = "block";

        return;
    }


  

    emptyState.style.display = "none";
    result.style.display = "block";


    const displayId =
        order.id ||
        order.orderId ||
        id;



    let orderDate =
        order.date ||
        "Recently";


    if (order.createdAt) {

        const date =
            new Date(order.createdAt);

        if (!isNaN(date.getTime())) {

            orderDate =
                date.toLocaleDateString("en-IN");
        }
    }




    document.getElementById(
        "displayOrderId"
    ).textContent = displayId;


    document.getElementById(
        "summaryId"
    ).textContent = displayId;


    document.getElementById(
        "orderDate"
    ).textContent = orderDate;


    document.getElementById(
        "summaryDate"
    ).textContent = orderDate;


    document.getElementById(
        "deliveryDate"
    ).textContent =
        order.delivery ||
        "Expected within 5–7 days";


    document.getElementById(
        "deliveryMessage"
    ).textContent =
        order.message ||
        "Your order has been placed successfully.";


    document.getElementById(
        "statusLabel"
    ).textContent =
        order.status ||
        "Order Placed";


    document.getElementById(
        "paymentMethod"
    ).textContent =
        order.paymentMethod ||
        order.payment ||
        "Cash on Delivery";


    document.getElementById(
        "paymentStatus"
    ).textContent =
        order.paymentStatus ||
        "Pending";


   

    document.getElementById(
        "subtotal"
    ).textContent =
        money(order.subtotal || 0);


    document.getElementById(
        "shipping"
    ).textContent =
        Number(order.shipping || 0) === 0
            ? "Free"
            : money(order.shipping);


    document.getElementById(
        "discount"
    ).textContent =
        Number(order.discount || 0) === 0
            ? "—"
            : "−" + money(order.discount);


    document.getElementById(
        "total"
    ).textContent =
        money(order.total || 0);




    const customer =
        order.customer || {};


    let address = "";


    if (order.address) {

        address = order.address;

    } else {

        address = [
            customer.name,
            customer.address,
            customer.city,
            customer.state,
            customer.pincode,
            customer.phone
        ]
            .filter(Boolean)
            .join(", ");
    }


    document.getElementById(
        "address"
    ).textContent =
        address ||
        "Address details unavailable";




    const stage =
        Number(order.stage || 0);

        


    const pill =
        document.querySelector(".status-pill");


    const dot =
        document.querySelector(".status-dot");


    if (pill) {

        pill.style.background =
            stage === 4
                ? "#e5f8ef"
                : "#f1e8ff";

        pill.style.color =
            stage === 4
                ? "#087a50"
                : "#6d28d9";
    }


    if (dot) {

        dot.style.background =
            stage === 4
                ? "#16a36e"
                : "#7c3aed";
    }

       const timeline = document.getElementById("timeline");

if (timeline) {

    const events = order.events?.length
        ? order.events
        : [
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
        ];

    const stage = Number(order.stage ?? 0);

    timeline.innerHTML = events.map((event, index) => {

        const completed = index < stage;

        const current =
            index === stage && stage < 4;

        const cls =
            completed
                ? "completed"
                : current
                    ? "current"
                    : "pending";

        const symbol =
            completed
                ? "✓"
                : index + 1;

        return `
            <div class="step ${cls}">

                <div class="step-icon">
                    ${symbol}
                </div>

                <div class="step-content">

                    <h4>${event.title}</h4>

                    <p>${event.description}</p>

                    <time>
                        ${event.time || "Awaiting update"}
                    </time>

                </div>

            </div>
        `;

    }).join("");
}




   





    const products =
        Array.isArray(order.products)
            ? order.products
            : Array.isArray(order.items)
                ? order.items
                : [];


    document.getElementById(
        "productList"
    ).innerHTML = products.length

        ? products.map(product => {

            const name =
                product.name ||
                product.title ||
                "Personalized Product";


            const price =
                Number(product.price || 0);


            const quantity =
                Number(
                    product.quantity ||
                    product.qty ||
                    1
                );


            const icon =
                product.icon ||
                "🎁";


            const detail =
                product.detail ||
                `Quantity: ${quantity}`;


            return `
                <div class="product-row">

                    <div class="product-image">
                        ${escapeHTML(icon)}
                    </div>

                    <div class="product-info">

                        <h4>
                            ${escapeHTML(name)}
                        </h4>

                        <p>
                            ${escapeHTML(detail)}
                        </p>

                    </div>

                    <div class="product-price">
                        ${money(price * quantity)}
                    </div>

                </div>
            `;

        }).join("")

        : `
            <p class="card-subtitle">
                No product details available.
            </p>
        `;


   

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}





if (trackForm) {

    trackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById("orderId");


            const id =
                input
                    ? input.value
                    : "";


            showOrder(id);
        }
    );
}




const orderInput =
    document.getElementById("orderId");


if (orderInput) {

    orderInput.addEventListener(
        "input",
        function () {

            emptyState.style.display =
                "none";
        }
    );
}
