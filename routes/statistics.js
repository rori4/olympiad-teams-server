const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.get("/studentsByTown", async (req, res, next) => {
  try {
    let studentsByTown = await User.aggregate([
      { $group: { _id: "$town", count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
      { $limit: 10 }
    ]);
    studentsByTown.reverse();
    const stats = studentsByTown.map(el => {
      return el.count;
    });
    const towns = studentsByTown.map(el => {
      if (el._id === "") {
        return "Other";
      } else {
        return el._id;
      }
    });
    return res.status(200).json({
      success: true,
      message: "Successfully retreived students by town",
      data: { towns, stats }
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

router.get("/studentsProgress", async (req, res, next) => {
  try {
    let allStudents = await User.count({ roles: "Student" });
    let studentsWithUniversity = await User.count({
      roles: "Student",
      university: { $ne: "", $ne: null }
    });
    let studentsWithWork = await User.count({
      roles: "Student",
      work: { $ne: "", $ne: null }
    });
    let studentsWithResults = await User.count({
      roles: "Student",
      results: { $ne: [], $ne: null }
    });
    let percentageWithUni = percentage(studentsWithUniversity, allStudents);
    let percentageWithWork = percentage(studentsWithWork, allStudents);
    let percentageWithResutls = percentage(studentsWithResults, allStudents);
    return res.status(200).json({
      success: true,
      message: "Successfully retreived students by town",
      data: [
        {
          activeProgress: percentageWithUni,
          description: `This represents ${percentageWithUni}% of all students`,
          title: "Students With University",
          value: studentsWithUniversity
        },
        {
          activeProgress: percentageWithWork,
          description: `This represents ${percentageWithWork}% of all students`,
          title: "Students That Have Work",
          value: studentsWithWork
        },
        {
          activeProgress: percentageWithResutls,
          description: `This represents ${percentageWithResutls}% of all students`,
          title: "Students With Competition Results",
          value: studentsWithResults
        }
      ]
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Something went wrong :("
    });
  }
});

function percentage(partialValue, totalValue) {
  return Math.round((100 * partialValue) / totalValue);
} 

module.exports = router;
