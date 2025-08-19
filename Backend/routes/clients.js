const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// const calculateCC = (value) => {
//   const val = parseInt(value);
//   if (val <= 1000000) return "1000";
//   if (val <= 1500000) return "1300";
//   if (val <= 2000000) return "1600";
//   return "1800";
// };

router.post("/submit", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).json({ message: "Client submitted successfully" });
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// router.post("/survey", async (req, res) => {
//   try {
//     const { ownerName, mainphone, mainemail, time } = req.body;

//     const surveyData = {
//       ownerName,
//       mainphone,
//       mainemail,
//       time,
//     };

//     const client = new Client(surveyData);
//     await client.save();

//     res.status(200).json({ message: "Survey submitted successfully" });
//   } catch (err) {
//     console.error("Survey Error:", err);
//     res.status(500).json({ error: "Server Error" });
//   }
// });


module.exports = router;