"use strict";

const stripe = Stripe("pk_test_51GyOBXEFSgPrRFzWmUBqUfL9lNgsZR7qWlzKEQe7hTRs48845plWirspdaEqDps99uKE3MumJXsyjJPlSXoCGgOR0089tYnp4V");

async function fetchPaymentIntent() {
    const result = await fetch("/api/create-payment-intent", { method: "POST" });
    const data = await result.json();

    // Setup
    const elements = stripe.elements();
    const card = elements.create("card");

    // Stripe injects an iframe into the DOM
    card.mount("#card-element");

    card.on("change", event => {
        const cardErrorPara = document.getElementById("card-errors");

        cardErrorPara.textContent = event.error ? event.error.message : "";
    });

    const form = document.getElementById("payment-form");

    form.addEventListener("submit", event => {
        event.preventDefault();

        payWithCard(stripe, card, data.clientSecret);
    });
}

fetchPaymentIntent();

async function payWithCard(stripe, card, clientSecret) {
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card
        }
    });

    const resultMsgPara = document.querySelector(".result-message");

    if (result.error) {
        resultMsgPara.textContent = result.error.message;
    } else {
        resultMsgPara.textContent = "Payment success!";
    }
}