require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Test Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running on Vercel" });
});

// Routes
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

module.exports = app;
