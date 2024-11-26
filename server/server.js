require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const cardRoute = require("./router/card-router");
const adminRoute = require("./router/admin-router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const analyticsRoute = require("./router/analytics-router");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Update this to match your frontend's URL
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};




app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON data

// Mount Routers
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/cd", cardRoute);

// Admin Routes (Includes Analytics)
app.use("/api/admin", adminRoute);
app.use("/api/analytics", analyticsRoute); // New Analytics route

// Error Handling Middleware
app.use(errorMiddleware);

// Database Connection and Server Initialization
const PORT = process.env.PORT || 5000; // Uses PORT from environment variables or defaults to 5000
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });