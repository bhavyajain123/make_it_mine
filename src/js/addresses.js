


  document.addEventListener("DOMContentLoaded", function () {

    const STORAGE = {

        cart: "marketmine_cart",

         wishlist: "marketmine_wishlist",
   designs: "marketmine_designs",

       user: "marketmine_user",


   addresses: "marketmine_addresses",

        notifications: "marketmine_notifications",

        search: "marketmine_search"
    };



    function getData(key, fallback = []) {
        try {

            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch

         {

            return fallback;

        }

    }

    function setData(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    }



    function getCart() {
         
     return getData(STORAGE.cart, []);


    }


    function getWishlist() {
        return getData(STORAGE.wishlist, []);


    }


    function productFromElement(element) {


          const card = element.closest(

            ".product-card, .related-card, .wishlist-card, .product-detail-container"
        );
        const image = card?.querySelector("img");
          const title =

            card?.querySelector(

                "h1, h2, h3, .product-title, .product-name"
            )?.textContent.trim() || "Custom Product";



        const priceText =
            card?.querySelector(


                ".product-price, .price"
            )?.textContent || "₹599";



        const price = Number(

            
            priceText.replace(/[^\d]/g, "")
        ) || 599;



        return {

              id: (

            image?.src ||
            title


            ).split("/").pop() + "-" + title.toLowerCase().replace(/\s+/g, "-"),
            name: title,

            price: price,

            image: image?.getAttribute("src") || "../assets/images/custom-tshirt.png",
            quantity: 1

        };

    }

    function updateCartCount() {

        const cart = getCart();

        const count = cart.reduce(
            (total, item) => total + Number(item.quantity || 1),


            0
        );

        document.querySelectorAll(".cart-count").forEach(element => {
          element.textContent = count;

        });


    }


    function addToCart(product) {


    const cart = getCart();
    

      const existing = cart.find(item => item.id === product.id);



        if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
        } 
        else {

      cart.push(product);


        }

        setData(STORAGE.cart, cart);

     updateCartCount();


        alert(product.name + " added to cart!");
    }

    function removeFromCart(id) {

   const cart = getCart().filter(item => item.id !== id);

         setData(STORAGE.cart, cart);
         
        updateCartCount();

    }


    function addToWishlist(product) {

        const wishlist = getWishlist();


          if (!wishlist.some(item => item.id === product.id)) {

              wishlist.push(product);
            setData(STORAGE.wishlist, wishlist);
        }
        alert(product.name + " added to wishlist!");
    }


    function removeFromWishlist(id) {

        const wishlist = getWishlist().filter(

           item => item.id !== id

        );

         setData(STORAGE.wishlist, wishlist);

    }

    updateCartCount();

    document.querySelectorAll(".add-cart-btn, .add-to-cart-btn").forEach(button => {

     button.addEventListener("click", function (event) {

              event.preventDefault();
            const product = productFromElement(this);
            addToCart(product);


        });

    });

    document.querySelectorAll(".cart-btn").forEach(button => {

        if (
             this === undefined

        ) {

              return;
        }

        button.addEventListener("click", function (event) {

      event.preventDefault();

            const product = productFromElement(this);
            addToCart(product);

        });
    });

    document.querySelectorAll(".wishlist-btn, .image-wishlist").forEach(button => {

        button.addEventListener("click", function (event) {


            event.preventDefault();

            const product = productFromElement(this);


            const wishlist = getWishlist();

            const exists = wishlist.some(
                item => item.id === product.id

            );
            if (exists) {

            removeFromWishlist(product.id);
             this.textContent = "♡";


            } else

             {
                addToWishlist(product);

                this.textContent = "♥";


            }

        });

    });



    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", function () {

            const card = this.closest(

             ".wishlist-card, .cart-item, .design-card, .address-card"

            );


            if (!card)  {

                return;


            }

              const image = card.querySelector("img");

            const title =
                card.querySelector("h3, h2")?.textContent.trim() ||
                "";


            const wishlist = getWishlist();


            const item = wishlist.find(

                product =>
                product.name === title ||
                 product.image?.includes(
                        image?.getAttribute("src") || "none"

                    )

            );


            if (item) {


                removeFromWishlist(item.id);
            }

            card.remove();

             updateCartCount();


        });
    });


    document.querySelectorAll(".quantity-control").forEach(control => {


            const buttons = control.querySelectorAll("button");
           const value = control.querySelector("span");


        if  (buttons.length < 2 || !value) {

            return;

        }
        buttons[0].addEventListener("click", function () {
            let quantity = Number(value.textContent) || 1;



            if (quantity > 1) {

                  quantity--;
            }

            value.textContent = quantity;

        });


        buttons[1].addEventListener("click", function () {

            let quantity = Number(value.textContent) || 1;
            quantity++;


            value.textContent = quantity;

        });

    });


    document.querySelectorAll(".size-options button").forEach(button => {


        button.addEventListener("click", function () {

            document

                .querySelectorAll(".size-options button")
                .forEach(item => item.classList.remove("active"));


            this.classList.add("active");



        });
    });



    document.querySelectorAll(".color-circle").forEach(button => {

        button.addEventListener("click", function () {

            

              document
                 .querySelectorAll(".color-circle")

                .forEach(item => item.classList.remove("active"));

             this.classList.add("active");
 


            const heading = this

                .closest(".product-option-section")

                ?.querySelector(".option-heading span");



            if (heading) {

                 heading.textContent =
                    this.getAttribute("title") || "Selected";
            }

        });

    });




    document.querySelectorAll(".thumbnail").forEach(thumbnail => {


        thumbnail.addEventListener("click", function () {
            document

                 .querySelectorAll(".thumbnail")
                    .forEach(item => item.classList.remove("active"));



            this.classList.add("active");


            const thumbnailImage = this.querySelector("img");


              const mainImage = document.querySelector(

                ".main-product-image img"

            );

            if (thumbnailImage && mainImage) {
                mainImage.src = thumbnailImage.src;

            }

        });

    });

      document.querySelectorAll(".header-actions button").forEach(button => {

          const title = (

            button.getAttribute("title") || ""

        ).toLowerCase();
        button.addEventListener("click", function () {


            if (title.includes("wishlist")) {

                window.location.href = "./wishlist.html";
            }


            if (title.includes("account")) {

                window.location.href = "./profile.html";
            }


            if (title.includes("cart")) {

                window.location.href = "./cart.html";
            }
            if (title.includes("search")) {

                 const searchInput =

                    document.querySelector(".search-box input");


  
                 if (searchInput) {

                      
                     searchInput.focus();

                }

              }

         });

    });

    document.querySelectorAll(".cart-link").forEach(link => {



          link.addEventListener("click", function () {
            window.location.href = "./cart.html";
        });
    });



    document.querySelectorAll(".search-box input").forEach(input => {

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {



                const query = this.value.trim();

 
                 if (query) {

                localStorage.setItem(
                  STORAGE.search,
                      query

                );

                    window.location.href =
                        "./shop.html?search=" +
                        encodeURIComponent(query);

                }
            }


        });

    });

