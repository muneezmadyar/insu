const express = require("express");
const Dropdown = require("../models/Dropdown");
const router = express.Router();

// ✅ GET all dropdowns
router.get("/dropdowns", async (req, res) => {
  try {
    const data = await Dropdown.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST new dropdown
router.post("/dropdowns", async (req, res) => {
  try {
    const newDropdown = new Dropdown(req.body);
    await newDropdown.save();
    res.status(201).json(newDropdown);
  } catch (err) {
    res.status(400).json({ error: "Failed to add dropdown" });
  }
});

// ✅ PUT update dropdown
router.put("/dropdowns/:id", async (req, res) => {
  try {
    const updated = await Dropdown.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update dropdown" });
  }
});

// ✅ DELETE dropdown
router.delete("/dropdowns/:id", async (req, res) => {
  try {
    await Dropdown.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete dropdown" });
  }
});

module.exports = router;
