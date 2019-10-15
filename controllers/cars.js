let mongoose = require("mongoose");
let Cars = require("../models/cars");
let Bookings = require("../models/booking");
// create new car
function createCar(req, res) {
  const car = new Cars({
    vehicleNumber: req.body.vehicleNumber,
    model: req.body.model,
    vehicleType: req.body.vehicleType,
    capacity: req.body.capacity,
    rent: req.body.rent,
    status: req.body.status || "available"
  });
  return car
    .save()
    .then(newCause => {
      return res.status(201).json({
        success: true,
        message: "New car created successfully",
        Cars: newCause
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message
      });
    });
}

async function getCars(req, res) {
  let query1 = Cars.find({});
  let query2 = Cars.find({});
  let value = [];
  //add car id query
  if (req.query.carId) {
    query1 = query1.where("_id").equals(req.query.carId);
    query2 = query2.where("_id").equals(req.query.carId);
  }
  //add car capacity query
  if (req.query.capacity) {
    query1 = query1.where("capacity").equals(req.query.capacity);
    query2 = query2.where("capacity").equals(req.query.capacity);
  }

  //check booked car's availability after @datetime
  if (req.query.datetime) {
    values = await Bookings.find({})
      .where("endDate")
      .lt(new Date(req.query.datetime))
      .where("status")
      .ne("Cancelled")
      .exec();
  }
  if (req.query.getallcars == "true") {
    let allcars = await query1.exec();
    res.send(allcars);
  } else {
    let availableCars = await query1
      .where("status")
      .equals("available")
      .exec();
    console.log(availableCars);
    let afterBookingCars = await query2
      .where("_id")
      .in(values.map(value => value.carId))
      .exec();
    console.log(afterBookingCars);
    let finalBookings = [...availableCars, ...afterBookingCars];
    res.send(finalBookings);
  }
}
function removeDuplicates(myArr, prop) {
  return [myArr].filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
async function getCarByModel(req, res, next) {
  let cars = await Cars.find({})
    .where("model")
    .regex(new RegExp(req.query.model, "i"));
  let responseToSend = [];
  for (i = 0; i < cars.length; i++) {
    let booking = await Bookings.findOne({ carId: cars[i]["_id"] });
    responseToSend = [...responseToSend, { ...cars[i]["_doc"], booking }];
    console.log("booking", booking);
    if (i == cars.length - 1) {
      res.send(responseToSend);
    }
  }
}
function updateCar(req, res) {
  const carId = req.query.carId;
  Cars.update({ _id: carId }, req.body, function(err, affected, resp) {
    if (!err) {
      res.send(resp);
    } else {
      res.status(500).send(err);
    }
  });
}

module.exports = { createCar, getCars, updateCar, getCarByModel };
