const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");

// @route   GET /api/posts/test
// @desc    Tests Post Route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Posts Routes working" });
});

// @route   GET /api/posts
// @desc    Get ALL posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "No posts found" }));
});

// @route   GET /api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopost: "No post found for that ID" })
    );
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate new Post
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // Create new Post & save to DB
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE /api/posts/:id
// @desc    Delete post by ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post ownership
          if (post.user.toString() !== req.user.id)
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });

          // User owns this post, delete post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ nopost: "No post found" }));
    });
  }
);
module.exports = router;
