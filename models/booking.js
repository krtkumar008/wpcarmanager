var mongoose = require("../mongo");

var bookingSchema = new mongoose.Schema({
  carId: { type: String, require: true },
  userId: { type: String, require: true },
  status: { type: String, require: true },
  startDate: { type: Date, require: true },
  endDate: { type: Date, require: true }
});

module.exports = mongoose.model("booking", bookingSchema);
