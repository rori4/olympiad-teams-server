const express = require("express");
const authCheck = require("../config/auth-check");
const router = new express.Router();
const User = require("../models/User");
const Result = require("../models/Result");

router.post("/add", authCheck, async (req, res, next) => {
  try {
    if (req.user.roles.includes("Admin")) {
      let userId = req.body.userId;
      let result = await Result.create({ user: userId, ...req.body.result });
      let user = await User.findById(userId);
      user.results.push(result);
      user.save();
      return res.status(200).json({
        success: true,
        message: "Successfully added medal",
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

router.post("/edit", authCheck, async (req, res, next) => {
  try {
    if (req.user.roles.includes("Admin")) {
        let oldResult = req.body.old;
        let newResult = req.body.new;
        delete newResult._id;
        newResult.currentInstructor === ""
          ? delete newResult.currentInstructor
          : null;
        let updated = await Result.findByIdAndUpdate(oldResult._id, newResult);
      return res.status(200).json({
        success: true,
        message: "Successfully edited medal",
        data: updated
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

router.post("/delete", authCheck, async (req, res, next) => {
  try {
    if (req.user.roles.includes("Admin")) {
      let deleted = await Result.findByIdAndDelete(req.body._id);
      return res.status(200).json({
        success: true,
        message: "Successfully added medal",
        data: deleted
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
