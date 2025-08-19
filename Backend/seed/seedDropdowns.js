// // seed/seedDropdowns.js
// const mongoose = require("mongoose");
// const Dropdown = require("../models/Dropdown");
// require("dotenv").config();


// const dropdownData = [
//   {
//     brand: "Suzuki",
//     models: [
//       { name: "Alto", years: [2000, 2005, 2010, 2015, 2020] },
//       { name: "Cultus", years: [2000, 2005, 2010, 2015, 2020] },
//       { name: "Swift", years: [2005, 2010, 2015, 2020] },
//       { name: "Wagon R", years: [2005, 2010, 2015, 2020] },
//       { name: "Bolan", years: [1990, 2000, 2010, 2020] }
//     ]
//   },
//   {
//     brand: "Toyota",
//     models: [
//       { name: "Corolla", years: [2000, 2005, 2010, 2015, 2020] },
//       { name: "Yaris", years: [2015, 2020] },
//       { name: "Hilux", years: [2015, 2018, 2021, 2023] }
//     ]
//   },
//   {
//     brand: "Honda",
//     models: [
//       { name: "City", years: [2000, 2005, 2010, 2015, 2020] },
//       { name: "Civic", years: [2000, 2005, 2010, 2015, 2020] },
//       { name: "BR-V", years: [2016, 2020] },
//       { name: "HR-V", years: [2015, 2020] }
//     ]
//   },
//   {
//     brand: "Kia",
//     models: [
//       { name: "Sportage", years: [2018, 2020, 2023] },
//       { name: "Carnival", years: [2015, 2020] }
//     ]
//   },
//   {
//     brand: "Hyundai",
//     models: [
//       { name: "Tucson", years: [2015, 2020, 2023] },
//       { name: "Santa Fe", years: [2015, 2020] }
//     ]
//   },
//   {
//     brand: "MG",
//     models: [
//       { name: "HS", years: [2019, 2023] },
//       { name: "ZST", years: [2018, 2020] }
//     ]
//   },
//   {
//     brand: "FAW",
//     models: [
//       { name: "V2", years: [2017, 2020] },
//       { name: "XP-V", years: [2012, 2017] }
//     ]
//   }
// ];


// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     await Dropdown.deleteMany({});
//     await Dropdown.insertMany(dropdownData);
//     console.log("✅ Dropdown seeded");
//     mongoose.disconnect();
//   })
//   .catch(console.error);
