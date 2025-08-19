const express = require("express");
const router = express.Router();
const BikeClient = require("../models/BikeClient");

router.post("/", async (req, res) => {
  try {
    const client = new BikeClient(req.body);
    await client.save();
    res.json({ message: "Bike client saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const data = await BikeClient.find();
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await BikeClient.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;