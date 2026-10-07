document.addEventListener("DOMContentLoaded", function () {

    const DESIGN_KEY = "marketmine_designs";

    const designGrid = document.querySelector(".design-grid");

    if (!designGrid) {
        return;
    }

    function getSavedDesigns() {

        try {
            return JSON.parse(
                localStorage.getItem(DESIGN_KEY) || "[]"
            );
        } catch (error) {
            console.error("Unable to load saved designs:", error);
            return [];
        }

    }


    function saveDesigns(designs) {

        localStorage.setItem(
            DESIGN_KEY,
            JSON.stringify(designs)
        );

    }


    function renderDesigns() {

        const designs = getSavedDesigns();

        designGrid.innerHTML = "";


        if (designs.length === 0) {

            designGrid.innerHTML = `
                <div class="empty-designs">

                    <div class="empty-icon">
                        🎨
                    </div>

                    <h2>No Saved Designs</h2>

                    <p>
                        Create and save your own design
                        to see it here.
                    </p>

                    <a href="./customize.html">
                        Create Design
                    </a>

                </div>
            `;

            return;
        }


        designs.forEach(function (design) {

            const card = document.createElement("article");

            card.className = "design-card";


            card.innerHTML = `

                <div class="design-image">

                    <img
                        src="${
                            design.image ||
                            "../assets/images/custom-tshirt.png"
                        }"
                        alt="Saved Design"
                    >

                </div>


                <div class="design-info">

                    <h3>
                        ${
                            design.name ||
                            "My Custom Design"
                        }
                    </h3>


                    <p>
                        Last edited:
                        ${
                            design.createdAt ||
                            "Recently"
                        }
                    </p>


                    <div class="design-actions">

                        <a
                            href="./customize.html"
                            class="edit"
                            data-id="${design.id}"
                        >
                            Edit Design
                        </a>


                        <button
                            class="delete"
                            data-id="${design.id}"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `;


            designGrid.appendChild(card);

        });


        attachDeleteEvents();

    }


    function attachDeleteEvents() {

        document
            .querySelectorAll(".design-card .delete")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                this.dataset.id
                            );


                        const confirmDelete =
                            confirm(
                                "Delete this saved design?"
                            );


                        if (!confirmDelete) {
                            return;
                        }


                        let designs =
                            getSavedDesigns();


                        designs =
                            designs.filter(
                                function (design) {

                                    return Number(
                                        design.id
                                    ) !== id;

                                }
                            );


                        saveDesigns(designs);


                        renderDesigns();

                    }
                );

            });

    }


    renderDesigns();

});