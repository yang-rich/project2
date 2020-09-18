// DEPENDENCIES
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// MIDDLEWARE
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: false,
  })
);

// DATABASE
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("the connection with mongod is established at", MONGODB_URI);
  }
);

// Optional, but likely helpful
// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// Controllers
const moviesController = require("./controllers/movies_controller.js");
app.use("/movies", moviesController);
const userController = require("./controllers/users_controller.js");
app.use("/users", userController);
const sessionsController = require("./controllers/sessions_controller.js");
app.use("/sessions", sessionsController);

// Routes
app.get("/", (req, res) => {
  res.redirect("/movies");
});

// Listener
app.listen(PORT, () => {
  console.log("🍒🍋Listening on port🥝🍉", PORT);
});
