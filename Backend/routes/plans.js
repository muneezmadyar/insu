const express = require("express");
const router = express.Router();
const multer = require("multer");
const Plan = require("../models/Plan");

// Setup multer-storage-cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "plans",
//     allowed_formats: ["jpg", "png", "jpeg"]
//   },
// });

// const parser = multer({ storage });


// 🔹 GET: Filter plans by car value
// router.get("/filter", async (req, res) => {
//   const currentValue = parseFloat(req.query.value);

//   if (!currentValue || isNaN(currentValue)) {
//     return res.status(400).json({ message: "Invalid car value" });
//   }

//   try {
//     const allPlans = await Plan.find();
//     console.log(allPlans, "hey")

//     const matchedPlans = allPlans.filter((plan) => {
//       const rate = parseFloat(plan.rate.replace("%", ""));
//       const yearlyPremium = (currentValue / 100) * rate;
//       const monthlyPremium = (yearlyPremium / 12) * 2;

//       return monthlyPremium >= 500 && monthlyPremium <= 10000;
//     });

//     res.json(matchedPlans);
//   } catch (err) {
//     console.error("Filter error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { enabled } = req.body;
    const updated = await Plan.findByIdAndUpdate(id, { enabled }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update plan status" });
  }
});

// 🔹 GET: All plans (no filtering)
router.get("/all", async (req, res) => {
  try {
    const allPlans = await Plan.find();
    res.json(allPlans);
  } catch (err) {
    console.error("Fetch all plans error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔹 PUT: Enable/Disable a plan
router.put("/:id", async (req, res) => {
  try {
    const updated = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("Update plan error:", err);
    res.status(400).json({ error: "Failed to update plan" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
;

// 🛡️ PLAN ROUTE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("File received:", req.file); // 👀 Add this
    console.log("Body received:", req.body);

    const { company, name, rate } = req.body;
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

    if (!company || !name || !rate || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPlan = new Plan({ company, name, rate, imageUrl });
    await newPlan.save();

    res.status(201).json(newPlan);
  } catch (error) {
    console.log("❌ Plan upload failed:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔹 PUT: Update plan by ID with optional image upload
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { company, name, rate } = req.body;
    const updateFields = {
      company,
      name,
      rate,
    };

    // Agar naya image aaya ho to image update karo
    if (req.file) {
      updateFields.imageUrl = `uploads/${req.file.filename}`;
    }

    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, updateFields, {
      new: true, // updated document return kare
    });

    if (!updatedPlan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ error: "Something went wrong while updating the plan" });
  }
});

// ✅ PUT: Toggle enabled/disabled status of a plan
// Toggle enabled status
router.put("/toggle/:id", async (req, res) => {
  try {
    const { enabled } = req.body;
    const updated = await Plan.findByIdAndUpdate(
      req.params.id,
      { isEnabled: enabled },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Plan not found" });
    res.json(updated);
  } catch (err) {
    console.error("Toggle error:", err);
    res.status(500).json({ error: "Failed to toggle plan" });
  }
});



module.exports = router;




