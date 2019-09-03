require("dotenv").config();
var keys = require("./keys");
const axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var bandsintown = require('bandsintown')('codingbootcamp');
moment().format();
var spotify = new Spotify(
    keys.spotify
);

var title = '';
var movieTitle = '';


var input = process.argv;
var input1 = process.argv[2];
var input2 = process.argv[3];

function startText() {
    if (input1 == null) {
        console.log('Welcome, my name is Liri! Are you looking for movies, songs, or concerts?')
    }
};

startText()

for (var i = 3; i < input.length; i++) {
    if (i > 2 && i < input.length) {
        title = title + input[i];
    } else {
        title += input[i];
    }
};

for (var i = 3; i < input.length; i++) {
    if (i > 2 && i < input.length) {
        movieTitle = movieTitle + '+' + input[i];
    } else {
        movieTitle += input[i];
    }
};

function songSearch() {

    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            //console.log(data.tracks.items[0]);
            console.log('You picked ' + data.tracks.items[0].name)
            console.log('It was made by ' + data.tracks.items[0].artists[0].name)
            console.log('It has a ' + data.tracks.items[0].popularity + ' popularity rating!')

        }
    });
};



function bandsHere() {

    var concertUrl = 'https://rest.bandsintown.com/artists/' + title + '/events?app_id=codingbootcamp';
    axios.get(concertUrl).then(function (response) {
        console.log(concertUrl)
        var jsonConcertData = response.data;
        if (jsonConcertData[0] === null) {
            console.log(title + 'doesn\'t have any shows planned.');
        } else {
            for (var i = 0; i < jsonConcertData.length; i++) {
                var show = jsonConcertData[i];
                let date;
                date = moment(show.datetime).format('MMMM Do YYYY');
                console.log(date);
                console.log('Your artist/s will play at ' + show.venue.name + ' in ' + (show.venue.region || show.venue.country) + ' on ' + date)
            }
        }
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error ", error.message);
        };
    })
};

function movieSearch() {
    var movieAPI = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(movieAPI).then(
        
        function (response) {
            console.log(movieAPI)
            console.log('Title: ' + response.data.Title);
            console.log('Year: ' + response.data.Year)
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('RT Rating: ' + response.data.Ratings[1].Value)
            console.log('Country: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors)
        })
};


switch (input1) {
    case 'songs':

        if (input2 === undefined) {
            console.log("What song would you like to learn about? (please type it in correctly, if you got this far in bash I imagine you know how to make a request)")
        } else {
            songSearch();
        }
        break;
    case 'movies':
        console.log("What kind of movie?")
        movieSearch();
        break;
    case 'concerts':
        console.log("what concert?");
        bandsHere();

};



