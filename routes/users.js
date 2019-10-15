var express = require("express");
var router = express.Router();
var controller = require("../controllers/user");
/* GET users listing. */
router.get("/", function(req, res, next) {
  controller.getUsers(req, res);
});

// Create a user
router.post("/", function(req, res, next) {
  controller.createUser(req, res);
});
module.exports = router;