document.querySelectorAll(".search-box button").forEach(button => {


        button.addEventListener("click", function () {

            const input =

                this.closest(".search-box")?.querySelector("input");


            if (input && input.value.trim()) {


                localStorage.setItem(

                       STORAGE.search,
                      input.value.trim()
                ); 

                window.location.href =
                "./shop.html?search=" +
                    encodeURIComponent(input.value.trim());

            }

        });

    });



       const params = new URLSearchParams(

        window.location.search
    );


    const searchQuery =
        params.get("search") ||

        localStorage.getItem(STORAGE.search);


    if (
        searchQuery &&
          document.querySelector(".product-grid")


    ) {

        const query = searchQuery.toLowerCase();


        document
            .querySelectorAll(".product-card")
              .forEach(card => {



                const text =

                    card.textContent.toLowerCase();

                   card.style.display =

                    text.includes(query)
                         ? ""
                          : "none";


            });
    }



    document.querySelectorAll(".product-card").forEach(card => {

        const titleLink = card.querySelector(
             ".product-info h3"

        )?.closest("a");

        if (titleLink) {
              return;
        }


        card.addEventListener("dblclick", function () {

            window.location.href =
        "./product-detail.html";



        });
    });


    document.querySelectorAll(".customize-btn").forEach(button => {



        button.addEventListener("click", function () {
            if (


                this.tagName.toLowerCase() === "a" &&
           this.getAttribute("href")
            ) {
                return;

            }
            window.location.href =
                "./customize.html";

          });

      });

    document.querySelectorAll(".reset-btn").forEach(button => {

        button.addEventListener("click", function () {
            document

                .querySelectorAll(



                    "input[type='text'], input[type='color'], select"
                )


                .forEach(input => {

                    if (input.type === "color") {
                        input.value = "#000000";
  } else {

                        input.value = "";


                    }

                });



            document
            .querySelectorAll(".active")

                .forEach(item => {
                    if (

  
                     item.classList.contains("color-circle")  ||
                       item.classList.contains("size-options")
                    ) {
                     
                        item.classList.remove("active");


                    }

                });


        });


    });



    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", function (event) {


            event.preventDefault();


            const inputs =

                this.querySelectorAll("input");
            let valid = true;


              inputs.forEach(input => {


                if (
  
     input.hasAttribute("required") &&
                    !input.value.trim()

                ) 
                {
                    valid = false;
                    input.style.borderColor = "#ff4f81";
                }
            });


            if (!valid) {
              alert("Please fill all required fields.");
                return;


            }


            const page =
              window.location.pathname
                      .split("/")
                      .pop()
                    .toLowerCase();


            if (page === "login.html") {

                const email =
                        this.querySelector(

                     "input[type='email']"
                     
                    )?.value;



                const password =
                    this.querySelector(

                        "input[type='password']"

                    )?.value;


                if (!email || !password) {
                  alert("Enter email and password.");
                  
                return;
                }


                setData(STORAGE.user, {
                email: email,
                    loggedIn: true


                });
                alert("Login successful!");


                window.location.href =

                    "./profile.html";

                
                    return;
            }
            
            if (page === "forgot-password.html") {


                alert(


                    "Password reset instructions have been sent to your email."

                );
                return;


            }

            if (page === "contact.html") {
                alert(

                    "Your message has been sent successfully!"

                );

                form.reset();

                return;

            }

            if (page === "checkout.html") {

                  window.location.href =
                    "./payment.html";

                return;

            }

           
            alert("Form submitted successfully!");


        });


    });


    document.querySelectorAll(

     ".order-actions .track, .track-btn"

    ).forEach(button => {

        button.addEventListener("click", function () {
              if (
                this.tagName.toLowerCase() === "a" &&
                this.getAttribute("href")
            )
             {
                   return;
            }
            window.location.href =
                "./order-tracking.html";


        });
    });

    

    document.querySelectorAll(

        ".edit, .edit-design"

    ).forEach(button => {

        button.addEventListener("click", function () {

            if (

                  this.tagName.toLowerCase() === "a" &&
                this.getAttribute("href")
            ) {
                return;

            }


            window.location.href =
                "./customize.html";

        });

    });



    document.querySelectorAll(".delete").forEach(button => {

        button.addEventListener("click", function () {

            const card =
                   this.closest(
                     ".design-card, .notification-card"
                );


            if (card) {

                card.remove();
            }
        });


    });

    document.querySelectorAll(".product-option").forEach(option => {
        option.addEventListener("click", function () {



            document
                .querySelectorAll(".product-option")
                .forEach(item =>

                    item.classList.remove("active")

                );
            this.classList.add("active");


              const image =
                  this.querySelector("img");


            const preview =

                  document.querySelector(
                ".preview-product img, .customizer-preview img"


                );

            if (image && preview) {
            preview.src = image.src;

            }
        });
    });



    const uploadInput =
    document.querySelector(

            "input[type='file']"


        );


    if (uploadInput) {


        uploadInput.addEventListener(
         "change",

            function () {
                const file = this.files[0];

                if (!file) {
              return;

                }

                const reader =

                    new FileReader();
                reader.onload = function (event) {
  
                     const preview =
                          document.querySelector(
                            ".preview-product img, .customizer-preview img"
                        );

                       
                    if (preview) {

                         preview.src =
                        event.target.result;
                    }

                    localStorage.setItem(
                        "marketmine_uploaded_image",
                        event.target.result


                    );


                };
                reader.readAsDataURL(file);


        }
        );


    }

    const textInput =

        document.querySelector(

            ".text-input, .custom-text-input, input[name='customText']"


        );
        

    const textPreview =

    document.querySelector(
        ".custom-text-preview"

        );


    if  (textInput && textPreview) {
        textInput.addEventListener(


            "input",
            function ()  {

              textPreview.textContent =
                     this.value;

            }
        );
    }



    document.querySelectorAll(



        ".color-options button"

    ).forEach(button => {
        button.addEventListener (

         "click",


            function ()  {



                const color =

                 this.dataset.color ||
             this.getAttribute("title");



                if (textPreview && color) {
                    const colors = {
                            black: "#111",
                          white: "#fff",

                          blue: "#4285f4",

                         pink: "#ff4f81",
                           green: "#55a868"
                    };  
                    textPreview.style.color =

                        colors[
                            color.toLowerCase()
                        ] || color;
                }
            }
        );

    });


    document.querySelectorAll(

    ".add-to-cart-btn"

    ).forEach(button => {



        button.addEventListener(
         "click",

            function () {

                const product = {
                    id: "custom-" + Date.now(),
            name: "Customized Product",
                      price: 599,


                    image:

                      document.querySelector(


                     ".preview-product img, .customizer-preview img"
                        )?.src ||

                        "../assets/images/custom-tshirt.png",
                    quantity: 1


                };
                  addToCart(product);

               }
        );


    });



    document.querySelectorAll(

      ".save-design, .save-design-btn"

    ).forEach(button => {

     button.addEventListener(

            "click",

            function () {
                const designs =
                    getData(

                     STORAGE.designs,
                        []
                    );


                designs.push({

                    id: Date.now(),


                      name:

                          textInput?.value ||
                            "My Custom Design",


                    image:

                          document.querySelector(
                             ".preview-product img, .customizer-preview img"
                         )?.src ||
                        "../assets/images/custom-tshirt.png",


                    createdAt:


                          new Date().toLocaleDateString()

                });

                setData(
                    STORAGE.designs,
                      designs


                );
                alert(
                      "Design saved successfully!"

                );
            }
        );
    });
       document.querySelectorAll  (


     ".coupon-btn, .apply-coupon"

    ).forEach(button => {


          button.addEventListener(
         "click",

              function () {


                const input =

                        document.querySelector(
                        ".coupon-input, input[name='coupon']"
                    );

                if  (!input)  {

                  return;


                }
                const code =

                    input.value

                        .trim()
                         .toUpperCase();


                 const discounts = {

                      MINE20: 0.20,
                      FIRST100: 100,
                    DESIGNFREE: 50,
                    FREESHIP: 100


                };

                
                if (discounts[code])  {


                    localStorage.setItem(

                       "marketmine_coupon",
                    code

                    );
                    alert(


                 "Coupon " +
                         code +
                         " applied!"


                    );
            
                } 
                else {

                    alert(


                    "Invalid coupon code."

                    );
                }
            }

        );


    });



