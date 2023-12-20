const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPosts,
  editPosts,
  deletePosts,
} = require("../controllers/postController");

//GET AND CREATE
router.route("/").get(getPosts).post(createPosts);

//DELETE AND EDIT
router.route("/:id").delete(deletePosts).patch(editPosts);

module.exports = router;
