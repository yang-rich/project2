<<<<<<< HEAD
# Ramajohns Movie App

## Explanation

This app is a current collection of my movies database on my Plex server. Due to the quarantine, my friends and I have not been able to go to the movies on a regular basis as we have been used to and so we decided that movie nights on Plex would be a fun alternative. With that in mind, I set out to create an app that would hold my movie database but also allow my friends to add movies they'd like to watch.

## Link to Live Site

https://movie-app-2020.herokuapp.com/movies

## Installation Instructions

`npm install`

## Technologies Used

The app uses code from html, css, javascript, and jQuery. It is also being run and managed with node and mongoDB while mongo DB Atlas stores our database online.

I started off this project by setting up all seven restful routes and making sure they were loading pages and linked correctly. From there it was a matter of incorporating all the data I wanted to use. This resulted in a library I input into my SEED route with a full list of the movies that I currently had available including the title, cover art, and a short synopsis, courtesy of IMDB. With that out of the way, it was just a matter of getting the UI and UX to perform how I wanted. This was painstakingly difficult as I had set my goals considerably further than what I was capable of doing prior to starting this project. The past week has been filled with reading documentation and guides and watching tutorial videos on how a variety of packages and features worked. On the bright side this helped expose me to a plethora of different packages, widgets, and UI/UX options that I had previously no knowledge of.

## Unsolved Problems

Some unsolved problems that remain include making my drop target areas reject additional drops if the div is already occupied. I also wanted to make the dropzone div scroll with the page to make dropping easier and not require users to drag the last movie, then scroll all the way to the top without letting go of left click. I wanted to be able to get the page to save the dropped divs past reloads instead resetting and have the divs of the library scoot in to fill and blank spaces that were generated from dragging divs out. Finally I would have liked to have been able to make it so divs with higher number values didn't automatically cover their lower numbered counterparts. Finally I would have liked to have been able to figure out admin/user account setups so that the delete and edit functions were not accessible by an account that did not have admin privileges.

## What I Learned

This project introduced me to the beginnings of drag and drop as well as utilizing multiple libraries simultaneously. I quickly realized some functions did not really work on pre-made packages like they would on vanilla javascript. This resulted in me creating an infinitely rotating carousel that did not allow me to utilize drag and drop on it's elements.
=======

>>>>>>> 672d37cfedfb6214d637d1bf12e7f7329461b386
