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

console.log('Welcome, my name is Liri! Are you looking for movies, songs, or concerts?')

var input = process.argv;
var input1 = process.argv[2];
var input2 = process.argv[3];



var myArray = [];
function songSearch() {

    spotify.search({ type: 'track', query: input2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            //console.log(data.tracks.items[0]);
            console.log('You picked ' + data.tracks.items[0].name)
            console.log('It has a ' + data.tracks.items[0].popularity + ' popularity rating!')
            console.log('It was made by ' + data.tracks.items[0].artists[0].name)
        }
    });
};



 function bandsHere() {
    
    
    var concertUrl = 'https://rest.bandsintown.com/artists/' + input2 + '/events?app_id=codingbootcamp';
    axios.get(concertUrl).then(function (response) {
        var jsonConcertData = response.data;
        for (var i = 0; i < jsonConcertData.length; i++) {
            var show = jsonConcertData[i];
            console.log(input2 + ' will play at ' + show.venue.name + ' in ' + show.venue.region + ' on ' + show.datetime)
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


switch (input1) {
    case 'songs':
        console.log("What song would you like to learn about? (please type it in correctly, if you got this far in bash I imagine you know how to make a request)");
        if (input2 === undefined) {

        }
        songSearch();
        break;
    case 'movies':
        console.log("What kind of movie?")
        break;
    case 'concerts':
        console.log("what concert?");
        console.log('initial call' + input2)
        bandsHere();

};



