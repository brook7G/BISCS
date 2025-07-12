const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    roles: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    clearanceOffice: {
      type: String,
    },
    password: {
      type: String,
    },
    permissions: {
      type: Array,
    },
    location: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
