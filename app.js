const express = require("express");

app.use(express.json());

/** routes */

const transactionsRoutes = require("./routes/transactions");

app.use("/transactions", transactionsRoutes);

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
