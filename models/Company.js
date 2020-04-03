const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  projectResource: String,
  clientName: String,
  segment: String,
  category: String,
  status: String,
  hours: String,
  start: Date,
  end: Date,
  scope: Number
});

const company = mongoose.model("companies", companySchema);
module.exports = company;
