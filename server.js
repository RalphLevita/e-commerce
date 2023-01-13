require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/auth", require("./Routes/auth.routes"));
app.use("/product", require("./Routes/product.routes"));
app.use("/orders", require("./Routes/order.routes"));
// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});