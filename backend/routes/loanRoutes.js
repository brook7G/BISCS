const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
const {
  createLoan,
  getAllLoans,
  getStudentLoans,
  getStudentBelongings,
  deleteStudentLoans,
  approveStudentLoan,
  getStudentFileCase,
} = require("../controllers/loanController");

router.post("/", upload.single("image"), createLoan);
router.get("/", getStudentLoans);
router.get("/belongings", getStudentBelongings);
router.get("/Case", getStudentFileCase);
router.get("/all", getAllLoans);
router.delete("/", deleteStudentLoans);
router.put("/", approveStudentLoan);

module.exports = router;
