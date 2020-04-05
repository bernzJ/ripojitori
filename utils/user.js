const bcrypt = require("bcrypt");

const getHash = async function (seed) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(seed, salt);
  return hash;
}

const hashPassword = async function (password) {
  const hash = await getHash(password);
  return hash;
};

const registerUser = async function (password) {
  const hash = await getHash(password);
  password = hash;
  await this.save();
};

const comparePassword = async function (candidatePassword, password) {
  return await bcrypt.compare(candidatePassword, password);
};

module.exports = {
  hashPassword,
  registerUser,
  comparePassword
};