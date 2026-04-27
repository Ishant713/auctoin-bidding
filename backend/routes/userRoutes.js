const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/userController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 TEMP FIX (to confirm issue)
router.get("/profile", (req, res) => {
  res.json({ message: "Profile working" });
});

router.post("/logout", logoutUser);

module.exports = router;