var express = require("express");
var router = express.Router();
var BookingController = require("../controllers/booking");
var carUtils = require("../utils/cars");
/* Create Booking in db . */
router.post("/", carUtils.isCarAvailable, function(req, res, next) {
  BookingController.createBooking(req, res);
});
/* get Booking in db . */
router.get("/", function(req, res, next) {
  BookingController.getBookings(req, res);
});
// Update Booking in DB
router.put("/", carUtils.isCarAvailable, function(req, res, next) {
  BookingController.updateBooking(req, res, next);
});
module.exports = router;
