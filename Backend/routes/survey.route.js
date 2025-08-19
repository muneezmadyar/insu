import express from "express";
import SurveySchedule from "../models/SurveySchedule.js";

const router = express.Router();

// Submit Survey Schedule
router.post("/", async (req, res) => {
  try {
    const { ownerName, phoneNumber, email, preferredTime } = req.body;

    if (!ownerName || !phoneNumber || !email || !preferredTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newSurvey = new SurveySchedule({ ownerName, phoneNumber, email, preferredTime });
    await newSurvey.save();

    res.status(201).json({ message: "Survey scheduled successfully." });
  } catch (error) {
    console.error("Survey submission error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
