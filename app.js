const express = require("express");
const app = express();
app.use(express.json());

/** routes */

const transactionsRoutes = require("./routes/transaction");

app.use("/transactions", transactionsRoutes);
module.exports = app;
