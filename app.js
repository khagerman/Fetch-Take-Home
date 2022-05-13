const express = require("express");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
/** routes */

const transactionsRoutes = require("./routes/transaction");

app.use("/transactions", transactionsRoutes);
module.exports = app;
