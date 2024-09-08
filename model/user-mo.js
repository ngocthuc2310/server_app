const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaUser = new Schema({
  email: String,
  password: String,
  fullname: String,
  phone: String,
  type: String,
});

module.exports = mongoose.model("user", SchemaUser);
