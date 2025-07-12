const express = require("express");
const router = express.Router();

const {
  createClearanceType,
  getClearanceType,
  updateClearance,
  defineClearance,
  getClearanceDetails,
} = require("../controllers/clearanceController");

router.post("/", createClearanceType);
router.get("/", getClearanceType);
router.get("/details", getClearanceDetails);
router.put("/", updateClearance);
router.put("/defineClearance", defineClearance);

module.exports = router;
