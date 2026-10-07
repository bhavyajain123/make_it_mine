document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) {
        return;
    }


    const emailInput =
        form.querySelector("#email");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        if (!email) {

            alert(
                "Please enter your email."
            );

            emailInput.focus();

            return;
        }


        alert(
            "Password reset link sent to " +
            email
        );

    });

});