// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));

// // ✅ These should come AFTER all file-upload routes


// // ✅ MongoDB connection
// mongoose.connect(process.env.MONGO_URI);
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connected successfully");
// });

// // ✅ Routes (File upload route first!)
// const planRoutes = require("./routes/plans");
// app.use("/api/plans", planRoutes); // ⬅️ This uses multer, keep it BEFORE express.json

// const clientRoutes = require("./routes/clients");
// const adminRoutes = require("./routes/admin");
// const carDetailsRoutes = require("./routes/carDetails");
// const dropdownRoutes1 = require("./routes/dropdownRoutes");
// // const surveyRoutes = require("./routes/survey.route.js")
// const bikePlanRoutes = require("./routes/bikeplan");
// app.use("/api/bike-plans", bikePlanRoutes);


// const bikeDropdownRoutes = require("./routes/bikedropdown");
// app.use("/api/bikedropdowns", bikeDropdownRoutes);


// const bikeClients = require("./routes/bikeClients");
// app.use("/api/bikeclients", bikeClients);
// // ✅ These can come after JSON middleware
// app.use("/api/car-details", carDetailsRoutes);
// app.use("/api", dropdownRoutes1);
// app.use("/api", adminRoutes);
// app.use("/api/clients", clientRoutes);
// // app.use("/api/schedule-survey", surveyRoutes);
// console.log("✅ Plan routes loaded");

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});

// ✅ Routes
const planRoutes = require("../routes/plans");
const clientRoutes = require("../routes/clients");
const adminRoutes = require("../routes/admin");
const carDetailsRoutes = require("../routes/carDetails");
const dropdownRoutes1 = require("../routes/dropdownRoutes");
const bikePlanRoutes = require("../routes/bikeplan");
const bikeDropdownRoutes = require("../routes/bikedropdown");
const bikeClients = require("../routes/bikeClients");

app.use("/api/plans", planRoutes);
app.use("/api/bike-plans", bikePlanRoutes);
app.use("/api/bikedropdowns", bikeDropdownRoutes);
app.use("/api/bikeclients", bikeClients);
app.use("/api/car-details", carDetailsRoutes);
app.use("/api", dropdownRoutes1);
app.use("/api", adminRoutes);
app.use("/api/clients", clientRoutes);

console.log("✅ Routes loaded");

// ❌ Ye hata dein: app.listen(PORT, ...)
// ✅ Vercel ko sirf app export karna hai
module.exports = app;
