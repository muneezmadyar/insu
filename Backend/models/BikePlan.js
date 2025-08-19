// models/BikePlan.js
const mongoose = require("mongoose");

const bikePlanSchema = new mongoose.Schema({
  company: { type: String, required: true },
  name: { type: String, required: true },
  rate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isDisabled: { type: Boolean, default: true },
});

module.exports = mongoose.model("BikePlan", bikePlanSchema);
