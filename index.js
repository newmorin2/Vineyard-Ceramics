document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    })

    // form field clearing
    window.onbeforeunload = () => {
        for(const form of document.getElementsByTagName('form')) {
            form.reset();
        }
    }

    // Form redirect
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {

        const response = await fetch(
            "https://formspree.io/f/xppapglg",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {

            formStatus.textContent =
                "Thank you! Your enquiry has been sent successfully.";

            formStatus.style.color = "#fff";

            form.reset();

            submitBtn.textContent = "Sent!";

        } else {

            formStatus.textContent =
                "Something went wrong. Please try again.";

            formStatus.style.color = "#ff4d4d";

            submitBtn.disabled = false;
            submitBtn.textContent = "Send";
        }

    } catch (error) {

        formStatus.textContent =
            "Unable to send your enquiry. Please try again.";

        formStatus.style.color = "#ff4d4d";

        submitBtn.disabled = false;
        submitBtn.textContent = "Send";
    }
    });
});