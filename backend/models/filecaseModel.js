const mongoose = require("mongoose");

const filecaseSchema = mongoose.Schema({
  StudentId: {
    type: String,
  },
  OfficerId: {
    type: String,
  },
  CaseName: {
    type: String,
  },
  CaseType: {
    type: String,
  },
  CaseDescription: {
    type: String,
  },
  CaseStatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("FileCase", filecaseSchema);
