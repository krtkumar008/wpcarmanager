let mongoose = require("mongoose");
let bookings = require("../models/booking");
let Cars = require("../models/cars");
// create new booking
function createBooking(req, res, next) {
  const booking = new bookings({
    carId: req.body.carId,
    userId: req.body.userId,
    status: req.body.status,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate)
  });
  return booking
    .save()
    .then(newCause => {
      Cars.update(
        { _id: req.body.carId },
        { status: "booked" },
        (err, affected, resp) => {
          console.log(resp);
        }
      );
      res.status(201).json({
        success: true,
        message: "New booking created successfully",
        bookings: newCause
      });
      next();
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message
      });
    });
}

function getBookings(req, res) {
  let query = bookings.find({});
  if (req.query.bookingId) {
    query.where("_id").equals(req.query.bookingId);
  }
  if (req.query.carId) {
    query.where("carId").equals(req.query.carId);
  }
  if (req.query.userId) {
    query.where("userId").equals(req.query.userId);
  }
  query.exec(function(err, result) {
    if (!err) {
      // handle result
      res.send(result);
    } else {
      res.status(500).send(err);
      // error handling
    }
  });
}

async function updateBooking(req, res) {
  const bookingId = req.query.bookingId;
  let bookingg = await bookings.findOne({ _id: req.query.bookingId }).exec();
  bookings.update({ _id: bookingId }, req.body, function(err, affected, resp) {
    if (!err) {
      if (req.body.status == "cancelled") {
        Cars.update(
          { _id: bookingg.carId },
          { status: "available" },
          (err, affected, resp) => {
            console.log(resp);
          }
        );
      }
      res.send(resp);
    } else {
      res.status(500).send(err);
    }
  });
}

module.exports = { createBooking, getBookings, updateBooking };
