const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaUser = new Schema({
  date: Schema.Types.Date,
  products: Array,
  total: String,
  user: Object,
  address: String,
});

module.exports = mongoose.model("order", SchemaUser);
