const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentInfo,
  getNotifications,
} = require("../controllers/studentController");

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/notification", getNotifications);
router.get("/studentInfo", getStudentInfo);

module.exports = router;
