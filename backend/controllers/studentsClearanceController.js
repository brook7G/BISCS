const Clearance = require("../models/clearanceModel");
const Students = require("../models/studentModel");
const StudentsClearance = require("../models/studentsClearanceModel");
const asyncHandler = require("express-async-handler");

const createStudentsClearance = asyncHandler(async (req, res) => {
  await StudentsClearance.deleteMany({});
  const clearances = await Clearance.find();
  const students = await Students.find();
  try {
    for (const student of students) {
      for (const clearance of clearances) {
        if (student.EnrolledIn === clearance.AcademicName)
          await StudentsClearance.create({
            AcademicName: clearance.AcademicName,
            StudentId: student.StudentId,
            FullName: student.FirstName + " " + student.LastName,
            AdminId: student.AdminId,
            Deadline: clearance.Deadline,
            ClearanceDetail: clearance.ClearanceDetail,
          });
        continue;
      }
    }
    const allStudentClearances = await StudentsClearance.find();
    res.status(200).json(allStudentClearances);
  } catch (error) {
    res.status(400).json(error);
  }
});

const initiateStudentsClearance = asyncHandler(async (req, res) => {
  const initiateRequest = req.body.Clearance;
  let initiateClearance;
  try {
    if (initiateRequest === "All") {
      initiateClearance = await StudentsClearance.updateMany(
        {},
        {
          Started: true,
          Deadline: req.body.deadline,
        }
      );
    } else {
      initiateClearance = await StudentsClearance.updateMany(
        { AcademicName: initiateRequest },
        {
          Started: true,
          Deadline: req.body.deadline,
        }
      );
    }
    console.log(initiateClearance.modifiedCount);
    res.status(200).json(initiateClearance);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getStudentClearance = asyncHandler(async (req, res) => {
  const studentClearance = await StudentsClearance.findOne({
    StudentId: req.query.studentId,
  });
  if (studentClearance) {
    res.status(200).json(studentClearance);
  } else {
    res.status(404).json({ message: "Clearance not found" });
  }
});

const approveStudentClearance = asyncHandler(async (req, res) => {
  const { clearanceId, ClearanceFieldName, value, updateType } = req.body;
  const studentClearance = await StudentsClearance.findById(clearanceId);
  const clearanceDetail = studentClearance.ClearanceDetail;
  const result = clearanceDetail.find(
    (detail) => detail.ClearanceFieldName === ClearanceFieldName
  );
  if (!result) {
    return res.status(400).json("Cant do that");
  }
  const index = studentClearance.ClearanceDetail.findIndex(
    (detail) => detail.ClearanceFieldName === ClearanceFieldName
  );

  const update = {};
  update[`ClearanceDetail.${index}.Approved`] = value;

  const approveClearance = await StudentsClearance.findOneAndUpdate(
    { _id: clearanceId },
    { $set: update },
    { returnOriginal: false }
  );
  let UpdatedStudentClearance;
  let studentInfo;
  const query = {
    Started: true,
    ClearanceDetail: {
      $elemMatch: { ClearanceFieldName: ClearanceFieldName },
    },
  };
  !updateType
    ? (UpdatedStudentClearance = await StudentsClearance.findById(clearanceId))
    : (UpdatedStudentClearance = await StudentsClearance.find(query));

  !updateType
    ? (studentInfo = {
        clearance: UpdatedStudentClearance,
      })
    : (studentInfo = UpdatedStudentClearance);
  if (approveClearance) {
    !updateType
      ? global.eventEmitter.emit(
          "sendToClients",
          studentInfo.clearance.StudentId,
          "Clearance approved!"
        )
      : global.eventEmitter.emit(
          "sendToClients",
          studentClearance.StudentId,
          "Clearance approved!"
        );
    const ClearanceDetails = approveClearance.ClearanceDetail;
    const allApproved = ClearanceDetails.every(
      (detail) => detail.Approved === true
    );

    if (allApproved) {
      await StudentsClearance.findOneAndUpdate(
        { _id: studentClearance._id },
        { $set: { Completed: true } }
      );
    } else {
      await StudentsClearance.findOneAndUpdate(
        { _id: studentClearance._id },
        { $set: { Completed: false } }
      );
    }

    res.status(200).json(studentInfo);
  } else {
    res.status(400).json("Something went wrong");
  }
});

const getSpecificStudentClearances = asyncHandler(async (req, res) => {
  const query = {
    Started: true,
    ClearanceDetail: {
      $elemMatch: { ClearanceFieldName: req.query.clearanceField },
    },
  };
  const clearances = await StudentsClearance.find(query);
  if (clearances) {
    res.status(200).json(clearances);
  } else {
    res.status(400).json("Sorry nothing found");
  }
});

module.exports = {
  createStudentsClearance,
  initiateStudentsClearance,
  getStudentClearance,
  approveStudentClearance,
  getSpecificStudentClearances,
};
