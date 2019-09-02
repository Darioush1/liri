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
var concertURL = '';

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



 function bandsHere(input2) {
    
    concertUrl = 'https://rest.bandsintown.com/artists/' + input2 + '/events?app_id=codingbootcamp';
    console.log('concert  ' + concertURL)
    axios.get('https://rest.bandsintown.com/artists/rezz/events?app_id=codingbootcamp').then(function (response) {
        var jsonConcertData = response.data;
        for (var i = 0; i < jsonConcertData.length; i++) {
            var show = jsonConcertData[i];
            console.log('Rezz will play at ' + show.venue.name + ' in ' + show.venue.region + ' on ' + show.datetime)
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

        bandsHere();

};




// console.log(input1);
// console.log(input2);


//    sorting and running throu the whole argv
// for (var i = 2; i < input.length; i++) {
//     myArray.push(parseInt(input[i]));
// };

// function sortNumber(a, b) {
//     return(a - b)
// };

// console.log(myArray);
// console.log(myArray.sort(sortNumber))

    //creat a text file and run through the data
// fileSystem.readFile('movies.txt', function(err, fileContent) {
//     if (err) {
//         return console.log(err);
//     }

//     var dataArray = fileContent.split(', ');

//     for (var i = 0; i < dataArray.length; i++) {
//         console.log(dataArray[i])
//     }
// })