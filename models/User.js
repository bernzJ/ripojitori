const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  scope: {
    type: Number,
  }
});
const getHash = async function (seed) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(seed, salt);
  return hash;
}
userSchema.statics.hashPassword = async function (password) {
  const hash = await getHash(password);
  return hash;
};
userSchema.methods.registerUser = async function () {
  const hash = await getHash(this.password);
  this.password = hash;
  await this.save();
};
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("users", userSchema);
module.exports = User;
