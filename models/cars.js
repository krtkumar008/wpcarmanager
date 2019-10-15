var mongoose = require("../mongo");

var carSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  vehicleNumber: { type: String, require: true },
  model: { type: String, require: true },
  vehicleType: { type: String, require: true },
  capacity: { type: String, require: true },
  rent: { type: Number, require: true },
  status: { type: String, require: true }
});

module.exports = mongoose.model("Cars", carSchema);
