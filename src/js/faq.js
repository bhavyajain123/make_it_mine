document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector("h3");
        const answer = item.querySelector("p");

        if (!question || !answer) {
            return;
        }

        question.style.cursor = "pointer";

        question.addEventListener("click", function () {

            if (answer.style.display === "none") {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }

        });

    });

});