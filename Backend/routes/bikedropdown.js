// ✅ ROUTE FILE: routes/bikedropdown.js
const express = require("express");
const BikeDropdown = require("../models/BikeDropdown");
const router = express.Router();

// ✅ GET all dropdowns
router.get("/", async (req, res) => {
  try {
    const data = await BikeDropdown.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST new dropdown
router.post("/", async (req, res) => {
  try {
    const newDropdown = new BikeDropdown(req.body);
    await newDropdown.save();
    res.status(201).json(newDropdown);
  } catch (err) {
    res.status(400).json({ error: "Failed to add dropdown" });
  }
});

// ✅ PUT update dropdown
router.put("/:id", async (req, res) => {
  try {
    const updated = await BikeDropdown.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update dropdown" });
  }
});

// ✅ DELETE dropdown
router.delete("/:id", async (req, res) => {
  try {
    await BikeDropdown.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete dropdown" });
  }
});

module.exports = router;
