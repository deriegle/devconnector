const router = require("express").Router();

// @route   GET /api/posts/test
// @desc    Tests Post Route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Posts Routes working" });
});

module.exports = router;
