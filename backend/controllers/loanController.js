const asyncHandler = require("express-async-handler");
const Loan = require("../models/loanModel");
const Notification = require("../models/notificationModel");
const fs = require("fs");
const util = require("util");
const path = require("path");
const unlinkAsync = util.promisify(fs.unlink);
const uploadDirectory = path.join(__dirname, "../uploads/");

const createLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.create({
    StudentId: req.body.StudentId,
    ItemName: req.body.ItemName,
    ItemType: req.body.ItemType,
    ItemImage: req.file?.filename,
    UniqueRef: req.body.UniqueRef,
    Quantity: req.body.Quantity,
    ItemCategory: req.body.ItemCategory,
    Belonging: req.body.Belonging,
  });
  if (loan) {
    loan.ItemCategory === "Loan"
      ? await Notification.create({
          StudentId: req.body.StudentId,
          NotificationType: "Loan",
          NotificationName: "Approve Loan",
          NotificationText: `Borrow ${req.body.ItemName}?`,
          NotificationAction: loan._id,
        })
      : loan.ItemCategory === "Belonging"
      ? await Notification.create({
          StudentId: req.body.StudentId,
          NotificationType: "Belonging",
          NotificationName: "Approve Belonging",
          NotificationText: `Is the ${req.body.ItemName} yours?`,
          NotificationAction: loan._id,
        })
      : await Notification.create({
          StudentId: req.body.StudentId,
          NotificationType: "FileCase",
          NotificationName: "Student File Case",
          NotificationText: ` ${req.body.ItemName} Filed on you.`,
          NotificationAction: loan._id,
        });
    res.status(200).json(loan);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find();
  if (loans) {
    res.status(200).json(loans);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getStudentLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({
    StudentId: req.query.studentId,
    ItemCategory: "Loan",
  });
  if (loans) {
    res.status(200).json(loans);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getStudentBelongings = asyncHandler(async (req, res) => {
  const belongings = await Loan.find({
    StudentId: req.query.studentId,
    ItemCategory: "Belonging",
  });
  if (belongings) {
    res.status(200).json(belongings);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getStudentFileCase = asyncHandler(async (req, res) => {
  const belongings = await Loan.find({
    StudentId: req.query.studentId,
    ItemCategory: "FileCase",
  });
  if (belongings) {
    res.status(200).json(belongings);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const approveStudentLoan = asyncHandler(async (req, res) => {
  const result = await Loan.updateOne(
    { _id: req.body.loanId },
    { Approved: req.body.value }
  );
  if (result.modifiedCount === 1) {
    await Notification.deleteOne({ _id: req.body.notificatonId });

    res.status(200).json({ message: "Loan status updated successfully." });
  } else if (result.n === 0) {
    res.status(404).json({ message: "Loan not found." });
  } else {
    res.status(400).json({ message: "Something went wrong." });
  }
});
const deleteStudentLoans = asyncHandler(async (req, res) => {
  const loan = await Loan.findOne({ _id: req.query.loanId });
  if (loan) {
    try {
      if (loan.ItemImage) {
        const imagePath = path.join(uploadDirectory, loan.ItemImage);
        await unlinkAsync(imagePath);
      }

      await Loan.deleteOne({ _id: req.query.loanId });
      req.query.notificatonId &&
        (await Notification.deleteOne({ _id: req.query.notificatonId }));

      res.status(200).json({ message: "Loan deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete loan" });
    }
  } else {
    res.status(404).json({ message: "Loan not found" });
  }
});

module.exports = {
  createLoan,
  getAllLoans,
  getStudentLoans,
  approveStudentLoan,
  deleteStudentLoans,
  getStudentBelongings,
  getStudentFileCase,
};
