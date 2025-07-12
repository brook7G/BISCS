const express = require("express");
const router = express.Router();

const {
  createStudentsClearance,
  initiateStudentsClearance,
  getStudentClearance,
  approveStudentClearance,
  getSpecificStudentClearances,
} = require("../controllers/studentsClearanceController");

router.post("/", createStudentsClearance);
router.get("/", getStudentClearance);
router.get("/specific", getSpecificStudentClearances);
router.put("/initiate", initiateStudentsClearance);
router.put("/approve", approveStudentClearance);

module.exports = router;
