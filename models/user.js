var mongoose = require("../mongo");

var userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, require: true },
  address: { type: String, require: true },
  age: { type: Number, require: true }
});

module.exports = mongoose.model("user", userSchema);
