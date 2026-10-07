document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".contact-form form");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const nameInput =
            form.querySelector('input[type="text"]');

        const emailInput =
            form.querySelector('input[type="email"]');

        const subjectInput =
            form.querySelectorAll('input[type="text"]')[1];

        const messageInput =
            form.querySelector("textarea");


        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const subject =
            subjectInput.value.trim();

        const message =
            messageInput.value.trim();


        if (!name || !email || !subject || !message) {

            alert(
                "Please fill all fields."
            );

            return;
        }


        alert(
            "Thank you " +
            name +
            "! Your message has been sent."
        );


        form.reset();

    });

});