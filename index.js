require("dotenv").config({ quiet: true });

const PORT = process.env.PORT || 3000;
const HOST_NAME = process.env.HOST_NAME || "localhost";

const express = require("express");
const router = require("./routes/customer.route");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000", // React Dev
      "http://localhost:5173", // Vite Dev
      "https://iamandroid.in", // Production Frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed methods
    allowedHeaders: [
      "Content-Type",
      "Authorization", // if using JWT or API keys
    ],
    exposedHeaders: ["Authorization"], // expose token if needed
    credentials: true, // allow cookies/auth headers
    optionsSuccessStatus: 200, // for legacy browsers
  })
);
app.use(morgan("dev"));
app.use(express.json()); // application level middleware
app.get("/", (req, res) => {
  res.send("server is up and running!");
});
app.use("/api/v1/customers", router); // http://localhost:5000/api/v1/students
app.listen(PORT, HOST_NAME, () => {
  console.log(`listening on http://${HOST_NAME}:${PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then((e) => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

// npm i express dotenv nodemon
// npm i cors bcryptjs jsonwebtoken
