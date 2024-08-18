const express = require("express");
const {
  registerController,
  loginController,
  addBudget,
  getAllBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/add-budget", addBudget);
router.get("/getAllBudget", getAllBudget);
router.put("/budget/:userId/:entryId", updateBudget);
router.delete("/budget/:userId/:entryId", deleteBudget);

module.exports = router;
