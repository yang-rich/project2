const express = require("express");
const Movie = require("../models/movies.js");
const movies = express.Router();

//super bonus
//custom middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

// NEW
movies.get("/new", (req, res) => {
  res.render("movies/new.ejs", { currentUser: req.session.currentUser });
});

// EDIT
// can add the middleware function between the route and the (req, res)
movies.get("/:id/edit", isAuthenticated, (req, res) => {
  Movie.findById(req.params.id, (error, foundMovie) => {
    res.render("movies/edit.ejs", {
      movie: foundMovie,
      currentUser: req.session.currentUser,
    });
  });
});

// DELETE
movies.delete("/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
    res.redirect("/movies");
  });
});

// SHOW
movies.get("/:id", (req, res) => {
  if (req.session.currentUser) {
    Movie.findById(req.params.id, (error, foundMovie) => {
      res.render("movies/show.ejs", {
        movie: foundMovie,
        currentUser: req.session.currentUser,
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// UPDATE
movies.put("/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect("/movies");
    }
  );
});

// CREATE
movies.post("/", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Movie.create(req.body, (error, createdMovie) => {
    res.redirect("/movies");
  });
});

// INDEX
movies.get("/", (req, res) => {
  Movie.find({}, (error, allMovies) => {
    res.render("movies/index.ejs", {
      movies: allMovies,
      currentUser: req.session.currentUser,
    });
  });
});

// SEED ROUTE
movies.get("/setup/seed", (req, res) => {
  Movie.create(
    [
      {
        title: "The Bourne Identity",
        cover:
          "https://upload.wikimedia.org/wikipedia/en/a/ae/BourneIdentityfilm.jpg",
        synopsis:
          "A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and attempting to regain his memory.",
        rating: 7.9,
      },
      {
        title: "The Bourne Identity",
        cover:
          "https://upload.wikimedia.org/wikipedia/en/a/ae/BourneIdentityfilm.jpg",
        synopsis:
          "A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and attempting to regain his memory.",
        rating: 7.9,
      },
      {
        title: "The Bourne Identity",
        cover:
          "https://upload.wikimedia.org/wikipedia/en/a/ae/BourneIdentityfilm.jpg",
        synopsis:
          "A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and attempting to regain his memory.",
        rating: 7.9,
      },
    ],
    (error, data) => {
      res.redirect("/movies");
    }
  );
});

// Drop DB Route
movies.get(
  "/dropdatabase/cannotundo/areyoursure/reallysure/okthen",
  (req, res) => {
    Movie.collection.drop();
    res.send("You did it! You dropped the database!");
  }
);

module.exports = movies;
