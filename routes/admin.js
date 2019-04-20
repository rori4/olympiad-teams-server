const express = require("express");
const authCheck = require("../config/auth-check");
const router = new express.Router();
const User = require("../models/User");
const encryption = require("../utilities/encryption");

router.post("/add-user", authCheck, async (req, res, next) => {
  try {
    let user = req.body;
    if (req.user.roles.includes("Admin")) {
      if (user._id) {
        const updateUser = await User.findByIdAndUpdate(user._id, user);
        return res.status(200).json({
          success: true,
          message: "Successfully updated user"
        });
      }
      delete user._id;
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
    } else if (req.user.id === user._id) {
      if (user._id) {
        delete user.roles;
        delete user.subjects;
        const updateUser = await User.findByIdAndUpdate(req.user.id, user);
        return res.status(200).json({
          success: true,
          message: "Successfully updated user"
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

router.get("/user", authCheck, async (req, res, next) => {
  try {
    let userId = req.query.id;
    if (req.user.roles.includes("Admin")) {  
      let user = await User.findOne({ _id: userId })
        .populate("results")
        .populate("subjects")
        .exec();
      return res.status(200).json({
        success: true,
        message: "Successfully fetched user",
        data: user
      });
    } else if (req.user.id === userId) {
      let user = await User.findOne({ _id: req.user.id })
        .populate("results")
        .populate("subjects")
        .exec();
      return res.status(200).json({
        success: true,
        message: "Successfully fetched user",
        data: user
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

module.exports = router;
