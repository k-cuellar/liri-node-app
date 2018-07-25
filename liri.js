//load Node Modules
var dotenv = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api")
var Twitter = require("twitter");

//requires key.js with spotify/twitter keys
var keys = require("./keys.js");


//sets input equal to first command line argument
var input = process.argv[2];

//retrieve tweets function
function retrieveTweets() {

    var client = new Twitter(keys.twitter)
    // console.log(client);
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

// //spotify song function
function spotifySong(song) {

    var spotify = new Spotify(keys.spotify);
    
    var search = "";
    if (song === "") {
        search = "The Sign Ace of Base";
    } else {
        search = song;
    }

    spotify.search({type: 'track', query: song}, function(error, data) {
        // console.log(data.tracks.items[0]);
        if (error) {
            console.log(error);
        } else {
            var songInfo = data.tracks.items[0];
            if (!songInfo) {
                console.log("ERROR: No song information was retrieved, double check the spelling!")
            } else {
                var outputString = "\n---Song Information---" + "\nSong Name: " + songInfo.name 
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

    var queryString = "http://www.omdbapi.com/?apikey=trilogy&t=" + search + "&plot=full&tomatoes=true";

    request(queryString, function (error, response, body) {
        if(error) {
            console.log(error);
        } else {
            var data = JSON.parse(body);
            var outputString = "\n---Movie Information---"
                                + "\n--Movie Title: " + data.Title
                                + "\n--Year Released: " + data.Released
                                + "\n--IMDB Rating: " + data.imdbRating
                                + "\n--Rotten Tomatoes Rating: " + data.tomatoRating
                                + "\n--Country Produced: " + data.Country
                                + "\n--Language: " + data.Language
                                + "\n--Actors: " + data.Actors
                                + "\n--Plot: " + data.Plot
            console.log(outputString);
        }
    })

}

//do what it says function
function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var cmdString = data.split(',');
			var command = cmdString[0].trim();
            var param = cmdString[1].trim();
            
            switch(command) {
				case 'my-tweets':
					retrieveTweets(); 
					break;

				case 'spotify-this-song':
					spotifySong(param);
					break;

				case 'movie-this':
					retrieveOBDBInfo(param);
					break;
			}
        }
    })
}

// Read in the command line arguments
var cmdArgs = process.argv;

// the second command line argument will have spaces, keep it all as variable liriArg2
var liriArg2 = '';
for (var i = 3; i < cmdArgs.length; i++) {
	liriArg2 += cmdArgs[i] + ' ';
}

//specifies which Liri command to run, runs that function
if (input === "my-tweets"){
    retrieveTweets();
}
else if (input === "spotify-this-song") {
    spotifySong(liriArg2);
}
else if (input === "movie-this") {
    retrieveOMDB(liriArg2);
}
else if (input === "do-what-it-says") {
    doWhatItSays();
} 
else {
    console.log("\nThat's not a Liri command! Try one of the following:" + "\nmy-tweets, spotify-this-song <song_name>, movie-this, OR do-what-it-says")
}