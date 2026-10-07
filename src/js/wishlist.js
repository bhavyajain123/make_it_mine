document.addEventListener("DOMContentLoaded", function () {

    const WISHLIST_KEY = "marketmine_wishlist";
    const CART_KEY = "marketmine_cart";

    const wishlistGrid =
        document.querySelector(".wishlist-grid");


    function getWishlist() {

        try {

            return JSON.parse(
                localStorage.getItem(WISHLIST_KEY) || "[]"
            );

        } catch (error) {

            console.error(
                "Unable to read wishlist:",
                error
            );

            return [];

        }

    }


    function saveWishlist(wishlist) {

        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(wishlist)
        );

    }


    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

        } catch (error) {

            return [];

        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    }


    function renderWishlist() {

        const wishlist = getWishlist();

        wishlistGrid.innerHTML = "";


        if (wishlist.length === 0) {

            wishlistGrid.innerHTML = `

                <div style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    border: 1px dashed #ddd;
                    border-radius: 15px;
                ">

                    <div style="
                        font-size: 40px;
                        margin-bottom: 15px;
                    ">
                        ♡
                    </div>

                    <h3>
                        Your wishlist is empty
                    </h3>

                    <p style="
                        color: #777;
                        margin-top: 8px;
                    ">
                        Save your favorite products
                        and designs here.
                    </p>

                </div>

            `;

            return;
        }


        wishlist.forEach(function (product) {

            const card =
                document.createElement("article");

            card.className = "wishlist-card";


            const image =
                product.image ||
                "../assets/images/custom-tshirt.png";


            const name =
                product.name ||
                "Custom Design";


            const price =
                Number(product.price || 549);


            card.innerHTML = `

                <div class="product-image">

                    <button
                        class="remove"
                        data-id="${product.id}"
                    >
                        ×
                    </button>

                    <img
                        src="${image}"
                        alt="${name}"
                    >

                </div>


                <div class="product-info">

                    <h3>
                        ${name}
                    </h3>

                    <p class="price">
                        ₹${price.toLocaleString("en-IN")}
                    </p>

                    <button
                        class="cart-btn"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            `;


            wishlistGrid.appendChild(card);

        });


        attachRemoveEvents();

        attachCartEvents();

    }


    function attachRemoveEvents() {

        document
            .querySelectorAll(".remove")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            this.dataset.id;


                        let wishlist =
                            getWishlist();


                        wishlist =
                            wishlist.filter(
                                function (item) {

                                    return String(item.id)
                                        !== String(id);

                                }
                            );


                        saveWishlist(wishlist);

                        renderWishlist();

                    }
                );

            });

    }


    function attachCartEvents() {

        document
            .querySelectorAll(".cart-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            this.dataset.id;


                        const wishlist =
                            getWishlist();


                        const product =
                            wishlist.find(
                                function (item) {

                                    return String(item.id)
                                        === String(id);

                                }
                            );


                        if (!product) {
                            return;
                        }


                        const cart =
                            getCart();


                        const existing =
                            cart.find(
                                function (item) {

                                    return String(item.id)
                                        === String(product.id);

                                }
                            );


                        if (existing) {

                            existing.quantity =
                                Number(
                                    existing.quantity || 1
                                ) + 1;

                        } else {

                            cart.push({

                                ...product,

                                quantity: 1

                            });

                        }


                        saveCart(cart);


                        alert(
                            product.name +
                            " added to cart!"
                        );

                    }
                );

            });

    }


    renderWishlist();

});