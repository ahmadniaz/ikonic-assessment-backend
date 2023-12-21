const express = require("express");
const router = express.Router();
const {
  getPosts,
  getSinglePost,
  getUserPosts,
  createPosts,
  editPosts,
  deletePosts,
} = require("../controllers/postController");

const {
  protect,
  authorize,
  authDelete,
} = require("../middleware/authMiddleware");

//GET AND CREATE
router.route("/").get(getPosts).post(protect, createPosts);

//DELETE AND EDIT
router
  .route("/:id")
  .delete(protect, authDelete, deletePosts)
  .patch(protect, authorize, editPosts)
  .get(getSinglePost);

router.get("/:id/posts", getUserPosts);

module.exports = router;
