const Students = require("../models/studentModel");
const StudentsClearance = require("../models/studentsClearanceModel");
const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");

const createStudent = asyncHandler(async (req, res) => {
  const students = await Students.create(req.body);
  if (students) {
    res.status(200).json(students);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getStudents = asyncHandler(async (req, res) => {
  const students = await Students.find();
  if (students) {
    res.status(200).json(students);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getStudentInfo = asyncHandler(async (req, res) => {
  const student = await Students.findOne({ StudentId: req.query.studentId });
  const studentClearance = await StudentsClearance.findOne({
    StudentId: req.query.studentId,
  });
  if (student) {
    const studentInfo = {
      student: student,
      clearance: studentClearance,
    };
    res.status(200).json(studentInfo);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    StudentId: req.query.studentId,
  });

  if (notifications) {
    res.status(200).json(notifications);
  } else {
    res.status(400).json("Something went wrong");
  }
});

module.exports = {
  createStudent,
  getStudents,
  getStudentInfo,
  getNotifications,
};
