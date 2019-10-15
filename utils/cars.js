let mongoose = require("mongoose");
let Cars = require("../models/cars");
let Bookings = require("../models/booking");

//this function returns boolean, tells if input car id is available or not
async function isCarAvailable(req, res, next) {
  let carId = req.body.carId;
  if (!carId) {
    let booking = await Bookings.findOne({ _id: req.query.bookingId }).exec();
    console.log(booking);

    carId = booking.carId;
  }

  Cars.findOne({ _id: carId }, async (err, resp) => {
    console.log(resp);
    if (!err) {
      //check status of car
      if (resp) {
        if (resp.status === "available") {
          next();
        } else {
          if (req.body.status == "Cancelled") {
            await Cars.update({ _id: carId }, { status: "available" });
            next();
          } else
            res
              .status(500)
              .send(
                "car with number plate" +
                  resp.vehicleNumber +
                  " already booked booking"
              );
        }
      } else {
        res.status(500).send("car not found");
      }
    } else res.status(500).send("Not available for booking");
  });
}

module.exports = { isCarAvailable };
