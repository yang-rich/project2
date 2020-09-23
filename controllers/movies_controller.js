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

// // INDEX CAROUSEL
// movies.get("/", (req, res) => {
//   Movie.find({}, (error, allMovies) => {
//     allMovies.sort((a, b) => {
//       return a.title.toLowerCase() - b.title.toLowerCase();
//     });
//     console.log(allMovies);
//     res.render("movies/index.ejs", {
//       movies: allMovies,
//       currentUser: req.session.currentUser,
//     });
//   });
// });

// INDEX GRID
movies.get("/", (req, res) => {
  Movie.find({}, (error, allMovies) => {
    allMovies.sort((a, b) => {
      return a.title.toLowerCase() - b.title.toLowerCase();
    });
    console.log(allMovies);
    res.render("movies/index2.ejs", {
      movies: allMovies,
      currentUser: req.session.currentUser,
    });
  });
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

// SHOW USER
movies.get("/:id", (req, res) => {
  Movie.findById(req.params.id, (err, foundMovie) => {
    if (req.session.currentUser.role === "admin") {
      res.render("movies/show.ejs", {
        movies: foundMovie,
        currentUser: req.session.currentUser,
      });
    } else {
      res.render("movies/showUser.ejs", {
        movies: foundMovie,
        currentUser: req.session.currentUser,
      });
    }
  });
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
  Movie.create(req.body, (error, createdMovie) => {
    res.redirect("/movies");
  });
});

// SEED
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
        title: "Bombshell",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjlhOWE3YjktY2MzOC00ZmQ1LWIwNjgtZmVhZmFjZGExMzgyXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A group of women take on Fox News head Roger Ailes and the toxic atmosphere he presided over at the network.",
      },
      {
        title: "Booksmart",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjEzMjcxNjA2Nl5BMl5BanBnXkFtZTgwMjAxMDM2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "On the eve of their high school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.",
      },
      {
        title: "The Bourne Identity",
        cover:
          "https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and attempting to regain his memory.",
      },
      {
        title: "The Bourne Legacy",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTc4Njk3MDM1Nl5BMl5BanBnXkFtZTcwODgyOTMxOA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An expansion of the universe from Robert Ludlum's novels, centered on a new hero whose stakes have been triggered by the events of the previous three films.",
      },
      {
        title: "The Bourne Supremacy",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYTIyMDFmMmItMWQzYy00MjBiLTg2M2UtM2JiNDRhOWE4NjBhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "When Jason Bourne is framed for a CIA operation gone awry, he is forced to resume his former life as a trained assassin to survive.",
      },
      {
        title: "The Bourne Ultimatum",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Jason Bourne dodges a ruthless C.I.A. official and his Agents from a new assassination program while searching for the origins of his life as a trained killer.",
      },
      {
        title: "Bridesmaids",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
      },
      {
        title: "Charlie's Angels",
        cover:
          "https://m.media-amazon.com/images/M/MV5BN2VkMjQwZWMtMzc1NC00ZjJiLWJlNTMtNmRjOTE2ZTJmYzUwXkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_UY268_CR7,0,182,268_AL_.jpg",
        synopsis:
          "When a young systems engineer blows the whistle on a dangerous technology, Charlie's Angels are called into action, putting their lives on the line to protect us all.",
      },
      {
        title: "Deadpool",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
      },
      {
        title: "Deadpool 2",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNjk1Njk3YjctMmMyYS00Y2I4LThhMzktN2U0MTMyZTFlYWQ5XkEyXkFqcGdeQXVyODM2ODEzMDA@._V1_UY268_CR43,0,182,268_AL_.jpg",
        synopsis:
          "Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable.",
      },
      {
        title: "Django Unchained",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      },
      {
        title: "Dragon Ball Super: Broly",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjhhMDU5Y2QtMzcyZS00ZGE1LTg3ZjMtMTYyOTM0OTFlYTRkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Goku and Vegeta encounter Broly, a Saiyan warrior unlike any fighter they've faced before.",
      },
      {
        title: "Drive",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjY5ZjQyMjMtMmEwOC00Nzc2LTllYTItMmU2MzJjNTg1NjY0XkEyXkFqcGdeQXVyNjQ1MTMzMDQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself in trouble when he helps out his neighbor in this action drama.",
      },
      {
        title: "Edge of Tomorrow",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.",
      },
      {
        title: "Escape Plan 2: Hades",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk4NjA0MjUyMF5BMl5BanBnXkFtZTgwMTEzNDQ1NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Years after he fought his way out of an inescapable prison, Ray Breslin has organized a new top-notch security force. But when one of his team members goes missing, Breslin must return to the hell he once escaped from.",
      },
      {
        title: "ex machina",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
      },
      {
        title: "The Farewell",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMWE3MjViNWUtY2VjYS00ZDBjLTllMzYtN2FkY2QwYmRiMDhjXkEyXkFqcGdeQXVyODQzNTE3ODc@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
      },
      {
        title: "First Man",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMDBhOTMxN2UtYjllYS00NWNiLWE1MzAtZjg3NmExODliMDQ0XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.",
      },
      {
        title: "First Reformed",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZDI1MGIyZDMtYjAyMy00ZWE1LTgzYjctYzM5MzczNjFjZWQwXkEyXkFqcGdeQXVyODQyNzE3MDg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A minister of a small congregation in upstate New York grapples with mounting despair brought on by tragedy, worldly concerns and a tormented past.",
      },
      {
        title: "Frozen",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.",
      },
      {
        title: "Frozen II",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom.",
      },
      {
        title: "The Gentlemen",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTlkMmVmYjktYTc2NC00ZGZjLWEyOWUtMjc2MDMwMjQwOTA5XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An American expat tries to sell off his highly profitable marijuana empire in London, triggering plots, schemes, bribery and blackmail in an attempt to steal his domain out from under him.",
      },
      {
        title: "Get Out",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      },
      {
        title: "Gone Girl",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
      },
      {
        title: "The Grand Budapest Hotel",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
      },
      {
        title: "Gravity",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Two astronauts work together to survive after an accident leaves them stranded in space.",
      },
      {
        title: "The Great Gatsby",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.",
      },
      {
        title: "Greyhound",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZTFkZjYxNWItZmE2MC00MGE4LWIxYTgtZmIzOWM1YmI2YWEzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Several months after the U.S. entry into World War II, an inexperienced U.S. Navy commander must lead an Allied convoy being stalked by a German submarine wolf pack.",
      },
      {
        title: "The Handmaiden",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNDJhYTk2MTctZmVmOS00OTViLTgxNjQtMzQxOTRiMDdmNGRjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY268_CR2,0,182,268_AL_.jpg",
        synopsis:
          "A woman is hired as a handmaiden to a Japanese heiress, but secretly she is involved in a plot to defraud her.",
      },
      {
        title: "The Hateful Eight",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
      },
      {
        title: "The House with a Clock in Its Walls",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk1MzM1ODEwOV5BMl5BanBnXkFtZTgwMTE0OTA4NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A young orphan named Lewis Barnavelt aids his magical uncle in locating a clock with the power to bring about the end of the world.",
      },
      {
        title: "Inception",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      },
      {
        title: "Inglourious Basterds",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
      },
      {
        title: "Inside Out",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
      },
      {
        title: "Interstellar",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      },
      {
        title: "The Invisible Man",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjFhM2I4ZDYtZWMwNC00NTYzLWE3MDgtNjgxYmM3ZWMxYmVmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "When Cecilia's abusive ex takes his own life and leaves her his fortune, she suspects his death was a hoax. As a series of coincidences turn lethal, Cecilia works to prove that she is being hunted by someone nobody can see.",
      },
      {
        title: "The Irishman",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UY268_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An old man recalls his time painting houses for his friend, Jimmy Hoffa, through the 1950-70s.",
      },
      {
        title: "Jason Bourne",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNGJlYjVkMjQtN2NlZC00NTJhLThmZjItMTRlZDczMmE3YmI3XkEyXkFqcGdeQXVyMzI0NDc4ODY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "The CIA's most dangerous former operative is drawn out of hiding to uncover more explosive truths about his past.",
      },
      {
        title: "Johnny English Strikes Again",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjI4MjQ3MjI5MV5BMl5BanBnXkFtZTgwNjczMDE4NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "After a cyber-attack reveals the identity of all of the active undercover agents in Britain, Johnny English (Rowan Atkinson) is forced to come out of retirement to find the mastermind hacker.",
      },
      {
        title: "Jojo Rabbit",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjU0Yzk2MzEtMjAzYy00MzY0LTg2YmItM2RkNzdkY2ZhN2JkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A young boy in Hitler's army finds out his mother is hiding a Jewish girl in their home.",
      },
      {
        title: "Joker",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
      },
      {
        title: "Jumanji: The Next Level",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTVjMmFiMDUtOWQ4My00YzhmLWE3MzEtODM1NDFjMWEwZTRkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world's most dangerous game.",
      },
      {
        title: "Kin",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZDczYzNhMDMtNmQ2Ni00ZjcwLWI1MDQtMWI1YWVkNjkzN2NhXkEyXkFqcGdeQXVyNDMzMzI5MjM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Chased by a vengeful criminal, the feds and a gang of otherworldly soldiers, a recently released ex-con, and his adopted teenage brother are forced to go on the run with a weapon of mysterious origin as their only protection.",
      },
      {
        title: "Kingsman: The Golden Circle",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjQ3OTgzMzY4NF5BMl5BanBnXkFtZTgwOTc4OTQyMzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "After the Kingsman's headquarters are destroyed and the world is held hostage, an allied spy organisation in the United States is discovered. These two elite secret organisations must band together to defeat a common enemy.",
      },
      {
        title: "Kingsman: The Secret Service",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTkxMjgwMDM4Ml5BMl5BanBnXkFtZTgwMTk3NTIwNDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A spy organisation recruits a promising street kid into the agency's training program, while a global threat emerges from a twisted tech genius.",
      },
      {
        title: "Knives Out",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A detective investigates the death of a patriarch of an eccentric, combative family.",
      },
      {
        title: "La La Land",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      },
      {
        title: "Little Women",
        cover:
          "https://m.media-amazon.com/images/M/MV5BY2QzYTQyYzItMzAwYi00YjZlLThjNTUtNzMyMDdkYzJiNWM4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
      },
      {
        title: "Logan",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety.",
      },
      {
        title: "Mad Max: Fury Road",
        cover:
          "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      },
      {
        title: "Maquia: When the Promised Flower Blooms",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMDY4YmM0YjUtNTE0OC00NDgwLWE1ZmQtNDIyN2U2MjlhMjI2XkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UY268_CR3,0,182,268_AL_.jpg",
        synopsis:
          "Escaping war, a young girl finds a lone surviving infant and decides to raise him as her son.",
      },
      {
        title: "Marriage Story",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZGVmY2RjNDgtMTc3Yy00YmY0LTgwODItYzBjNWJhNTRlYjdkXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
      },
      {
        title: "The Martian",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
      },
      {
        title: "Mary Poppins Returns",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjQxNjE3NjYxN15BMl5BanBnXkFtZTgwMTk2NDQ3NjM@._V1_UY268_CR3,0,182,268_AL_.jpg",
        synopsis:
          "A few decades after her original visit, Mary Poppins, the magical nanny, returns to help the Banks siblings and Michael's children through a difficult time in their lives.",
      },
      {
        title: "The Master",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTQ2NjQ5MzMwMF5BMl5BanBnXkFtZTcwMjczNTAzOA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A Naval veteran arrives home from war unsettled and uncertain of his future - until he is tantalized by the Cause and its charismatic leader.",
      },
      {
        title: "Melancholia",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk4NjM0MjI3MV5BMl5BanBnXkFtZTcwNjcxMDYzNg@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Two sisters find their already strained relationship challenged as a mysterious new planet threatens to collide with Earth.",
      },
      {
        title: "Mission: Impossible",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An American agent, under false suspicion of disloyalty, must discover and expose the real spy without the help of his organization.",
      },
      {
        title: "Mission: Impossible II",
        cover:
          "https://m.media-amazon.com/images/M/MV5BN2RkYWVkZDQtNTMxMi00NWQ4LWE2ODctNmQzOWM2NjQzYzdlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "IMF agent Ethan Hunt is sent to Sydney to find and destroy a genetically modified disease called 'Chimera'.",
      },
      {
        title: "Mission: Impossible III",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOThhNTA1YjItYzk2Ny00M2Y1LWJlYWUtZDQyZDU0YmY5Y2M5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "IMF agent Ethan Hunt comes into conflict with a dangerous and sadistic arms dealer who threatens his life and his fiancée in response.",
      },
      {
        title: "Mission: Impossible - Ghost Protocol",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "The IMF is shut down when it's implicated in the bombing of the Kremlin, causing Ethan Hunt and his new team to go rogue to clear their organization's name.",
      },
      {
        title: "Mission: Impossible - Rogue Nation",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTFmNDA3ZjMtN2Y0MC00NDYyLWFlY2UtNTQ4OTQxMmY1NmVjXkEyXkFqcGdeQXVyNTg4NDQ4NDY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Ethan and his team take on their most impossible mission yet when they have to eradicate an international rogue organization as highly skilled as they are and committed to destroying the IMF.",
      },
      {
        title: "Mission: Impossible - Fallout",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNjRlZmM0ODktY2RjNS00ZDdjLWJhZGYtNDljNWZkMGM5MTg0XkEyXkFqcGdeQXVyNjAwMjI5MDk@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
      },
      {
        title: "My Hero Academia: Heroes Rising",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTYyYjAxNDgtNjEwYi00ZjY0LTk2ZDAtOTBiZTVjMmZkYjk3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UY268_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A group of youths aspiring to become professional superheroes, fight in a world full of people with abilities, also known as quirks. Deku and his fellow classmates from Hero Academy face Nine, the strongest villain yet.",
      },
      {
        title: "The Nutcracker and the Four Realms",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTg1NDI1MjEyMl5BMl5BanBnXkFtZTgwOTA5MTgwNjM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A young girl is transported into a magical world of gingerbread soldiers and an army of mice.",
      },
      {
        title: "Ocean's 8",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjAyNDEyMzc4Ml5BMl5BanBnXkFtZTgwMjEzNjM0NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Debbie Ocean gathers an all-female crew to attempt an impossible heist at New York City's yearly Met Gala.",
      },
      {
        title: "Ocean's Eleven",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYzVmYzVkMmUtOGRhMi00MTNmLThlMmUtZTljYjlkMjNkMjJkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Danny Ocean and his ten accomplices plan to rob three Las Vegas casinos simultaneously.",
      },
      {
        title: "Ocean's Twelve",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMmJmYzBjNTktMTJjZS00ZGRhLWE1Y2QtOWQxZGU0Y2RmMjkyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Daniel Ocean recruits one more team member so he can pull off three major European heists in this sequel to Ocean's Eleven (2001).",
      },
      {
        title: "Ocean's Thirteen",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTMyNTc1NzY5MV5BMl5BanBnXkFtZTcwNDM4NTQzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Danny Ocean rounds up the boys for a third heist after casino owner Willy Bank double-crosses one of the original eleven, Reuben Tishkoff.",
      },
      {
        title: "Overlord",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYTUzYmJlNDgtMzM2ZS00N2ZkLWJjY2ItNzM0ZmVjMWU5OTA3XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A small group of American soldiers find horror behind enemy lines on the eve of D-Day.",
      },
      {
        title: "Parasite",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      },
      {
        title: "Penguin Highway",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZjVmZGU4MjAtNzRjOS00NTgxLWFjZWUtNjFjNGEzZDA1ZDhmXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_UY268_CR4,0,182,268_AL_.jpg",
        synopsis:
          "A fourth-grader, Aoyama-kun, investigates the mysterious reason behind the sudden appearance of penguins in his village, which is somehow related to a power from a young woman working at a dental clinic.",
      },
      {
        title: "Personal Shopper",
        cover:
          "https://m.media-amazon.com/images/M/MV5BN2JhYTViMGUtMTU0Ni00MzU5LWE0ZmYtNDk2YTdmOTI5MTFjXkEyXkFqcGdeQXVyNTIyODMzMzA@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A personal shopper in Paris refuses to leave the city until she makes contact with her twin brother who previously died there. Her life becomes more complicated when a mysterious person contacts her via text message.",
      },
      {
        title: "The Prestige",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      },
      {
        title: "Prisoners",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
      },
      {
        title: "Promare",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYWJjMGIyNGYtMzlkZC00NWEyLTk5OTctMTgwNTIxOWFjZWMzXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UY268_CR3,0,182,268_AL_.jpg",
        synopsis:
          "A futuristic firefighting mecha service is created to protect the world.",
      },
      {
        title: "A Quiet Place",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
      },
      {
        title: "Shutter Island",
        cover:
          "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
      },
      {
        title: "Sicario",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico.",
      },
      {
        title: "Sicario: Day of the Soldado",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTEzNjM2NTYxMjReQTJeQWpwZ15BbWU4MDU2NzAxNTUz._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "The drug war on the U.S.-Mexico border has escalated as the cartels have begun trafficking terrorists across the US border. To fight the war, federal agent Matt Graver re-teams with the mercurial Alejandro.",
      },
      {
        title: "A Silent Voice",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZGRkOGMxYTUtZTBhYS00NzI3LWEzMDQtOWRhMmNjNjJjMzM4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY268_CR2,0,182,268_AL_.jpg",
        synopsis:
          "A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.",
      },
      {
        title: "The Sisters Brothers",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTZmNTI1MzMtMGY0ZS00YTRlLWI4OTktYzE3YzZjZjJkNDVlXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In 1850s Oregon, the infamous duo of assassins, Eli Sisters (John C. Reilly) and Charlie Sisters (Joaquin Phoenix), chase a gold prospector and his unexpected ally.",
      },
      {
        title: "Spider-Man: Homecoming",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.",
      },
      {
        title: "Spider-Man: Far From Home",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.",
      },
      {
        title: "Spider-Man: Into the Spider-Verse",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
      },
      {
        title: "Spies in Disguise",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNzg1MzM3OWUtNjgzZC00NjMzLWE1NzAtOThiMDgyMjhhZDBhXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "When the world's best spy is turned into a pigeon, he must rely on his nerdy tech officer to save the world.",
      },
      {
        title: "A Star Is Born",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNmE5ZmE3OGItNTdlNC00YmMxLWEzNjctYzAwOGQ5ODg0OTI0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.",
      },
      {
        title: "Sword Art Online The Movie: Ordinal Scale",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZGE4M2M2OTYtZDgwMy00NGYwLWE0YTYtYzkyMDFjYWFhN2QzXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Kirito uncovers a conspiracy within Ordinal Scale, a popular AR game developed for a new system called The Augma.",
      },
      {
        title: "Taxi Driver",
        cover:
          "https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action by attempting to liberate a presidential campaign worker and an underage prostitute.",
      },
      {
        title: "Train to Busan",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTkwOTQ4OTg0OV5BMl5BanBnXkFtZTgwMzQyOTM0OTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
      },
      {
        title: "Uncle Drew",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTU2MzE0NzQ1Ml5BMl5BanBnXkFtZTgwNzIyNzczNTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "An anti-ageist comedy about a man's dream to win the Rucker Classic street ball tournament in Harlem.",
      },
      {
        title: "Uncut Gems",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.",
      },
      {
        title: "Underwater",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNzM0OGZiZWItYmZiNC00NDgzLTg1MjMtYjM4MWZhOGZhMDUwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A crew of oceanic researchers working for a deep sea drilling company try to get to safety after a mysterious earthquake devastates their deepwater research and drilling facility located at the bottom of the Mariana Trench.",
      },
      {
        title: "Us",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZTliNWJhM2YtNDc1MC00YTk1LWE2MGYtZmE4M2Y5ODdlNzQzXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them.",
      },
      {
        title: "Warrior",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTk4ODk5MTMyNV5BMl5BanBnXkFtZTcwMDMyNTg0Ng@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "The youngest son of an alcoholic former boxer returns home, where he's trained by his father for competition in a mixed martial arts tournament - a path that puts the fighter on a collision course with his estranged, older brother.",
      },
      {
        title: "Weathering With You",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNzE4ZDEzOGUtYWFjNC00ODczLTljOGQtZGNjNzhjNjdjNjgzXkEyXkFqcGdeQXVyNzE5ODMwNzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A high-school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather.",
      },
      {
        title: "The Wind Rises",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMTU4NDg0MzkzNV5BMl5BanBnXkFtZTgwODA3Mzc1MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during World War II.",
      },
      {
        title: "The Wolf of Wall Street",
        cover:
          "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
      },
      {
        title: "World War Z",
        cover:
          "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Former United Nations employee Gerry Lane traverses the world in a race against time to stop a zombie pandemic that is toppling armies and governments and threatens to destroy humanity itself.",
      },
      {
        title: "X-Men: Days of Future Past",
        cover:
          "https://m.media-amazon.com/images/M/MV5BZGIzNWYzN2YtMjcwYS00YjQ3LWI2NjMtOTNiYTUyYjE2MGNkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "The X-Men send Wolverine to the past in a desperate effort to change history and prevent an event that results in doom for both humans and mutants.",
      },
      {
        title: "Your Name",
        cover:
          "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
      },
      {
        title: "Zootopia",
        cover:
          "https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        synopsis:
          "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.",
      },
    ],
    (error, data) => {
      res.redirect("/movies");
    }
  );
});

module.exports = movies;
