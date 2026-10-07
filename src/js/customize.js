
        const CART_KEY = "mim-cart";

const params = new URLSearchParams(window.location.search);

const requestedId = params.get("id") || "1";

const customizeProducts = {

    "1": {
        id: 1,
        name: "Classic Custom T-Shirt",
        price: 599,
        type: "tshirt",
        emoji: "👕",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85"
    },

    "2": {
        id: 2,
        name: "Personalized Photo Mug",
        price: 399,
        type: "mug",
        emoji: "☕",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85"
    },

    "3": {
        id: 3,
        name: "Good Vibes Hoodie",
        price: 999,
        type: "hoodie",
        emoji: "🧥",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85"
    },

    "4": {
        id: 4,
        name: "Custom Phone Case",
        price: 499,
        type: "phone-case",
        emoji: "📱",
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=85"
    },

    "5": {
        id: 5,
        name: "Minimal Canvas Tote",
        price: 349,
        type: "tote",
        emoji: "👜",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85"
    },

    "6": {
        id: 6,
        name: "Personalized Photo Frame",
        price: 699,
        type: "frame",
        emoji: "🖼️",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85"
    },

    "7": {
        id: 7,
        name: "Custom Embroidered Cap",
        price: 299,
        type: "cap",
        emoji: "🧢",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=85"
    },

    "8": {
        id: 8,
        name: "Memory Cushion",
        price: 549,
        type: "cushion",
        emoji: "🛋️",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85"
    },

"10": {
    id: 10,
    name: "Custom Travel Mug",
    price: 649,
    type: "mug",
    emoji: "🥤",
    image: "../assets/images/photo-mug.png"
}

};

const selectedProduct =
    customizeProducts[requestedId] ||
    customizeProducts["1"];

const PRODUCT_ID = selectedProduct.id;

const PRODUCT_NAME = selectedProduct.name;

const BASE_PRICE = selectedProduct.price;

