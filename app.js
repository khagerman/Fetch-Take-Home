const express = require("express");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/** routes */
// route is /transactions (one route to simplify things)
const transactionsRoutes = require("./routes/transaction");

app.use("/transactions", transactionsRoutes);
module.exports = app;
