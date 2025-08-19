const express = require("express");
const router = express.Router();

// Dummy dropdowns - can be fetched from DB later
router.get("/brands", (req, res) => {
  res.json(["Toyota", "Honda"]);
});

router.get("/models", (req, res) => {
  res.json(["Civic", "Corolla"]);
});

router.get("/years", (req, res) => {
  res.json(["2022", "2023"]);
});

router.get("/values", (req, res) => {
  res.json(["1000000", "2000000"]);
});

module.exports = router;