const productOptions = {

    "1": {
        colors: [
            { name: "White", value: "#ffffff" },
            { name: "Black", value: "#202024" },
            { name: "Red", value: "#d9253b" }
        ],
        sizes: ["Standard"]
    },

    "2": {
        colors: [
            { name: "White", value: "#ffffff" },
            { name: "Black", value: "#202024" },
            { name: "Blue", value: "#8fa8cc" },
            { name: "Pink", value: "#d9a3a3" }
        ],
        sizes: ["Standard"]
    },

    "3": {
        colors: [
            { name: "Black", value: "#202024" },
            { name: "White", value: "#ffffff" },
            { name: "Grey", value: "#929397" },
            { name: "Navy", value: "#1e3158" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    "4": {
        colors: [
            { name: "Black", value: "#202024" },
            { name: "Clear", value: "#eeeeee" },
            { name: "Blue", value: "#6d8fbd" },
            { name: "Pink", value: "#d9a3a3" }
        ],
        sizes: ["Standard"]
    },

    "5": {
        colors: [
            { name: "Natural", value: "#e8dcc8" },
            { name: "Black", value: "#202024" }
        ],
        sizes: ["Standard"]
    },

    "6": {
        colors: [
            { name: "White", value: "#ffffff" },
            { name: "Black", value: "#202024" },
            { name: "Brown", value: "#76543c" }
        ],
        sizes: ["8×10", "12×16"]
    },

    "7": {
        colors: [
            { name: "Black", value: "#202024" },
            { name: "White", value: "#ffffff" },
            { name: "Navy", value: "#1e3158" },
            { name: "Red", value: "#d9253b" }
        ],
        sizes: ["Standard"]
    },

    "8": {
        colors: [
            { name: "White", value: "#ffffff" },
            { name: "Pink", value: "#d9a3a3" },
            { name: "Blue", value: "#8fa8cc" },
            { name: "Grey", value: "#929397" }
        ],
        sizes: ["16×16", "18×18"]
    },
    "10": {
    colors: [
        { name: "White", value: "#ffffff" },
        { name: "Black", value: "#202024" },
        { name: "Red", value: "#d9253b" }
    ],
    sizes: ["Standard"]
}

};

const currentOptions =
    productOptions[String(PRODUCT_ID)] ||
    productOptions["1"];

function renderProductPreview() {

    const image =
        document.getElementById("productPreviewImage");

    const thumbnails =
        document.getElementById("productThumbnails");

    if (!image) {
        return;
    }

    image.src = selectedProduct.image;

    image.alt = selectedProduct.name;

    document.title =
        selectedProduct.name + " | Make It Mine";

        const priceElement =
    document.getElementById("productPrice");

const priceNote =
    document.getElementById("productPriceNote");

if (priceElement) {
    priceElement.textContent =
        formatPrice(selectedProduct.price);
}

if (priceNote) {
    priceNote.textContent =
        selectedProduct.name + " · Price per item";
}


    if (thumbnails) {

        thumbnails.innerHTML = `
            <div class="product-thumbnail active">
                <img
                    src="${selectedProduct.image}"
                    alt="${selectedProduct.name}"
                >
            </div>
        `;

    }

}

        const designText = document.getElementById("designText");
        const designImage = document.getElementById("designImage");
        const customText = document.getElementById("customText");
        const productPreviewImage =
    document.getElementById("productPreviewImage");
        const imageUpload = document.getElementById("imageUpload");
        const uploadedFile = document.getElementById("uploadedFile");
        const uploadedFileName = document.getElementById("uploadedFileName");
        const addToCartButton = document.getElementById("addToCart");

       let selectedColor =
    currentOptions.colors[0].value;

let selectedTextColor = "#ffffff";

let selectedSize =
    currentOptions.sizes[0];
        let selectedFont = "Arial, sans-serif";
        let selectedTextSize = 27;
        let isBold = true;
        let isItalic = false;
        let isUnderline = false;
        let selectedAlignment = "center";
        let selectedDesignName = "";
        let uploadedImageData = "";
        let selectedView = "front";
        let toastTimer;

        function formatPrice(price) {
            return "₹" + Number(price).toLocaleString("en-IN");
        }

        function renderProductOptions() {

    const colorContainer =
        document.getElementById("productColors");

    const sizeContainer =
        document.getElementById("sizeOptions");


    // Product colors
    if (colorContainer) {

        colorContainer.innerHTML =
            currentOptions.colors.map((color, index) => {

                return `
                    <button
                        type="button"
                        class="product-color ${index === 0 ? "active" : ""}"
                        data-color="${color.value}"
                        style="background:${color.value}"
                        aria-label="${color.name}"
                        title="${color.name}"
                    ></button>
                `;

            }).join("");

    }


    // Product sizes
    if (sizeContainer) {

        sizeContainer.innerHTML =
            currentOptions.sizes.map((size, index) => {

                return `
                    <button
                        type="button"
                        class="size-button ${index === 0 ? "active" : ""}"
                        data-size="${size}"
                    >
                        ${size}
                    </button>
                `;

            }).join("");

    }

}

        function readCart() {
            try {
                const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
                return Array.isArray(cart) ? cart : [];
            } catch {
                return [];
            }
        }

        function saveCart(cart) {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            updateCartCount();
        }

        function updateCartCount() {
            const cart = readCart();
            const count = cart.reduce((sum, item) => {
                return sum + Math.max(0, Number(item.quantity ?? item.qty ?? 1));
            }, 0);

            document.getElementById("cartCount").textContent = count;
        }

        function showToast(message) {
            const toast = document.getElementById("toast");
            toast.textContent = message;
            toast.classList.add("show");
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                toast.classList.remove("show");
            }, 2600);
        }

        function updateTextPreview() {
            const text = customText.value;
            designText.textContent = text;
            document.getElementById("characterCount").textContent =
                text.length + "/50";

            designText.style.color = selectedTextColor;
            designText.style.fontFamily = selectedFont;
            designText.style.fontSize = selectedTextSize + "px";
            designText.style.fontWeight = isBold ? "700" : "400";
            designText.style.fontStyle = isItalic ? "italic" : "normal";
            designText.style.textDecoration = isUnderline ? "underline" : "none";
            designText.style.textAlign = selectedAlignment;

            designText.style.display = "block";
            designImage.style.display = "none";
            selectedDesignName = "";
        }

        function showText(text, name = "") {
            customText.value = text;
            designText.textContent = text;
            designText.style.display = "block";
            designImage.style.display = "none";
            selectedDesignName = name;
            updateTextPreview();
        }

        function updateDesignAreaForProduct() {

    if (!designArea) {
        return;
    }

    const type = selectedProduct.type;

    if (type === "tshirt" || type === "hoodie") {

        designArea.style.left = "50%";
        designArea.style.top = "51%";
        designArea.style.width = "38%";
        designArea.style.height = "43%";

   } else if (type === "mug") {

    designArea.style.left = "38%";
    designArea.style.top = "42%";
    designArea.style.width = "28%";
    designArea.style.height = "24%";

} else if (type === "phone-case") {

    designArea.style.left = "59%";
    designArea.style.top = "55%";
    designArea.style.width = "30%";
    designArea.style.height = "42%";

} else if (type === "tote") {

        designArea.style.left = "50%";
        designArea.style.top = "50%";
        designArea.style.width = "38%";
        designArea.style.height = "40%";

    } else if (type === "frame") {

        designArea.style.left = "50%";
        designArea.style.top = "50%";
        designArea.style.width = "55%";
        designArea.style.height = "55%";

    } else if (type === "cap") {

        designArea.style.left = "50%";
        designArea.style.top = "40%";
        designArea.style.width = "35%";
        designArea.style.height = "25%";

    } else if (type === "cushion") {

        designArea.style.left = "50%";
        designArea.style.top = "50%";
        designArea.style.width = "45%";
        designArea.style.height = "45%";

    }

}

        function updateProductColor(color) {

    selectedColor = color;

    document
        .querySelectorAll(".product-color, .thumbnail")
        .forEach(button => {

            if (!button.dataset.color) {
                return;
            }

            button.classList.toggle(
                "active",
                button.dataset.color.toLowerCase() ===
                color.toLowerCase()
            );

        });

    const isLight =
        color.toLowerCase() === "#ffffff" ||
        color.toLowerCase() === "#f4f0e8";

    if (isLight) {

        designArea.style.borderColor =
            "rgba(0,0,0,0.45)";

        designArea.style.borderStyle =
            "dashed";

    } else {

        designArea.style.borderColor =
            "rgba(255,255,255,0.55)";

        designArea.style.borderStyle =
            "solid";

    }

    designText.style.textShadow = "none";
}

        const designArea = document.getElementById("designArea");

       document.querySelectorAll(".product-color").forEach(button => {
            button.addEventListener("click", () => {
                updateProductColor(button.dataset.color);
            });
        });

        document.querySelectorAll(".editor-tab").forEach(button => {
            button.addEventListener("click", () => {
                const tab = button.dataset.tab;

                document.querySelectorAll(".editor-tab").forEach(tabButton => {
                    tabButton.classList.toggle("active", tabButton === button);
                });

                document.querySelectorAll(".tool-panel").forEach(panel => {
                    panel.classList.toggle("active", panel.id === tab + "Panel");
                });
            });
        });

        customText.addEventListener("input", updateTextPreview);

        document.getElementById("fontFamily").addEventListener("change", event => {
            selectedFont = event.target.value;
            updateTextPreview();
        });

        document.querySelectorAll(".color-swatch").forEach(button => {
            button.addEventListener("click", () => {
                selectedTextColor = button.dataset.color;

                document.querySelectorAll(".color-swatch").forEach(swatch => {
                    swatch.classList.toggle("active", swatch === button);
                });

                updateTextPreview();
            });
        });

        document.getElementById("textSize").addEventListener("input", event => {
            selectedTextSize = Number(event.target.value);
            document.getElementById("textSizeValue").textContent =
                selectedTextSize + " px";
            updateTextPreview();
        });

        document.querySelectorAll("[data-style]").forEach(button => {
            button.addEventListener("click", () => {
                const style = button.dataset.style;

                if (style === "bold") {
                    isBold = !isBold;
                }

                if (style === "italic") {
                    isItalic = !isItalic;
                }

                if (style === "underline") {
                    isUnderline = !isUnderline;
                }

                button.classList.toggle("active");

                updateTextPreview();
            });
        });

        document.querySelectorAll("[data-align]").forEach(button => {
            button.addEventListener("click", () => {
                selectedAlignment = button.dataset.align;

                document.querySelectorAll("[data-align]").forEach(alignButton => {
                    alignButton.classList.toggle("active", alignButton === button);
                });

                updateTextPreview();
            });
        });

        document.querySelectorAll("[data-design]").forEach(button => {
            button.addEventListener("click", () => {
                document.querySelectorAll("[data-design]").forEach(card => {
                    card.classList.toggle("active", card === button);
                });

                if (uploadedImageData) {
                    uploadedImageData = "";
                    designImage.removeAttribute("src");
                    uploadedFile.hidden = true;
                    imageUpload.value = "";
                }

                showText(button.dataset.design, button.dataset.name);
                showToast(button.dataset.name + " design selected!");
            });
        });

        imageUpload.addEventListener("change", event => {
            const file = event.target.files[0];

            if (!file) {
                return;
            }

            const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

            if (!allowedTypes.includes(file.type)) {
                showToast("Please select a PNG, JPG or WEBP image.");
                imageUpload.value = "";
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showToast("Image must be smaller than 5 MB.");
                imageUpload.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                uploadedImageData = reader.result;
                designImage.src = uploadedImageData;
                designImage.style.display = "block";
                designText.style.display = "none";
                uploadedFileName.textContent = file.name;
                uploadedFile.hidden = false;

                document.querySelectorAll("[data-design]").forEach(card => {
                    card.classList.remove("active");
                });

                document.querySelectorAll(".editor-tab").forEach(button => {
                    button.classList.toggle("active", button.dataset.tab === "image");
                });

                document.querySelectorAll(".tool-panel").forEach(panel => {
                    panel.classList.toggle("active", panel.id === "imagePanel");
                });

                showToast("Image added to your preview!");
            };

            reader.onerror = () => {
                showToast("Could not read the selected image.");
                imageUpload.value = "";
            };

            reader.readAsDataURL(file);
        });

        document.getElementById("removeImage").addEventListener("click", () => {
            uploadedImageData = "";
            designImage.removeAttribute("src");
            designImage.style.display = "none";
            uploadedFile.hidden = true;
            imageUpload.value = "";
            updateTextPreview();
            showToast("Image removed.");
        });

        document.querySelectorAll("[data-size]").forEach(button => {
            button.addEventListener("click", () => {
                selectedSize = button.dataset.size;

                document.querySelectorAll("[data-size]").forEach(sizeButton => {
                    sizeButton.classList.toggle("active", sizeButton === button);
                });
            });
        });

        document.querySelectorAll("[data-view]").forEach(button => {
            button.addEventListener("click", () => {
                selectedView = button.dataset.view;

                document.querySelectorAll("[data-view]").forEach(viewButton => {
                    viewButton.classList.toggle("active", viewButton === button);
                });

                if (selectedView === "front") {
                    designArea.style.left = "50%";
                    designArea.style.top = "51%";
                    designArea.style.width = "38%";
                    designArea.style.height = "43%";
                } else if (selectedView === "back") {
                    designArea.style.left = "50%";
                    designArea.style.top = "51%";
                    designArea.style.width = "38%";
                    designArea.style.height = "43%";
                } else if (selectedView === "left") {
                    designArea.style.left = "28%";
                    designArea.style.top = "37%";
                    designArea.style.width = "17%";
                    designArea.style.height = "18%";
                } else {
                    designArea.style.left = "72%";
                    designArea.style.top = "37%";
                    designArea.style.width = "17%";
                    designArea.style.height = "18%";
                }

                showToast(
                    selectedView === "front" ? "Front view selected." :
                    selectedView === "back" ? "Back view selected." :
                    selectedView === "left" ? "Left sleeve preview selected." :
                    "Right sleeve preview selected."
                );
            });
        });

       // SAVE DESIGN + ADD TO WISHLIST

document.querySelectorAll(
    ".save-design, .save-design-btn"
).forEach(button => {

    button.addEventListener("click", function () {

       const designId =
    selectedDesignName ||
    customText?.value.trim() ||
    (uploadedImageData ? "Uploaded Design" : "My Custom Design");

        const design = {

            id: designId,

            name:
                selectedDesignName ||
                customText?.value.trim() ||
                "My Custom Design",

            image:
                uploadedImageData ||
                "../assets/images/custom-tshirt.png",

            price: BASE_PRICE,

            quantity: 1,

            createdAt:
                new Date().toLocaleDateString(),

            customization: {

                text:
                    uploadedImageData
                        ? ""
                        : customText?.value || "",

                image:
                    uploadedImageData || "",

                textColor:
                    selectedTextColor,

                font:
                    selectedFont,

                textSize:
                    selectedTextSize,

                bold:
                    isBold,

                italic:
                    isItalic,

                underline:
                    isUnderline,

                alignment:
                    selectedAlignment,

                design:
                    selectedDesignName,

                productColor:
                    selectedColor,

                size:
                    selectedSize,

                view:
                    selectedView

            }

        };


        // 1. Save in Saved Designs

        const designs = JSON.parse(
            localStorage.getItem(
                "marketmine_designs"
            ) || "[]"
        );

        designs.push(design);

        localStorage.setItem(
            "marketmine_designs",
            JSON.stringify(designs)
        );


        // 2. Also add to Wishlist

        const wishlist = JSON.parse(
            localStorage.getItem(
                "marketmine_wishlist"
            ) || "[]"
        );

const alreadyExists = wishlist.some(item => {

    return (
        item.name === design.name &&
        (
            item.customization?.text || ""
        ) === (
            design.customization?.text || ""
        ) &&
        (
            item.customization?.image || ""
        ) === (
            design.customization?.image || ""
        )
    );

});


if (!alreadyExists) {

    wishlist.push(design);

    localStorage.setItem(
        "marketmine_wishlist",
        JSON.stringify(wishlist)
    );

    alert("Design saved and added to wishlist!");

} else {

    alert("This design is already in your wishlist!");

}

        alert(
            "Design saved and added to wishlist!"
        );

    });

});
        addToCartButton.addEventListener("click", () => {
            const cart = readCart();

            const customization = {
                text: uploadedImageData ? "" : customText.value,
                image: uploadedImageData,
                imageName: uploadedFileName.textContent,
                textColor: selectedTextColor,
                font: selectedFont,
                textSize: selectedTextSize,
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                alignment: selectedAlignment,
                design: selectedDesignName,
                productColor: selectedColor,
                size: selectedSize,
                view: selectedView
            };

            const customItem = {
                id: PRODUCT_ID,
                name: PRODUCT_NAME,
                price: BASE_PRICE,
                quantity: 1,
                size: selectedSize,
                color: selectedColor,
                image: "",
                emoji: "👕",
                customization: customization
            };

            try {
                cart.push(customItem);
                saveCart(cart);
                showToast("Your personalized T-shirt was added to cart!");

                addToCartButton.textContent = "✓ Added to Cart";

                setTimeout(() => {
                    addToCartButton.innerHTML = "🛒 &nbsp; Add to Cart";
                }, 1800);
            } catch {
                showToast("Could not save your item. Please try again.");
            }
        });

        document.getElementById("productSearch").addEventListener("keydown", event => {
            if (event.key === "Enter") {
                const query = event.target.value.trim();
                window.location.href = "shop.html" +
                    (query ? "?search=" + encodeURIComponent(query) : "");
            }
        });

      updateTextPreview();

renderProductOptions();

updateCartCount();

updateProductColor(selectedColor);

renderProductPreview();
updateDesignAreaForProduct();