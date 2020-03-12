const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  name: String,
  clientName: String,
  clientType: String,
  hours: String,
  start: Date,
  end: Date,
  scope: Number
});

const company = mongoose.model("companies", companySchema);
module.exports = company;
