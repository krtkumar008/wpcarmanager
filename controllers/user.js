let mongoose = require("mongoose");
let User = require("../models/user");
// create new user
function createUser(req, res) {
  const user = new User({
    name: req.body.name,
    gender: req.body.gender,
    address: req.body.address,
    age: req.body.age
  });
  return user
    .save()
    .then(newUser => {
      return res.status(201).json({
        success: true,
        message: "New user created successfully",
        User: newUser
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

function getUsers(req, res) {
  let query = User.find({});
  if (req.query.userId) {
    query.where("_id").equals(req.query.userId);
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

function updateUser(req, res) {
  const userId = req.query.userId;
  User.update({ _id: userId }, req.body, function(err, affected, resp) {
    if (!err) {
      res.send(resp);
    } else {
      res.status(500).send(err);
    }
  });
}

module.exports = { createUser, getUsers, updateUser };
