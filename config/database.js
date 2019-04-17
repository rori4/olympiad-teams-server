const mongoose = require("mongoose");
const User = require("../models/User");
require("../models/Subject");
require("../models/Result");

mongoose.Promise = global.Promise;

module.exports = settings => {
  mongoose.connect(settings.db, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
  let db = mongoose.connection;

  db.once("open", err => {
    if (err) {
      throw err;
    }
    console.log("MongoDB ready!");
    User.seedAdminUser();
  });
  db.on("error", err => console.log(`Database error: ${err}`));
};
