//added code to read and set any environment variables with the dotenv package:


var keys = require("./keys.js");

var Twitter = require('twitter');

var request = require("request");

var Spotify = require('node-spotify-api');

// fs is a core Node package for reading and writing files
var fs = require("fs");

var operation = process.argv[2];
    //my-tweets
    //spotify-this-song '<song name here>'`
    //movie-this '<movie name here>'`

var nodeArgs = process.argv;    
var song  = "";
var movie = "";

//console.log(nodeArgs[3]);

if (nodeArgs[2]=="spotify-this-song" && nodeArgs[3]) { 
    for (var i=3; i<nodeArgs.length;i++){
        if (i===3) {
            song = nodeArgs[i];
        }
        else{
            song = song +"%20"+ nodeArgs[i];
        }
    }
    console.log(song);
    logthis("\r\n"+"****"+operation+" "+song+"\r\n");
}
else if (nodeArgs[2]=="spotify-this-song" && (!nodeArgs[3])){
    song = "The Sign";
    console.log(song);
    logthis("\r\n"+"****"+operation+" "+song+"\r\n");
}


if (nodeArgs[2]=="movie-this" && nodeArgs[3]) { 
    for (var i=3; i<nodeArgs.length;i++){
        if (i===3) {
            movie = nodeArgs[i];
        }
        else{
            movie = movie +"%20"+ nodeArgs[i];
        }
    }
    console.log(movie);
    logthis("\r\n"+"****"+operation+" "+movie+"\r\n");
}
else if (nodeArgs[2]=="movie-this" && (!nodeArgs[3])){
    movie = "Mr. Nobody";
    console.log(movie);
    logthis("\r\n"+"****"+operation+" "+movie+"\r\n");
}




switch (operation) {
    case "my-tweets": get_twitter_data(); break;
    case "spotify-this-song" : get_spotify_data(song) ; break;
    case "movie-this"   : get_movie_info(movie)      ; break;
    case "do-what-it-says"   : readfile()      ; break;
}

function get_twitter_data() {
 
    logthis("\r\n"+"****"+operation+"\r\n");
    var client = new Twitter(keys.twitter);
 
    var params = {screen_name: client.screen_name, count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);

            for (var i=0; i< tweets.length; i++){
                console.log(tweets[i].text);
                
                logthis(" "+tweets[i].text+"\r\n");
            }

        }
    });
}

function get_spotify_data(audiof){
    var spotify = new Spotify(keys.spotify); 

        spotify
        .search({ type: 'track', query: audiof })
        .then(function(response) {
            //console.log(response);
            //console.log(response.tracks.items.length);
               
            if (audiof == "The Sign") {
            
                for (var i =0; i< response.tracks.items.length; i++){
                        if (response.tracks.items[i].name== "The Sign" && response.tracks.items[i].album.artists[0].name == "Ace of Base"){
                            console.log("************");
                            logthis("************"+"\r\n");
                            console.log("The artist name: "+response.tracks.items[i].album.artists[0].name);
                            logthis("The artist name: "+response.tracks.items[i].album.artists[0].name+"\r\n");
                            console.log("The song name: "+response.tracks.items[i].name);
                            logthis("The song name: "+response.tracks.items[i].name+"\r\n");
                            console.log("The album name: "+response.tracks.items[i].album.name);
                            logthis("The album name: "+response.tracks.items[i].album.name+"\r\n");
                            console.log("The preview link: "+response.tracks.items[i].preview_url);
                            logthis("The preview link: "+response.tracks.items[i].preview_url+"\r\n");
                            console.log("************");
                            logthis("************"+"\r\n");
                    
                            break;
                        }
                }
            }
            else{
                for (var i =0; i< response.tracks.items.length; i++){
                    console.log("************");
                    logthis("************"+"\r\n");
                    console.log("The artist name: "+response.tracks.items[i].album.artists[0].name);
                    logthis("The artist name: "+response.tracks.items[i].album.artists[0].name+"\r\n");
                    console.log("The song name: "+response.tracks.items[i].name);
                    logthis("The song name: "+response.tracks.items[i].name+"\r\n");
                    console.log("The album name: "+response.tracks.items[i].album.name);
                    logthis("The album name: "+response.tracks.items[i].album.name+"\r\n");
                    console.log("The preview link: "+response.tracks.items[i].preview_url);
                    logthis("The preview link: "+response.tracks.items[i].preview_url+"\r\n");
                    console.log("************");
                    logthis("************"+"\r\n");
                }
            }

        })
        .catch(function(err) {
            console.log(err);
           
        });

}


function get_movie_info(title){

// Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";


// This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("The movie title is " + JSON.parse(body).Title);
            logthis("The movie title is " + JSON.parse(body).Title+"\r\n");
            console.log("The year movie came out is " + JSON.parse(body).Year);
            logthis("The year movie came out is " + JSON.parse(body).Year+"\r\n");
            console.log("The IMDB rating for this movie is " + JSON.parse(body).imdbRating);
            logthis("The IMDB rating for this movie is " + JSON.parse(body).imdbRating+"\r\n");
            console.log("The Rotten Tomatoes rating for this movie is " + JSON.parse(body).Ratings[1].Value);
            logthis("The Rotten Tomatoes rating for this movie is " + JSON.parse(body).Ratings[1].Value+"\r\n");
            console.log("The country where the movie was produced is " + JSON.parse(body).Country);
            logthis("The country where the movie was produced is " + JSON.parse(body).Country+"\r\n");
            console.log("The language/s of the movie: " + JSON.parse(body).Language);
            logthis("The language/s of the movie: " + JSON.parse(body).Language+"\r\n");
            console.log("The plot of the movie: " + JSON.parse(body).Plot);
            logthis("The plot of the movie: " + JSON.parse(body).Plot+"\r\n");
            console.log("The actors in the movie are " + JSON.parse(body).Actors);
            logthis("The actors in the movie are " + JSON.parse(body).Actors+"\r\n");

            
            
        }
      });

} 



function readfile(){
    logthis("****"+operation+"\r\n");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    if (dataArr[0]=="spotify-this-song"){
        get_spotify_data(dataArr[1]);
    }

    });
}

function logthis(a){
    var fs = require("fs");

    // We then store the textfile filename given to us from the command line
    var textFile = 'log.txt';

    // We then append the contents "Hello Kitty" into the file
    // If the file didn't exist then it gets created on the fly.
    fs.appendFileSync(textFile, '\n'+a, function(err) {

    // If an error was experienced we say it.
    if (err) {
        console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
       // console.log("Content Added!");
    }

    });
}