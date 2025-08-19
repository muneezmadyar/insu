const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  company: { type: String, required: true },
  name: { type: String, required: true },
  rate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  // status: { type: String, default: "enabled" },
isEnabled: {
  type: Boolean,
  default: true,
}


});

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
module.exports = Plan;
