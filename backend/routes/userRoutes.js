const express = require('express');
const router = express.Router();

const {
  registerUser,
  getUser,
  getUsers,
  login,
  executeCommands,
  saveLocation,
  getLocation,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/command', executeCommands);
router.get('/', getUser);
router.get('/all', getUsers);
router.post('/login', login);
router.post('/location', saveLocation);
router.get('/location', getLocation);

module.exports = router;
