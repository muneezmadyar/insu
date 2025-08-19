const express = require("express");
const router = express.Router();
const BikePlan = require("../models/BikePlan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // If you use Cloudinary, use your parser instead

// ✅ Get all bike plans
router.get("/all", async (req, res) => {
  try {
    const plans = await BikePlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bike plans" });
  }
});

// ✅ Add bike plan
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { company, name, rate } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    if (!company || !name || !rate || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const plan = new BikePlan({ company, name, rate, imageUrl });
    await plan.save();

    res.status(201).json({ message: "Bike plan added", plan });
  } catch (error) {
    console.error("Error adding plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update bike plan
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { company, name, rate } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updatedFields = {};
    if (company) updatedFields.company = company;
    if (name) updatedFields.name = name;
    if (rate) updatedFields.rate = rate;
    if (imageUrl) updatedFields.imageUrl = imageUrl;

    const updatedPlan = await BikePlan.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    res.json({ message: "Plan updated", plan: updatedPlan });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Failed to update plan" });
  }
});

// ✅ Toggle plan enable/disable
router.put("/toggle/:id", async (req, res) => {
  try {
    const { enabled } = req.body;
    const updated = await BikePlan.findByIdAndUpdate(
      req.params.id,
      { isEnabled: enabled },
      { new: true }
    );
    res.json({ message: "Plan status updated", plan: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update plan status" });
  }
});

// PUT request to update bike plan
router.put("/:id", async (req, res) => {
  try {
    const updated = await BikePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update" });
  }
});

// PATCH request to toggle disable status
// Express example
// backend/routes/bikeplan.js
router.patch("/:id/toggle", async (req, res) => {
  try {
    const plan = await BikePlan.findById(req.params.id);
    plan.isDisabled = !plan.isDisabled; // ✅ correct field name
    await plan.save();

    res.status(200).json({
      message: "Plan status toggled",
      isDisabled: plan.isDisabled,
    });
  } catch (err) {
    res.status(500).json({
      message: "Toggle failed",
      error: err.message,
    });
  }
});




module.exports = router;