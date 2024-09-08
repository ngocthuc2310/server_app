const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaUser = new Schema({
  category: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
  long_desc: String,
  name: String,
  price: Number,
  short_desc: String,
});

module.exports = mongoose.model("product", SchemaUser);
