const express = require("express");
const router = new express.Router();
const Subject = require("../models/Subject");

//TODO: Add admin auth
router.get("/list", async (req, res, next) => {
  try {
    let subjects = await Subject.find();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched subjects",
      data: subjects
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

router.post("/add", async (req, res, next) => {
  try {
    let exists = Subject.find({ name: req.body.name });
    if (exists.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Subject already exists",
        data: subject
      });
    }
    let subject = await Subject.create({ name: req.body.name });
    return res.status(200).json({
      success: true,
      message: "Successfully created a subject",
      data: subject
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

router.post("/edit", async (req, res, next) => {
  try {
    let oldSubject = req.body.old;
    let newSubject = req.body.new;
    delete newSubject._id;
    newSubject.currentInstructor === ""
      ? delete newSubject.currentInstructor
      : null;
    let updated = await Subject.findByIdAndUpdate(oldSubject._id, newSubject);
    return res.status(200).json({
      success: true,
      message: "Successfully edited subject",
      data: updated
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    let deleted = await Subject.findByIdAndDelete(req.body._id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted subject",
      data: deleted
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
