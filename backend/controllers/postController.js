const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Successfully getting goals" });
});

//CREATE
const createPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Successfully getting goals" });
});

//EDIT POSTS
const editPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Successfully getting goals" });
});

//DELETE POSTS
const deletePosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Successfully getting goals" });
});

module.exports = {
  getPosts,
  createPosts,
  editPosts,
  deletePosts,
};
