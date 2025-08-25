require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});

// ✅ Routes
const planRoutes = require("../routes/plans");
app.use("/api/plans", planRoutes);

const clientRoutes = require("../routes/clients");
const adminRoutes = require("../routes/admin");
const carDetailsRoutes = require("../routes/carDetails");
const dropdownRoutes1 = require("../routes/dropdownRoutes");
const bikePlanRoutes = require("../routes/bikeplan");
const bikeDropdownRoutes = require("../routes/bikedropdown");
const bikeClients = require("../routes/bikeClients");

app.use("/api/bike-plans", bikePlanRoutes);
app.use("/api/bikedropdowns", bikeDropdownRoutes);
app.use("/api/bikeclients", bikeClients);
app.use("/api/car-details", carDetailsRoutes);
app.use("/api", dropdownRoutes1);
app.use("/api", adminRoutes);
app.use("/api/clients", clientRoutes);

console.log("✅ Plan routes loaded");

// ❌ Yeh line hatao: app.listen(PORT, () => ...)

// ✅ Export as serverless function
module.exports = app;
