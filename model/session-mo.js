const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaUser = new Schema({
  content: Array,
});

module.exports = mongoose.model("session", SchemaUser);
