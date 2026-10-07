document.addEventListener("DOMContentLoaded", function () {

    const orderId =
        localStorage.getItem("marketmine_order_id");

    const orderStatus =
        localStorage.getItem("marketmine_order_status") ||
        "Order Placed";

    let order = null;

    try {
        const orders = JSON.parse(
            localStorage.getItem("marketmine_orders") || "[]"
        );

        if (Array.isArray(orders) && orderId) {
            order = orders.find(item => {
                const savedId = String(
                    item?.id ||
                    item?.orderId ||
                    item?.order ||
                    ""
                )
                    .trim()
                    .toUpperCase();

                return savedId === orderId.trim().toUpperCase();
            });
        }
    } catch (error) {
        console.error("Unable to read order:", error);
    }


 
    document
        .querySelectorAll(".order-number strong, .order-id")
        .forEach(element => {

            if (orderId) {
                element.textContent = orderId;
            }

        });


   

    document
        .querySelectorAll(".order-status, .status-label")
        .forEach(element => {

            element.textContent =
                order?.status || orderStatus;

        });




    if (order) {

        document
            .querySelectorAll(".order-total, .total-amount")
            .forEach(element => {

                if (order.total !== undefined) {
                    element.textContent =
                        "₹" +
                        Number(order.total).toLocaleString("en-IN");
                }

            });

    }



    document
        .querySelectorAll(".track-order, .track-btn")
        .forEach(button => {

            button.addEventListener("click", function (event) {

                if (
                    this.tagName.toLowerCase() !== "a" ||
                    !this.getAttribute("href")
                ) {
                    event.preventDefault();

                    window.location.href =
                        "./order-tracking.html";
                }

            });

        });

});