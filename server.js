const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = require("express")();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// Middleware
//    BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//     Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Mongo config & connect
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.info("MongoDB Connected"))
  .catch(err => console.error(err));

// Passport middleware

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(PORT, () => console.info(`Server started on ${PORT}`));
