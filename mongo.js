var mongoose = require("mongoose");
var url =
  "mongodb+srv://krt:1234@cluster0-hzd20.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, function(err, res) {
  if (err) {
    console.log("ERROR connecting to: " + url + ". " + err);
  } else {
    console.log("Succeeded connected to: " + url);
  }
});

module.exports = mongoose;
