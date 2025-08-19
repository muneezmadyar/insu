const mongoose = require("mongoose");

const CarDetailSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  // cc: { type: String, required: true }, 
});

module.exports = mongoose.model("CarDetail", CarDetailSchema);
