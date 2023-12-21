const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
  singleUser,
  deleteUser,
} = require("../controllers/userController");

const {
  protect,
  authorize,
  authGetSingle,
  authDelete,
} = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", protect, authorize("admin"), allUsers);
router.get("/:id", protect, authGetSingle("admin"), singleUser);
router.delete("/:id", protect, authDelete("admin"), deleteUser);

module.exports = router;
