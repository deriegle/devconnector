const router = require("express").Router();

// @route   GET /api/users/test
// @desc    Tests Users Route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Users Routes working" });
});

module.exports = router;