document.querySelectorAll(
    ".continue-shopping, .shop-btn"


    ).forEach(button => {


        if (
            button.textContent

               .toLowerCase()
             .includes("shop")

        ) 

        {
              button.addEventListener(


                 "click",

             function ()  {


                    if (

                          this.tagName.toLowerCase() !==

                        "a"
                    )
                     {

                      window.location.href =
                         "./shop.html";
                    }
                }

            );
        }


    });



document.querySelectorAll(

          ".logout-btn, [data-action='logout']"

    ).forEach(button => {
        button.addEventListener(

          "click",

            function () {

                localStorage.removeItem(
                    STORAGE.user
                );

                  alert("Logged out successfully.");
                window.location.href =

                    "./login.html";
            }
        );

    });


     const orderId =

     localStorage.getItem(



              "marketmine_order_id"
     ); 
 


       document.querySelectorAll(

              ".order-number strong, .order-id"

      ).forEach(element => {

          if  (

         orderId &&
            element.textContent.includes(
                "MIM-2026"

            )


        ) {
               element.textContent =

             "#" + orderId;
        }

    });


});






document.addEventListener("DOMContentLoaded", function () {


    document
        .querySelectorAll(

        ".address-actions button"

        )
        

        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        this.textContent
                            .trim()
                              .toLowerCase();

                    if (action === "remove") {

                          const card =


                            this.closest(
                                ".address-card"

                            );

                        if (
                            card &&
                            confirm(
                                "Remove this address?"
                            )
                        )  {
                            card.remove();

                        }

                    }

                    if (
                          action === "edit"

                    ) {


                        alert(
                            "Address editing form will open here."
                        );

                    }

                    if (
                        action.includes(
                            "default"
                        )
                    ) {

                        alert(
                            "Address set as default."
                        );

                    }
                }

            );


        });

});
