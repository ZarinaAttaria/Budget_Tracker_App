const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/userModel");

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      budgetLimit,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      budgetLimit,
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, secretKey, { expiresIn: "12h" });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Failed to Login", details: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, secretKey, { expiresIn: "12h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Failed to Login", details: error.message });
  }
};

const addBudget = async (req, res) => {
  try {
    const { userId, date, transactionName, amount } = req.body;
    let user = await userModel.findById(userId);

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    const budgetEntry = {
      date,
      transactionName,
      amount,
    };
    user.budgetEntries.push(budgetEntry);

    await user.save();

    res.status(200).json({ budgetEntries: user.budgetEntries });
  } catch (error) {
    console.error("Add Budget Entry Error:", error);
    res
      .status(500)
      .json({ error: "Failed to add budget entry", details: error.message });
  }
};

const getAllBudget = async (req, res) => {
  try {
    let users = await userModel.find();
    const allBudgetEnteries = users.flatMap((user) => user.budgetEntries);
    res.status(200).json({ budgetEntries: allBudgetEnteries });
  } catch (error) {
    console.error("Get Budget Entries Error:", error);
    res.status(500).json({
      error: "Failed to get budget entries",
      details: error.message,
    });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    const { date, transactionName, amount } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    const budgetEntry = await user.budgetEntries.id(entryId);
    if (!budgetEntry) {
      res.status(400).json({ message: "Budget entry not found" });
    }
    if (date) budgetEntry.date = date;
    if (transactionName) budgetEntry.transactionName = transactionName;
    if (amount) budgetEntry.amount = amount;

    await user.save();
    res
      .status(200)
      .json({ message: "Budget updated successfully", budgetEntry });
  } catch (error) {
    console.error("Update Budget Entry Error:", error);
    res.status(500).json({
      error: "Failed to update budget entry",
      details: error.message,
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
      res.json(400).json({ message: "User not found" });
    }

    const budgetEntry = user.budgetEntries.id(entryId);
    if (!budgetEntry) {
      res.json(400).json({ message: "Budget entry not found" });
    }
    user.budgetEntries.pull(entryId);

    await user.save();
    res.status(200).json({ message: "Budget Entry deleted successfully" });
  } catch (error) {
    console.error("Delete Budget Entry Error:", error);
    res.status(500).json({
      error: "Failed to Delete budget entry",
      details: error.message,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  addBudget,
  getAllBudget,
  updateBudget,
  deleteBudget,
};
