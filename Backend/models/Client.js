const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: String,
  currentValue: String,

  name: String,
  phone: String,
  email: String,

  ownerName: String,
  mainphone: String,
  mainemail: String,
  time: String,

  plan: {
    company: String,
    name: String,
    rate: String,
    coverage: String,
    features: [String],
    imageUrl: String,
    yearlyPremium: Number
  },
});

module.exports = mongoose.model("Client", clientSchema);
