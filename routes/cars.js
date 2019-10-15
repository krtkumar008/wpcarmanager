var express = require("express");
var router = express.Router();
var carController = require("../controllers/cars");

/* Create car in db . */
router.post("/", function(req, res, next) {
  carController.createCar(req, res);
});
/* Cet car in db . */
router.get("/", function(req, res, next) {
  console.log("exec");

  carController.getCars(req, res);
});
/* Cet car in db . */
router.get("/bookings", function(req, res, next) {
  carController.getCarByModel(req, res);
});
// Update Car in DB
router.put("/", function(req, res, next) {
  carController.updateCar(req, res);
});

module.exports = router;
