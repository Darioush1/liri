require("dotenv").config();
var keys = require("./keys");
const axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var spotify = new Spotify(
    keys.spotify
);

console.log('Welcome, my name is Liri! Are you looking for movies, songs, or concerts?')


var input = process.argv;

var input1 = process.argv[2];
var input2 = process.argv[3];

var myArray = [];

switch (input1) {
    case 'songs':
        console.log("What kind of music?");
        songSearch();
        break;
    case 'movies':
        console.log("What kind of movie?")
        break;
    case 'concerts':
        console.log("what concert?")

};



function songSearch() {
        spotify.search({ type: 'track', query: input2 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

        

            console.log(data.tracks.items[0]);
        });
}
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