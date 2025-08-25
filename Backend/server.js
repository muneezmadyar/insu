require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ✅ These should come AFTER all file-upload routes


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});

// ✅ Routes (File upload route first!)
const planRoutes = require("./routes/plans");
app.use("/api/plans", planRoutes); // ⬅️ This uses multer, keep it BEFORE express.json

const clientRoutes = require("./routes/clients");
const adminRoutes = require("./routes/admin");
const carDetailsRoutes = require("./routes/carDetails");
const dropdownRoutes1 = require("./routes/dropdownRoutes");
// const surveyRoutes = require("./routes/survey.route.js")
const bikePlanRoutes = require("./routes/bikeplan");
app.use("/api/bike-plans", bikePlanRoutes);


const bikeDropdownRoutes = require("./routes/bikedropdown");
app.use("/api/bikedropdowns", bikeDropdownRoutes);


const bikeClients = require("./routes/bikeClients");
app.use("/api/bikeclients", bikeClients);
// ✅ These can come after JSON middleware
app.use("/api/car-details", carDetailsRoutes);
app.use("/api", dropdownRoutes1);
app.use("/api", adminRoutes);
app.use("/api/clients", clientRoutes);
// app.use("/api/schedule-survey", surveyRoutes);
console.log("✅ Plan routes loaded");

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





  