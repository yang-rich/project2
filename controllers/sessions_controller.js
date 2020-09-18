const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs", {
    currentUser: req.session.currentUser,
  });
});
//create a new session

//a few things that can happen

//username exists and password matches

//username exixts but password doesnt matches

//username doesnt exists

//upon success we CREATE a new session

sessions.post("/", (req, res) => {
  //look for the user
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    //database has an error
    if (err) {
      console.log(err);
      res.send("oops the db had a problem");
    } else if (!foundUser) {
      //this is for if mongoDB does not find the user
      res.send('<a href="/">sorry! no user found</a>');
    } else {
      //user is found!
      //does the password for this user match though?
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        res.send('<a href="/">Password does not match</a>');
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
