const express = require("express");
const router = new express.Router();

app.use(express.json());

/** routes */

const transactionsRoutes = require("./routes/transactions");
const userRoutes = require("./routes/users");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
