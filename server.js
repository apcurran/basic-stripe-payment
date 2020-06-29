"use strict";

require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.static("public"));

app.post("/api/create-payment-intent", async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1500,
      currency: "usd"
    });

    res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(PORT, () => console.log(`Server listening on port, ${PORT}.`));
