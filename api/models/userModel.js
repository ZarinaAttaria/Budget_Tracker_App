const mongoose = require("mongoose");

const budgetEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  transactionName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  budgetLimit: {
    type: Number,
    required: true,
  },
  budgetEntries: [budgetEntrySchema],
});

module.exports = mongoose.model("User", userSchema);
