"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server listening on port, ${PORT}.`));
