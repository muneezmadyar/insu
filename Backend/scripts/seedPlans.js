// const mongoose = require("mongoose");
// const Plan = require("../models/Plan");
// require("dotenv").config();

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const plans = [
//   { name: "Basic Plan", rate: "25%", total: "125,000", workshops: 50 },
//   { name: "Motor Comprehensive", rate: "1.35%", total: "135,000", workshops: 67 },
//   { name: "Private Vehicle Comprehensive", rate: "1.65%", total: "165,000", workshops: 154 },
//   { name: "Motor Takaful", rate: "1.4%", total: "140,000", workshops: 300 },
//   { name: "Comprehensive Insurance", rate: "1.75%", total: "175,000", workshops: 67 },
//   { name: "Private Vehicle", rate: "1.75%", total: "175,000", workshops: 67 },
//   { name: "Takaful Half Dep", rate: "2%", total: "200,000", workshops: 300 },
//   { name: "Motor Comprehensive Plus", rate: "1.95%", total: "195,000", workshops: 90 },
//   { name: "Executive Car Plan", rate: "2.2%", total: "220,000", workshops: 110 },
//   { name: "Luxury Plan", rate: "2.5%", total: "250,000", workshops: 150 }
// ];


// const seed = async () => {
//   await Plan.deleteMany({});
//   await Plan.insertMany(plans);
//   console.log("✅ Plans seeded");
//   mongoose.disconnect();
// };

// seed();
