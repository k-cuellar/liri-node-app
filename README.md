# liri-node-app

LIRI App (Language Interpretation and Recognition Interface)

Type in one of the following 4 commands to search for things:

*"my-tweets" : Will display up to 20 of my latest tweets.
*"spotify-this-song '<song name>'" : Will search Spotify for that song and return information about it as well as a preview (if available).
*"movie-this" : Will return information on that movie including the release year, list of actors, production country, and plot.
*"do-what-it-says" : takes in command from random.txt file, will complete that command.


What I Didn't Get Working:

The only thing I didnt get working was if you say "spotify-this-song" but don't put in a song query, it's supposed to return a search for "The Sign" by Ace of Base. However, after declaring an empty search variable, the if statement below it would not recognize is as a variable. I tried to troubleshoot it but couldnt find a solution. 

Other than that, Liri works!