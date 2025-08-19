const mongoose = require("mongoose");

const BikeDropdownSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  models: [
    {
      name: { type: String, required: true },
      years: [{ type: Number, required: true }],
    },
  ],
});

module.exports = mongoose.model("BikeDropdown", BikeDropdownSchema);
