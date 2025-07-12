const mongoose = require("mongoose");

const loanSchema = mongoose.Schema({
  StudentId: {
    type: String,
  },
  ItemName: {
    type: String,
  },
  ItemType: {
    type: String,
  },
  ItemImage: {
    type: String,
  },
  UniqueRef: {
    type: String,
  },
  Quantity: {
    type: String,
  },
  Approved: {
    type: Boolean,
    default: false,
  },
  Returned: {
    type: Boolean,
    default: false,
  },
  ItemCategory: {
    type: String,
    default: false,
  },
  Belonging: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Loan", loanSchema);
