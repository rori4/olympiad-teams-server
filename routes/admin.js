const express = require("express");
const authCheck = require("../config/auth-check");
const router = new express.Router();
const User = require("../models/User");
const encryption = require("../utilities/encryption");

router.post("/add-user", authCheck, async (req, res, next) => {
  try {
    if (req.user.roles.includes("Admin")) {
      let user = req.body;
      const checkUser = await User.find({ email: user.email });
      if (checkUser.length > 0) {
        return done("E-mail already exists!");
      }
      if (user.educationPeriod !== null) {
        user.educationFrom = user.educationPeriod.start;
        user.educationTo = user.educationPeriod.end;
      }
      user.salt = encryption.generateSalt();
      user.password = encryption.generateHashedPassword(
        user.salt,
        user.password !== undefined ? user.password : "12345678"
      );
      const createdUser = await User.create(user);
      if (createdUser !== null) {
        return res.status(200).json({
          success: true,
          message: "Successfully created a student"
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Something went wrong! The student was not created!"
        });
      }
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `Something went wrong :( ${error !== null ? error.message : ""}`
    });
  }
});

module.exports = router;
