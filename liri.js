//load Node Modules
var dotenv = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var spotifyModule = require("node-spotify-api")
var twitterModule = require("twitter");

//requires key.js with spotify/twitter keys
var keys = require("./keys.js");


//sets input equal to command line argument
var input = process.argv[2];

//retrieve tweets function
function retrieveTweets() {

    var client = new Twitter(keys.twitter)
    var parameters = {screen_name: "alias185206323", count: 20};

    client.get("statuses/user_timeline", parameters, function(error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        } else {
            for (var i = 0; i < tweets.length; i++) {
                var outputString = "Created on: " + tweets[i].created_at + "\nTweet content: " + tweets[i].text + "\n---------\n";
                console.log(outputString);
            }
        }
    })
}

//spotify song function
function spotifySong(song) {

    var spotify = new Spotify(keys.spotify);
    var search;

    if (song === "") {
        search = "The Sign Ace of Base";
    } else {
        search = song;
    }

    spotify.search({type: "track", query: search}, function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var songInfo = data.tracks.items[0];
            if (!songInfo) {
                console.log("ERROR: No song information was retrieved, double check the spelling!")
            } else {
                var outputString = "\nSong Information: " + "\nSong Name: " + songInfo.name 
                                    + "\nArtist: " + songInfo.artists[0].name 
                                    + "\nAlbum: " + songInfo.album.name
                                    + "\nPreview Here: " + songInfo.preview_url + "\n";
                console.log(outputString);
            }
        }
    })
}

//retrieve OMDB info function
function retrieveOMDB(movie) {
    var search;
    if (movie === "") {
        search = "Mr. Nobody";
    } else {
        search = movie;
    }

    search = search.split(" ").join("+");

    var queryString = "http://www.omdbapi.com/?t=" + search + "&plot=full&tomatoes=true";

    

}

//do what it says function
function doWhatItSays() {

}


//specifies which Liri command to run, runs that function
if (input === "my-tweets"){
    retrieveTweets();
}
else if (input === "spotify-this-song") {
    spotifySong();
}
else if (input === "movie-this") {
    retrieveOMDB();
}
else if (input === "do-what-it-says") {
    doWhatItSays();
} 
else {
    console.log("\nThat's not a Liri command! Try one of the following:" + "\nmy-tweets, spotify-this-song '<song_name>', movie-this, OR do-what-it-says")
}