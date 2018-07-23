var dotenv = require("dotenv").config();
var keysNeeded = require("./key.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter)

var input = process.argv[2];



if (input === "my-tweets"){

}

else if (input === "spotify-this-song") {

}

else if (input === "movie-this") {

}

else if (input === "do-what-it-says") {

}