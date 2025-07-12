const mongoose = require("mongoose"); //This is used to define the database schema

const ClearanceDetail = new mongoose.Schema({
  ClearanceFieldName: {
    type: String,
  },
  ClearanceOrder: {
    type: String,
  },
  Approved: {
    type: Boolean,
  },
  PreRequest: {
    type: Boolean,
  },
  PreRequestName: {
    type: String,
  },
  StudentAppeal: {
    type: Boolean,
  },
});

const StudentsClearanceSchema = mongoose.Schema({
  //We are defining a schema for adademic type
  AcademicName: {
    type: String,
  },
  StudentId: {
    type: String,
  },
  FullName: {
    type: String,
  },
  AdminId: {
    type: String,
  },
  Completed: {
    type: Boolean,
    default: false,
  },
  Started: {
    type: Boolean,
    default: false,
  },
  Deadline: {
    type: Date,
  },
  ClearanceDetail: {
    type: [ClearanceDetail],
  },
});

module.exports = mongoose.model("StudentsClearance", StudentsClearanceSchema);
