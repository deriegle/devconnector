const router = require("express").Router();
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrKey;
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route   GET /api/users/test
// @desc    Tests Users Route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Users Routes working" });
});

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", (req, res) => {
  // Validate new User
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      // User is already registered in DB
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size of Image
        rating: "pg", // Rating of Image
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST /api/users/login
// @desc    Login User / Return JWT
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: req.body.email }).then(user => {
    // User isn't found in DB
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = "Password incorrect";
        // Password doesn't match
        return res.status(400).json(errors);
      } else {
        // Create paylod for JWT & sign token
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        };

        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          return res.json({ token: "Bearer " + token, success: true });
        });
      }
    });
  });
});

// @route   GET /api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
