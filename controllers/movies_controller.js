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

// Drop DB Route
movies.get("/dropdatabase", (req, res) => {
  Movie.collection.drop();
  res.send("You did it! You dropped the database!");
});

// NEW
movies.get("/new", (req, res) => {
  res.render("movies/new.ejs", { currentUser: req.session.currentUser });
});

// EDIT
// can add the middleware function between the route and the (req, res)
movies.get("/:id/edit", isAuthenticated, (req, res) => {
  Movie.findById(req.params.id, (error, foundMovie) => {
    res.render("movies/edit.ejs", {
      movies: foundMovie,
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
        movies: foundMovie,
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
        title: "1917",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
      },
      {
        title: "American Animals",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYTc4ZWQyODItMTZjYy00OTVmLWEzMjUtNTlkOTJjMzhiYzAxXkEyXkFqcGdeQXVyODE0MDY3NzY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Four young men mistake their lives for a movie and attempt one of the most audacious heists in U.S. history.",
      },
      {
        title: "Annihilation",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don't apply.",
      },
      {
        title: "Arrival",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
      },
      {
        title: "The Babadook",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk0NzMzODc2NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A single mother and her child fall into a deep well of paranoia when an eerie children's book titled 'Mister Babadook' manifests in their home.",
      },
      {
        title: "Baby Driver",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
      },
      {
        title: "Bad Boys For Life",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMWU0MGYwZWQtMzcwYS00NWVhLTlkZTAtYWVjOTYwZTBhZTBiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Miami detectives Mike Lowrey and Marcus Burnett must face off against a mother-and-son pair of drug lords who wreak vengeful havoc on their city.",
      },
      {
        title: "Black Swan",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A committed dancer struggles to maintain her sanity after winning the leading role in a production of Tchaikovsky's 'Swan Lake'",
      },
      {
        title: "Blockers",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjE0ODIzNjkzMl5BMl5BanBnXkFtZTgwODQ3MzU4NDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Three parents try to stop their daughters from losing their virginity on prom night.",
      },
      {
        title: "Bloodshot",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYjA5YjA2YjUtMGRlNi00ZTU4LThhZmMtNDc0OTg4ZWExZjI3XkEyXkFqcGdeQXVyNjUyNjI3NzU@._V1_UY268_CR16,0,182,268_AL_.jpg",
        synopsis:
          "Ray Garrison, a slain soldier, is re-animated with superpowers",
      },
      {
        title: "Bloodshot",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYjA5YjA2YjUtMGRlNi00ZTU4LThhZmMtNDc0OTg4ZWExZjI3XkEyXkFqcGdeQXVyNjUyNjI3NzU@._V1_UY268_CR16,0,182,268_AL_.jpg",
        synopsis:
          "Ray Garrison, a slain soldier, is re-animated with superpowers",
      },
      {
        title: "Bombshell",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjlhOWE3YjktY2MzOC00ZmQ1LWIwNjgtZmVhZmFjZGExMzgyXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A group of women take on Fox News head Roger Ailes and the toxic atmosphere he presided over at the network.",
      },
    ],
    (error, data) => {
      res.redirect("/movies");
    }
  );
});

module.exports = movies;
