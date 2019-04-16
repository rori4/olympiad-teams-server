const express = require("express");
const authCheck = require("../config/auth-check");
const router = new express.Router();
const User = require("../models/User");

router.get("/list", authCheck, async (req, res, next) => {
  try {
    if (req.user.roles.includes("Admin")) {
      let users = await User.find();
      return res.status(200).json({
        success: true,
        message: "Successfully fetched users",
        users
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

router.post("/change-status", authCheck, async (req, res, next) => {
  try {
    if (req.user.roles.includes("Admin")) {
      let user = req.body;
      const id = user.userId;
      if (id !== req.user.id) {
        await User.findOneAndUpdate({ _id: id }, user);
        return res.status(200).json({
          success: true,
          message: "Successfully updated user status"
        });
      } else {
        return res.status(200).json({
            success: false,
            message: "You can't change your own status"
          });
      }
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
