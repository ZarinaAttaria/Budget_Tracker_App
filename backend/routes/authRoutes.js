const express = require("express");
const {
  registerController,
  loginController,
  addBudget,
  getAllBudget,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/add-budget", addBudget);
router.get("/getAllBudget", getAllBudget);

module.exports = router;
