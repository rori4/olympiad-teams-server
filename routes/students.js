const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Subject = require("../models/Subject");
const Result = require("../models/Result");

router.get("/list", async (req, res, next) => {
  try {
    const subjectName = req.query.subject;
    let query = {roles: "Student"};
    if (subjectName !== "all") {
      let subject = await Subject.findOne({
        name: { $regex: new RegExp(subjectName, "i") }
      });
      if (subject) {
        query = {
          roles: "Student",
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

router.get("/search", async (req, res, next) => {
  try {
      const search = req.query.search;
      let users = await User.find({roles: "Student", $text : { $search: search } }).populate("subjects");;
      return res.status(200).json({
        success: true,
        message: "Successfully fetched searched users",
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

router.get("/results", async (req, res, next) => {
  try {
      let results = await Result.find().populate('user', 'fullName');
      return res.status(200).json({
        success: true,
        message: "Successfully fetched searched users",
        data: results
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
