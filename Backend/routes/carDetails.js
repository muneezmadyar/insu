const express = require("express");
const router = express.Router();
const CarDetail = require("../models/CarDetail");

// Temporary CC Mapping
const ccMapping = {
  Suzuki: {
    Alto: "660",
    Cultus: "1000",
    Swift: "1200",
  },
  Honda: {
    Civic: "1500",
    City: "1300",
  },
  Toyota: {
    Corolla: "1300",
    Yaris: "1000",
  },
};

const getCCFromBrandModel = (brand, model) => {
  return ccMapping?.[brand]?.[model] || "Unknown";
};

// POST /api/car-details
router.post("/", async (req, res) => {
  const { brand, model, year, currentValue } = req.body;

  if (!brand || !model || !year || !currentValue) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const cc = getCCFromBrandModel(brand, model);

  try {
    const newCar = new CarDetail({ brand, model, year, currentValue, cc });
    await newCar.save();
    res.status(201).json({ message: "Car detail saved", car: newCar });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
});

module.exports = router;
