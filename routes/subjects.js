const express = require("express");
const router = new express.Router();
const Subject = require("../models/Subject");

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
      let exists = Subject.find({name: req.body.name})
      if(exists.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Subject already exists",
          data: subject
        });
      };
      let subject = await Subject.create({name: req.body.name});
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
  // try {
  //     let subjects = await Subject.find();
  //     return res.status(200).json({
  //       success: true,
  //       message: "Successfully fetched subjects",
  //       subjects
  //     });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(200).json({
  //     success: false,
  //     message: "Something went wrong :("
  //   });
  // }
});

router.post("/delete", async (req, res, next) => {
  // try {
  //     let subjects = await Subject.find();
  //     return res.status(200).json({
  //       success: true,
  //       message: "Successfully fetched subjects",
  //       data: subjects
  //     });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(200).json({
  //     success: false,
  //     message: "Something went wrong :("
  //   });
  // }
});

module.exports = router;