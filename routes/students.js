const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Subject = require("../models/Subject");

router.get("/list", async (req, res, next) => {
  try {
    const subjectName = req.query.subject;
    let query = {roles: "Student"};
    if (subjectName !== "all") {
      let subject = await Subject.findOne({
        roles: "Student",
        name: { $regex: new RegExp(subjectName, "i") }
      });
      if (subject) {
        query = {
          subjects: mongoose.Types.ObjectId(subject._id)
        };
      } else {
        return res.status(200).json({
          success: true,
          message: "Nothing matches your query",
          users: [],
        });
      }
    }
    let users = await User.find(query).populate("subjects");
    return res.status(200).json({
      success: true,
      message: "Successfully fetched users",
      users
    });
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

module.exports = router;
