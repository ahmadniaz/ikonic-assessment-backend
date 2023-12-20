const asyncHandler = require("express-async-handler");
const Posts = require("../models/postsModel");

//GET POSTS

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find();
  res.status(200).json(posts);
});

//CREATE
const createPosts = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400);
    throw new Error("Please enter a title and description for the post");
  }
  const postCreation = await Posts.create({
    title: req.body.title,
    description: req.body.description,
  });
  res.status(200).json(postCreation);
});

//EDIT POSTS
const editPosts = asyncHandler(async (req, res) => {
  const findPost = await Posts.findById(req.params.id);
  if (!findPost) {
    res.status(400);
    throw new Error("Post not found");
  } else {
    const upadtedPost = await Posts.findByIdandUpdate(req.params.id, req.body, {
      new: false,
    });
    res.status(200).json(upadtedPost);
  }
});

//DELETE POSTS
const deletePosts = asyncHandler(async (req, res) => {
  const postDeleted = await Posts.findById(req.params.id);
  if (!postDeleted) {
    res.status(400);
    throw new Error("No such post found");
  } else {
    await Posts.remove();
    res.status(200).json({ id: req.params.id });
  }
});

module.exports = {
  getPosts,
  createPosts,
  editPosts,
  deletePosts,
};
