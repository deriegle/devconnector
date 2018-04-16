const router = require("express").Router();

// @route   GET /api/profile/test
// @desc    Tests Profile Route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Profile Routes working" });
});

module.exports = router;
